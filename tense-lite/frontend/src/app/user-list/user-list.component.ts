import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})

export class UserListComponent implements OnInit {
  users$: Observable<any>;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.users$ = this.userService.getUsers();
  }
  isChecked = false;
  showFormToggle() {
    this.isChecked = !this.isChecked;
  }
}
