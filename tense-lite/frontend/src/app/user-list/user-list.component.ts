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
  editing = false;
  showFormToggle() {
    this.isChecked = !this.isChecked;
    this.userForm.patchValue({
      first_name: '',
      last_name: '',
      email: '',
      sec_group: '',
      enabled: '',
    })
  }
  userForm = this.fb.group({
    first_name: ['', Validators.required],
    last_name: ['', Validators.required],
    email: ['', Validators.required],
    sec_group: ['', Validators.required],
    enabled: ['', Validators.required],
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
  id: number = 0;
  edit(user: User) {
    this.id = user.id
    this.editing = !this.editing;
    this.isChecked = !this.isChecked;
    var enabled = '';
    if(user.enabled){
      enabled = 'true'
    }
    this.userForm.patchValue({
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      sec_group: user.sec_group,
      enabled: enabled,
    });
  }
  editEntry() {
    this.userService.editUser(this.id, this.userForm.value).subscribe((response: any) =>
    { console.log(response);});
    this.editing = true;
    this.isChecked = !this.isChecked;
    window.location.reload();
  }

}
