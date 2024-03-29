import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProjectService } from '../project.service';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Project } from '../models/project.model';
import { UserService } from '../user.service';
import { AuthService } from '../shared/services/auth.service'
import { SelectItem } from 'primeng/api';
import { Directive, Input, HostListener } from '@angular/core';
import { NewProject } from '../models/new-project.model';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  enabledProjects: Array<any> = [];
  disabledProjects: Array<any> = [];
  month: String;
  result: String;
  displayResponsive: boolean;
  name: String;
  s_date: Date;
  e_date: Date;
  billable: boolean;
  projects = new Array;
  disabled_projects = new Array;

  constructor(private projectService: ProjectService, private fb: FormBuilder,
  private userService: UserService, public authService: AuthService ) { }

  ngOnInit(): void {
    this.projectService.getProjects().subscribe((response) =>
    { for(let i = 0; i < response.length; i++){
        if(response[i].start_date){
          response[i].start_date = this.cdd(response[i].start_date);
        }
        if(response[i].end_date){
          response[i].end_date = this.cdd(response[i].end_date);
        }
        this.enabledProjects.push(response[i]);
        this.projects.push(new NewProject(response[i].id, response[i].name, response[i].start_date,
           response[i].end_date, response[i].billable, response[i].enabled));
      }
    });
    this.projectService.getDisabledProjects().subscribe((response) =>
    { for(let i = 0; i < response.length; i++){
        if(response[i].start_date){
          response[i].start_date = this.cdd(response[i].start_date);
        }
        if(response[i].end_date){
          response[i].end_date = this.cdd(response[i].end_date);
        }
        this.disabledProjects.push(response[i]);
        this.disabled_projects.push(new NewProject(response[i].id, response[i].name, response[i].start_date,
          response[i].end_date, response[i].billable, response[i].enabled));
      }
    });
  }
  addRow(dt: any) {
    this.projectService.addRow().subscribe((response) =>
      {  this.refresha(dt);  /**/ });
  }
  refresh() {
    //this.enabledProjects$ = this.projectService.getProjects();
    //this.disabledProjects$ = this.projectService.getDisabledProjects();
    this.projects = [];
    this.disabled_projects = [];
    this.projectService.getProjects().subscribe((response) =>
        { for(let i = 0; i < response.length; i++){
            if(response[i].start_date){
              response[i].start_date = this.cdd(response[i].start_date);
            }
            if(response[i].end_date){
              response[i].end_date = this.cdd(response[i].end_date);
            }
            this.enabledProjects.push(response[i]);
            this.projects.push(new NewProject(response[i].id, response[i].name, response[i].start_date,
               response[i].end_date, response[i].billable, response[i].enabled));
          }
        });
    this.projectService.getDisabledProjects().subscribe((response) =>
        { for(let i = 0; i < response.length; i++){
            if(response[i].start_date){
              response[i].start_date = this.cdd(response[i].start_date);
            }
            if(response[i].end_date){
              response[i].end_date = this.cdd(response[i].end_date);
            }
            this.disabledProjects.push(response[i]);
            this.disabled_projects.push(new NewProject(response[i].id, response[i].name, response[i].start_date,
              response[i].end_date, response[i].billable, response[i].enabled));
          }
        });
  }
  refresha(dt: any) {
      this.projects = []
      this.projectService.getProjects().subscribe((response) =>
          { for(let i = 0; i < response.length; i++){
              if(response[i].start_date){
                response[i].start_date = this.cdd(response[i].start_date);
              }
              if(response[i].end_date){
                response[i].end_date = this.cdd(response[i].end_date);
              }
              this.enabledProjects.push(response[i]);
              this.projects.push(new NewProject(response[i].id, response[i].name, response[i].start_date,
                 response[i].end_date, response[i].billable, response[i].enabled));
            }
      dt.initRowEdit(this.projects[this.projects.length-1]);
          });
    }
  onRowEditInit(project: Project) {

  }
  onRowEditSave(project: Project) {
    this.projectService.editProject(project.id, project).subscribe((response: any) =>
        { console.log(response); });
  }
  onRowEditCancel(project: Project, index: number) {
    if(project.name == ''){
      this.projectService.deleteProject(project).subscribe((response) =>
      { console.log(response); this.refresh(); });
    }
  }
  showResponsiveDialog(){
    this.displayResponsive = true;
    this.name = ''
    this.billable = false;
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
    { console.log(response); /*this.refresh();*/ });
    this.isChecked = false;
  }
  addP() {
    this.projectService.addP(this.name, this.s_date, this.e_date, this.billable).subscribe((response: any) =>
    { console.log(response); });
    this.displayResponsive = false;
  }

  disable(project: Project) {
    this.projectService.disableProject(project).subscribe((response: any) =>
    { console.log(response); this.refresh(); } );
    this.isChecked = false;
  }

  enable(project: Project) {
      this.projectService.enableProject(project).subscribe((response: any) =>
      { console.log(response); this.refresh();} );
      this.isChecked = false;
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

  cdd(date: any){
    //console.log(date[0].toString());
    let year = date[0].toString();
    let month = date[1].toString();
    let day = date[2].toString();
    if(month.length == 1){
      month = '0' + month;
    }
    if(day.length == 1){
      day = '0' + day;
    }
    return (year + '-' + month + '-' + day);
  }
  formatString(date: any) {
    let month = parseInt(date.substring(5,7))
    let r_month
    if(month == 1){r_month='January'}
    else if(month == 2){r_month='February'}
    else if(month == 3){r_month='March'}
    else if(month == 4){r_month='April'}
    else if(month == 5){r_month='May'}
    else if(month == 6){r_month='June'}
    else if(month == 7){r_month='July'}
    else if(month == 8){r_month='August'}
    else if(month == 9){r_month='September'}
    else if(month == 10){r_month='October'}
    else if(month == 11){r_month='November'}
    else{r_month='December'}
    return r_month + ' ' + date.substring(8,10) + ', ' + date.substring(0,4);
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
    { console.log(response); /*this.refresh();*/});
    this.editing = false;
    this.isChecked = false;
  }
  stopEdit() {
    this.editing = false;
    this.isChecked = !this.isChecked;
  }
}
