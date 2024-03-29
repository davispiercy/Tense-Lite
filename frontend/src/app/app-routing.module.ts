import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { TimeEntryComponent } from './time-entries/time-entries.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { AuthGuard } from './shared/guard/auth.guard';

const routes: Routes = [
{ path: '', redirectTo: 'dashboard', pathMatch: 'full' },
{ path: 'sign-in', component: SignInComponent },
{ path: 'register-user', component: SignUpComponent },
{ path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
{ path: 'forgot-password', component: ForgotPasswordComponent },
{ path: 'verify-email-address', component: VerifyEmailComponent },
{ path: 'users', component: UserListComponent, canActivate: [AuthGuard]},
{ path: 'projects', component: ProjectListComponent, canActivate: [AuthGuard]},
{ path: 'entries', component: TimeEntryComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
