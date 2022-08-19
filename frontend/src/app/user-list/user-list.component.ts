import { Component, OnInit, Directive, Input, HostListener } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../user.service';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { User } from '../models/user.model';
import { BigUser } from '../models/big-user.model';
import { NewUser } from '../models/new-user.model';
import { NewAssignment } from '../models/new-assignment.model';
import { AuthService } from '../shared/services/auth.service';
import { ProjectService } from '../project.service';
import { TimeEntryService } from '../time-entry.service';
import { AssignmentService } from '../assignment.service';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})

export class UserListComponent implements OnInit {
  inactiveUsers$: Observable<any>;
  projects$: Observable<any>;
  activeData = new Array;
  userProjects = new Array;
  user_items = new Array;
  sec_group_items = ['admin', 'basic'];
  project_items = new Array;
  activeUsers = new Array<NewUser>;

  constructor(private userService: UserService, private fb: FormBuilder,
  public authService: AuthService, private projectService: ProjectService,
  private timeEntryService: TimeEntryService, private fb1: FormBuilder,
  private assignmentService: AssignmentService) {}

  ngOnInit(): void {
    this.user_items = [
      {label: 'Assign to Project', icon: 'pi pi-plus', command: (x: any) => {
        console.log(x);}
      },
      {label: 'Revoke Admin', icon: 'pi pi-ban', command: () => {
        /*this.removeAdmin(user[0])*/ console.log('revoke admin');}
      },
      {label: 'Disable User', icon: 'pi pi-minus', command: () => {
        console.log('disable user'); }
      },
    ];
    this.project_items = [
      {label: 'End Project', icon: 'pi pi-ban', command: () => {
        console.log('end project'); }
      },
    ]
    this.inactiveUsers$ = this.userService.getDisabledUsers();
    this.userService.getUsers().subscribe((response) =>
    { for(let i = 0; i < response.length; i++){
        this.activeUsers.push(new NewUser(response[i].uid, response[i].id, response[i].first_name,
        response[i].last_name, response[i].email, response[i].sec_group, response[i].enabled));
        //console.log(this.activeUsers.assignments);
        this.activeData.push([response[i], [], []]);
        this.getProjects();
        this.assignmentService.getAssignmentsByUser(response[i].id).subscribe((response2) =>
        { for(let j = 0; j < response2.length; j++){
            this.activeUsers[i].active_assignments.push(new NewAssignment(response2[j].user_id, response2[j].project_id,
            response2[j].project_name, response2[j].hourly_rate, response2[j].start_date, response2[j].end_date,
            response2[j].amount, response2[j].enabled));
            //console.log(this.activeUsers[i].assignments);
            this.activeData[i][1].push([response2[j], '', 0]);
            this.getName(response2[j].project_id, response[i].id, i, j);
          }
        });
        this.assignmentService.getDisabledAssignmentsByUser(response[i].id).subscribe((response2) =>
        { for(let j = 0; j < response2.length; j++) {
            this.activeUsers[i].inactive_assignments.push(new NewAssignment(response2[j].user_id, response2[j].project_id,
            response2[j].project_name, response2[j].hourly_rate, response2[j].start_date, response2[j].end_date,
            response2[j].amount, response2[j].enabled));
            this.activeData[i][2].push([response2[j], '', 0]);
            this.getDName(response2[j].project_id, response[i].id, i, j);
          }
        });
      }
    });
  }
  refresh() {
    this.inactiveUsers$ = this.userService.getDisabledUsers();
    this.activeData = new Array;
    this.userProjects = new Array;
    this.activeUsers = new Array;
    this.userService.getUsers().subscribe((response) =>
    { for(let i = 0; i < response.length; i++){
        this.activeUsers.push(new NewUser(response[i].uid, response[i].id, response[i].first_name,
        response[i].last_name, response[i].email, response[i].sec_group, response[i].enabled));
        this.activeData.push([response[i], [], []]);
        this.getProjects();
        this.assignmentService.getAssignmentsByUser(response[i].id).subscribe((response2) =>
        { for(let j = 0; j < response2.length; j++){
            this.activeUsers[i].active_assignments.push(new NewAssignment(response2[j].user_id, response2[j].project_id,
              response2[j].project_name, response2[j].hourly_rate, response2[j].start_date, response2[j].end_date,
              response2[j].amount, response2[j].enabled));
            this.activeData[i][1].push([response2[j], '', 0]);
            this.getName(response2[j].project_id, response[i].id, i, j);
          }
        });
        this.assignmentService.getDisabledAssignmentsByUser(response[i].id).subscribe((response2) =>
        { for(let j = 0; j < response2.length; j++) {
            this.activeUsers[i].inactive_assignments.push(new NewAssignment(response2[j].user_id, response2[j].project_id,
              response2[j].project_name, response2[j].hourly_rate, response2[j].start_date, response2[j].end_date,
              response2[j].amount, response2[j].enabled));
            this.activeData[i][2].push([response2[j], '', 0]);
            this.getDName(response2[j].project_id, response[i].id, i, j);
          }
        });
      }
    });
  }


