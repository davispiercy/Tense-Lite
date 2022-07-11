import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  isChecked = false;
  showFormToggle() {
    this.isChecked = !this.isChecked;
    this.loginForm.patchValue({
      email: '',
      password: ''
    })
  }

  loginForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  onSubmit() {
    console.log(this.loginForm.value.email);
    this.showFormToggle();
  }

  //const provider = new GoogleAuthProvider();

}
