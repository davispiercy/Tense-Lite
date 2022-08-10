import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import {MenuModule} from 'primeng/menu';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  constructor(public authService: AuthService) { }
  items = new Array;
  ngOnInit(): void {
    this.items = [
      {label: 'Tense Lite'},
      {label: 'Time Entries', icon: 'pi pi-fw pi-clock', routerLink: '/entries'},
      {label: 'Users', icon: 'pi pi-fw pi-user', routerLink: '/users'},
      {label: 'Projects', icon: 'pi pi-fw pi-book', routerLink: '/projects'},
      {label: 'Profile', icon: 'pi pi-fw pi-home', routerLink: '/dashboard'},
      {label: 'Log Out', icon: 'pi pi-fw pi-sign-out', command: () => { this.authService.SignOut(); }},
    ]
  }



}
