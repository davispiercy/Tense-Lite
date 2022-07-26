import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../user.service';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { User } from '../models/user.model';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})

export class UserListComponent implements OnInit {
  activeUsers$: Observable<any>;
  inactiveUsers$: Observable<any>;

  constructor(private userService: UserService, private fb: FormBuilder,
  public authService: AuthService) {}

  ngOnInit(): void {
    this.activeUsers$ = this.userService.getUsers();
    this.inactiveUsers$ = this.userService.getDisabledUsers();
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
  enable(user: User) {
      this.userService.enableUser(user).subscribe((response: any) =>
      { console.log(response);} );
      window.location.reload();
  }
  id: number = 0;
  uid: string;
  edit(user: User) {
    this.id = user.id;
    this.uid = user.uid;
    this.editing = true;
    this.isChecked = !this.isChecked;
    var enabled = '';
    if(user.enabled){
      enabled = 'true';
    }
    this.userForm.patchValue({
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      sec_group: user.sec_group,
      enabled: enabled,
    });
  }
  editUser() {
    this.userService.editUser(this.id, this.uid, this.userForm.value).subscribe((response: any) =>
    { console.log(response);});
    this.editing = true;
    this.isChecked = !this.isChecked;
    +window.location.reload();
  }
  makeAdmin(user: User) {
    this.userService.makeAdmin(user).subscribe((response: any) =>
    { console.log(response);} );
    window.location.reload();
  }
  removeAdmin(user: User) {
      this.userService.removeAdmin(user).subscribe((response: any) =>
      { console.log(response);} );
      window.location.reload();
    }
  stopEdit() {
      this.editing = false;
      this.isChecked = !this.isChecked;
    }

}
