import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../user.service';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { User } from '../models/user.model';
import { AuthService } from '../shared/services/auth.service';
import { ProjectService } from '../project.service';
import { TimeEntryService } from '../time-entry.service';
import { AssignmentService } from '../assignment.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})

export class UserListComponent implements OnInit {
  //activeUsers$: Observable<any>;
  inactiveUsers$: Observable<any>;
  projects$: Observable<any>;
  activeData = new Array;
  userProjects = new Array;
  ps = new Array;
  p_ids = new Array;

  constructor(private userService: UserService, private fb: FormBuilder,
  public authService: AuthService, private projectService: ProjectService,
  private timeEntryService: TimeEntryService, private fb1: FormBuilder,
  private assignmentService: AssignmentService) {}

  ngOnInit(): void {
    //this.activeUsers$ = this.userService.getUsers();
    this.inactiveUsers$ = this.userService.getDisabledUsers();
    this.userService.getUsers().subscribe((response) =>
    { for(let i = 0; i < response.length; i++){
        this.activeData.push([response[i], []]);
        this.userProjects.push([response[i].id, []]);
        this.projectService.getProjectsByUser(response[i].id).subscribe((response2) =>
        { for(let j = 0; j < response2.length; j++){
            this.getName(response2[j], response[i].id, i);
          }
        });
      }
    });
    this.getProjects();
  }
  getName(id: number, user: number, position: number){
    this.projectService.getProjectName(id).subscribe((response) =>
    { this.activeData[position][1].push([response, 0]);
      this.userProjects[position][1].push(response);
      //this.ps.add(response);
      //console.log(this.ps);
      this.getAmount(user, id, position, this.activeData[position][1].length - 1);
    });
  }
  getAmount(user: number, project: number, ad_position: number, p_position: number) {
    this.timeEntryService.getEntriesUserProject(user, project).subscribe((response) =>
    { let sum = 0;
      let rate = 0;
      for(let i = 0; i < response.length; i++) {
        sum += response[i].entry_value;
        rate = response[i].hourly_rate;
      }
      this.activeData[ad_position][1][p_position][1] = sum;
      this.activeData[ad_position][1][p_position][2] = rate;
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
    { console.log(response);});
    window.location.reload();
  }

  disable(user: User) {
    this.userService.disableUser(user).subscribe((response: any) =>
    { console.log(response);} );
    window.location.reload();
  }
  enable(user: User) {
      this.userService.enableUser(user).subscribe((response: any) =>
      { console.log(response);} );
      window.location.reload();
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
    { console.log(response);});
    this.editing = true;
    this.isChecked = !this.isChecked;
    window.location.reload();
  }
  makeAdmin(user: User) {
    this.userService.makeAdmin(user).subscribe((response: any) =>
    { console.log(response);} );
    window.location.reload();
  }
  removeAdmin(user: User) {
      this.userService.removeAdmin(user).subscribe((response: any) =>
      { console.log(response);} );
      window.location.reload();
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
  assignProject(user_id: number){
    let project_id = 0;
    for(let j = 0; j < this.ps.length; j++) {
      if(this.ps[j] == this.projectName){
        project_id = this.p_ids[j];
      }
    }
    this.assignmentService.createAssignment(user_id, project_id, this.hourlyRate!).subscribe((response) =>
    { console.log(response); });
    this.assigning = false;
  }
  /*endAssignment(user_id: number, project_name: string) {
    this.assignmentService.endAssignment(user_id, project_id)
  }*/
  getProjects() {
    this.projectService.getProjects().subscribe((response) =>
    { for(let i = 0; i < response.length; i++) {
        this.ps.push(response[i].name);
        this.p_ids.push(response[i].id);
      }
    });
  }
  assigning = false;
  toggleAssign(){
    this.assigning = !this.assigning;
  }
  displayProjects = false;
}