  onRowEditInit(dt: any, user: any){
    dt.initRowEdit(user)
    //console.log(user);
  }
  onUserRowEditSave(user: User) {
    console.log(user);
    this.userService.newEditUser(user).subscribe((response: any) =>
    { console.log(response); /*this.refresh();*/ });
  }
  onUserRowEditCancel(user: User, index: number) {
    //console.log("cancel");
    this.refresh();
  }
  onProjectRowEditSave(project: any) {
    console.log(project);
    this.assignmentService.editAssignment(project).subscribe((response) =>
      { console.log(response); });
    //this.userService.newEditUser(user).subscribe((response: any) =>
    //{ console.log(response); /*this.refresh();*/ });
  }
  onProjectRowEditCancel(project: any, index: number) {
    //console.log("cancel");
    this.refresh();
  }
  getName(project_id: number, user_id: number, u_p: number, p_p: number){
    this.projectService.getProjectName(project_id).subscribe((response) =>
    { this.activeData[u_p][1][p_p][1] = response;
      this.activeUsers[u_p].active_assignments[p_p].project_name = response;
      for(let i = 0; i < this.userProjects[u_p].length; i++){
        if(this.userProjects[u_p][i][0] == response) {
          this.userProjects[u_p].splice(i, 1);
          break;
        }
      }
      //this.userProjects[u_p].splice(this.userProjects[u_p].indexOf(response), 1);
      this.getAmount(user_id, project_id, u_p, p_p);
    });
  }
  getDName(project_id: number, user_id: number, u_p: number, p_p: number){
      this.projectService.getProjectName(project_id).subscribe((response) =>
      { this.activeData[u_p][2][p_p][1] = response;
      this.activeUsers[u_p].inactive_assignments[p_p].project_name = response;
      for(let i = 0; i < this.userProjects[u_p].length; i++){
        if(this.userProjects[u_p][i][0] == response) {
          this.userProjects[u_p].splice(i, 1);
          break;
        }
      }
      //this.userProjects[u_p].splice(this.userProjects[u_p].indexOf(response), 1);
      this.getDAmount(user_id, project_id, u_p, p_p);
      });
    }
  getAmount(user: number, project: number, u_p: number, p_p: number) {
    this.timeEntryService.getEntriesUserProject(user, project).subscribe((response) =>
    { let sum = 0;
      for(let i = 0; i < response.length; i++) {
        sum += response[i].entry_value;
      }
      this.activeData[u_p][1][p_p][2] = sum;
      this.activeUsers[u_p].active_assignments[p_p].amount = sum;
    });
  }
  getDAmount(user: number, project: number, u_p: number, p_p: number) {
      this.timeEntryService.getEntriesUserProject(user, project).subscribe((response) =>
      { let sum = 0;
        for(let i = 0; i < response.length; i++) {
          sum += response[i].entry_value;
        }
        this.activeData[u_p][2][p_p][2] = sum;
        this.activeUsers[u_p].inactive_assignments[p_p].amount = sum;
      });
    }

  isChecked = false;
  editing = false;
  showFormToggle() {
    this.isChecked = !this.isChecked;
    this.userForm.patchValue({
      first_name: '',
      last_name: '',
      email: '',
      sec_group: '',
      enabled: '',
    })
  }
  userForm = this.fb.group({
    first_name: ['', Validators.required],
    last_name: ['', Validators.required],
    email: ['', Validators.required],
    sec_group: ['', Validators.required],
    enabled: ['', Validators.required],
  });

  onSubmit() {
    this.userService.addUser(this.userForm.value).subscribe((response: any) =>
    { console.log(response); this.refresh(); });
    //window.location.reload();
  }

