import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { AuthButtonComponent } from './auth-button/auth-button.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';
}
