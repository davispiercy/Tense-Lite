import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { TimeEntryComponent } from './time-entries/time-entries.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
{ path: 'users', component: UserListComponent},
{ path: 'projects', component: ProjectListComponent},
{ path: 'entries', component: TimeEntryComponent},
{ path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
