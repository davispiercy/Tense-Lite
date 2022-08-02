import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProjectService } from '../project.service';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Project } from '../models/project.model';
import { UserService } from '../user.service';
import { AuthService } from '../shared/services/auth.service'

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  enabledProjects$: Observable<any>;
  disabledProjects$: Observable<any>;
  month: String;
  result: String;
  constructor(private projectService: ProjectService, private fb: FormBuilder,
  private userService: UserService, public authService: AuthService ) { }

  ngOnInit(): void {
    this.enabledProjects$ = this.projectService.getProjects();
    this.disabledProjects$ = this.projectService.getDisabledProjects();
  }
  refresh() {
    this.enabledProjects$ = this.projectService.getProjects();
    this.disabledProjects$ = this.projectService.getDisabledProjects();
  }
  isChecked = false;
  editing = false;
  showFormToggle() {
    this.isChecked = !this.isChecked;
    this.projectForm.patchValue({
      name: '',
      start_date: '',
      end_date: '',
      billable: ''
    });
  }
  projectForm = this.fb.group({
    name: ['', Validators.required],
    start_date: ['', Validators.required],
    end_date: [''],
    billable: ['']
  });

  onSubmit() {
    this.projectService.addProject(this.projectForm.value).subscribe((response: any) =>
    { console.log(response); this.refresh(); });
    this.isChecked = false;
    //window.location.reload();

  }

  disable(project: Project) {
    this.projectService.disableProject(project).subscribe((response: any) =>
    { console.log(response); this.refresh(); } );
    this.isChecked = false;
    //window.location.reload();
  }

  enable(project: Project) {
      this.projectService.enableProject(project).subscribe((response: any) =>
      { console.log(response); this.refresh();} );
      this.isChecked = false;
      //window.location.reload();
    }
  convertDateFromDate(date: String) {
      let year = date.slice(0, date.indexOf(','));
      let month = date.slice(date.indexOf(',')+1, date.lastIndexOf(','));
      if(month.length == 1){
        month = '0' + month;
      }
      let day = date.slice(date.lastIndexOf(',')+1);
      if(day.length == 1){
        day = '0' + day;
      }
      let ret = year + '-' + month + '-' + day;
      return ret;
    }
  formatString(date: any) {
    if(date[1] == 1){this.month='January'}
    else if(date[2] == 2){this.month='February'}
    else if(date[2] == 3){this.month='March'}
    else if(date[2] == 4){this.month='April'}
    else if(date[2] == 5){this.month='May'}
    else if(date[2] == 6){this.month='June'}
    else if(date[2] == 7){this.month='July'}
    else if(date[2] == 8){this.month='August'}
    else if(date[2] == 9){this.month='September'}
    else if(date[2] == 10){this.month='October'}
    else if(date[2] == 11){this.month='November'}
    else{this.month='December'}
    return this.month + ' ' + date[2] + ', ' + date[0]
  }
  id: number = 0;
  edit(project: Project){
    this.id = project.id;
    this.editing = true;
    this.isChecked = !this.isChecked;
    var billable = '';
    if (project.billable){
      billable = 'true'
    }
    let s_date = this.convertDateFromDate(String(project.start_date))
    let e_date = this.convertDateFromDate(String(project.end_date))
    this.projectForm.patchValue({
      name: project.name,
      start_date: s_date,
      end_date: e_date,
      billable: billable,
    });
  }
  editProject() {
    this.projectService.editProject(this.id, this.projectForm.value).subscribe((response) =>
    { console.log(response); this.refresh();});
    this.editing = false;
    this.isChecked = false;
    //window.location.reload();
  }
  stopEdit() {
    this.editing = false;
    this.isChecked = !this.isChecked;
  }
}
