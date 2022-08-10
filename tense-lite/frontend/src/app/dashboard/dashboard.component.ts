import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { UserService } from '../user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(public authService: AuthService, public userService: UserService) { }
  name: Observable<any>
  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user')!);
    this.name = this.userService.getName(user.uid)
  }

}