  disable(user: User) {
    this.userService.disableUser(user).subscribe((response: any) =>
    { console.log(response); this.refresh(); } );
    //window.location.reload();
  }
  enable(user: User) {
      this.userService.enableUser(user).subscribe((response: any) =>
      { console.log(response); this.refresh(); } );
      //window.location.reload();
  }
  newAssign(user: User) {
    console.log(this.userProjects); //this has the projects each user could be assigned to
  }
  id: number = 0;
  uid: string;
  edit(user: User) {
    this.id = user.id;
    this.uid = user.uid;
    this.editing = true;
    this.isChecked = !this.isChecked;
    var enabled = '';
    if(user.enabled){
      enabled = 'true';
    }
    this.userForm.patchValue({
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      sec_group: user.sec_group,
      enabled: enabled,
    });
  }
  editUser() {
    this.userService.editUser(this.id, this.uid, this.userForm.value).subscribe((response: any) =>
    { console.log(response); this.refresh(); });
    this.editing = true;
    this.isChecked = !this.isChecked;
    //window.location.reload();
  }
  makeAdmin(user: User) {
    this.userService.makeAdmin(user).subscribe((response: any) =>
    { console.log(response); this.refresh(); } );
    //window.location.reload();
  }
  removeAdmin(user: User) {
      this.userService.removeAdmin(user).subscribe((response: any) =>
      { console.log(response); this.refresh(); } );
      //window.location.reload();
    }
  stopEdit() {
      this.editing = false;
      this.isChecked = !this.isChecked;
    }

  assignForm = this.fb.group({
    projectName: ['', [Validators.required]],
    hourlyRate: [0, [Validators.required]],
  });

  get projectName() {
    return this.assignForm.get('projectName')!.value;
  }
  get hourlyRate() {
    return this.assignForm.get('hourlyRate')!.value;
  }
  assignProject(user_id: number, index: number){
    let other_index = -1;
    for(let i = 0; i < this.userProjects[index].length; i++){
      if(this.userProjects[index][i][0] == this.projectName!){
        other_index = i
      }
    }
    if(this.userProjects[index][other_index][1] == true || this.hourlyRate! == 0){
      this.projectService.getProjectId(this.projectName!).subscribe((response) =>
      { this.assignmentService.createAssignment(user_id, response, this.hourlyRate!).subscribe((response2) =>
        { console.log(response2); this.refresh(); });
      });
      this.hideAssign(index);
    }

    //this.assigning = false;
    //window.location.reload();
  }
  endAssignment(data: any) {
    this.assignmentService.endAssignment(data).subscribe((response) =>
    { console.log(response); this.refresh(); });
    //window.location.reload();
  }
  restartAssignment(data: any) {
    this.assignmentService.restartAssignment(data).subscribe((response) =>
    { console.log(response); this.refresh(); });
    //window.location.reload();
  }
  aEditing = false;
  p_id: number = 0;
  a_id: number = 0;
  s_date = new Array;
  editAssignment(data: any, name: string, index: number) {
    this.aEditing = true;
    this.p_id = data.project_id;
    this.a_id = data.user_id;
    this.s_date = data.start_date;
    this.userProjects[index].push([name, false]);
    this.displayAssign(index);
    this.assignForm.patchValue({
      projectName: name,
      hourlyRate: data.hourly_rate,
    });
  }
  /*editPAssignment(index: number) {
    this.assignmentService.editAssignment(this.a_id, this.p_id, this.s_date, this.assignForm.value).subscribe((response) =>
    { console.log(response); this.refresh(); });
    this.aEditing = false;
    this.hideAssign(index);
    //window.location.reload();
  }*/
  getProjects() {
    this.projectService.getProjects().subscribe((response) =>
    { let temp = new Array;
      for(let i = 0; i < response.length; i++) {
        temp.push([response[i].name, response[i].billable]);
      }
      this.userProjects.push(temp)
    });
  }
  assigning = false;
  toggleAssign(){
    this.assigning = !this.assigning;
  }

  //stuff to display projects
  p_num = new Array
  displayProject(index: number){
    this.p_num.push(index);
  }
  hideProject(index: number){
    this.p_num.splice(this.p_num.indexOf(index), 1);
  }
  f_num = new Array
  displayFinished(index: number){
    this.f_num.push(index);
  }
  hideFinished(index: number){
    this.f_num.splice(this.f_num.indexOf(index), 1);
  }
  //stuff to assign projects
  a_num = new Array
  displayAssign(index: number){
    this.a_num.push(index);
    this.assignForm.patchValue({
      projectName: '',
      hourlyRate: 0,
    });
  }
  hideAssign(index: number){
    this.a_num.splice(this.a_num.indexOf(index), 1);
    this.assignForm.patchValue({
      projectName: '',
      hourlyRate: 0,
    });
  }
}
