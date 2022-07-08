import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../user.service';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { User } from '../models/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})

export class UserListComponent implements OnInit {
  users$: Observable<any>;

  constructor(private userService: UserService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.users$ = this.userService.getUsers();
  }
  isChecked = false;
  showFormToggle() {
    this.isChecked = !this.isChecked;
    this.userForm.patchValue({
      first_name: '',
      last_name: '',
      email: ''
    })
  }
  userForm = this.fb.group({
    first_name: ['', Validators.required],
    last_name: ['', Validators.required],
    email: ['', Validators.required]
  });

  onSubmit() {
    this.userService.addUser(this.userForm.value).subscribe((response: any) =>
    { console.log(response);});
    window.location.reload();
  }

  disable(user: User) {
    this.userService.disableUser(user).subscribe((response: any) =>
    { console.log(response);} );
    window.location.reload();
  }

}
