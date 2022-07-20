import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  loggedIn = false
  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    if(this.authService.isLoggedIn) {
      this.loggedIn = true;
    }
    else {
      this.loggedIn = false;
    }
  }
  logOut() {
    this.loggedIn = false;
  }
  logIn() {
    this.loggedIn = true;
  }

}
