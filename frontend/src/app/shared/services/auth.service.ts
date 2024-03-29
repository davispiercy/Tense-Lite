import { Injectable, NgZone } from '@angular/core';
import { User } from '../../models/user.model';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { UserService } from '../../user.service';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any; // Save logged in user data
  isAdmin: boolean = false;
  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone, // NgZone service to remove outside scope warning
    private userService: UserService,
  ) {
    /* Saving user data in localstorage when
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
        //console.log(JSON.stringify(this.userData.uid));
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
      this.userService.getRole(JSON.parse(JSON.stringify(this.userData.uid))).subscribe((response) =>
        { this.isAdmin = (response == 'admin'); });
    });

  }
  // Sign in with email/password
  SignIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        });
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
  // Sign up with email/password
  SignUp(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign
        up and returns promise */
        this.SendVerificationMail();
        this.SetUserData(result.user);
        //window.alert(result.user!.email);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
  // Send email verification when new user sign up
  SendVerificationMail() {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        //this.router.navigate(['verify-email-address']);
        this.router.navigate(['']);
      });
  }
  // Reset Forgot password
  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error);
      });
  }
  // Returns true when user is logged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null; //&& user.emailVerified !== false ? true : false;
  }
  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider()).then((res: any) => {
      if (res) {
        this.router.navigate(['dashboard']);
      }
    });
  }
  // Auth logic to run auth providers
  AuthLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.SetUserData(result.user);
        this.ngZone.run(() => {
          this.router.navigate(['entries']);
        });
      })
      .catch((error) => {
        window.alert(error);
      });
  }
  /* Setting up user data when sign in with username/password,
  sign up with username/password and sign in with social auth
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user: any) {
    localStorage.setItem('user', JSON.stringify(user));

    this.userService.checkIfExists(user.uid).subscribe((response: any) =>
      { if(response) {
          var eUser: User;
          this.userService.getUserById(user.uid).subscribe((response: any) =>
            { eUser = response;
          const userRef: AngularFirestoreDocument<any> = this.afs.doc(
            `users/${user.id}`
          );
          return userRef.set(eUser, {
            merge: true,
          });});
        }
        else {
          var nUser: User;
          console.log(user.uid);
          //var name = user.displayName.split(" ");
          var data = {"uid": user.uid, "email": user.email};
          this.userService.addUser(data).subscribe((response: any) =>
          { nUser = response; console.log(nUser);
          const userRef: AngularFirestoreDocument<any> = this.afs.doc(
            `users/${user.id}`
          );
          return userRef.set(nUser, {
            merge: true,
          });});
        }
      });
  }
  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']);
    });
  }
  getJWT() {
    return this.userData.getIdToken();
  }
}
