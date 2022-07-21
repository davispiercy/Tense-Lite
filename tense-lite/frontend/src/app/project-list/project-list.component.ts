import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProjectService } from '../project.service';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Project } from '../models/project.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  projects$: Observable<any>;

  constructor(private projectService: ProjectService, private fb: FormBuilder,
  private userService: UserService ) { }

  ngOnInit(): void {
    var ids: any;
    var id: any
    /*this.userService.getUserId(JSON.parse(localStorage.getItem('user')!).uid).subscribe((response) =>
      { id = response; this.projectService.getProjectIds(id).subscribe((response2) =>
        { ids = response2; this.projects$ = this.projectService.getUserProjects(ids); });
      });*/
    this.projects$ = this.projectService.getProjects();
  }

  isChecked = false;
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
    end_date: ['', Validators.required],
    billable: ['']
  });

  onSubmit() {
    this.projectService.addProject(this.projectForm.value).subscribe((response: any) =>
    { console.log(response); });
    window.location.reload();
  }

  disable(project: Project) {
    this.projectService.disableProject(project).subscribe((response: any) =>
    { console.log(response);} );
    window.location.reload();
  }


}
