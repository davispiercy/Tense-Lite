import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../user.service';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})

export class UserListComponent implements OnInit {
  users$: Observable<any>;
  empty$: Observable<any>;

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


  refresh() {
      this.users$ = this.empty$;
      this.users$ = this.userService.getUsers();
  }

  onSubmit() {
    this.userService.addUser(this.userForm.value).subscribe((response: any) =>
    { console.log(response);});
    this.refresh();
    this.showFormToggle()
  }



}
