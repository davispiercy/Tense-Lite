import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserProfileComponent} from './user-profile/user-profile.component';
import { AuthGuard } from '@auth0/auth0-angular';

const routes: Routes = [
{ path: 'users', component: UserListComponent, canActivate: [AuthGuard] },
{ path: 'user-profile', component: UserProfileComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
