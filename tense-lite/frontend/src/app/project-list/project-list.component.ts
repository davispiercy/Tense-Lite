import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  projects$: Observable<any>;
  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.projects$ = this.projectService.getProjects();
  }

}
