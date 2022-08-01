import { Component, OnInit } from '@angular/core';
import { UserListComponent } from './user-list/user-list.component';
import { HeaderComponent } from './header/header.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';
  date = new Date();
}
