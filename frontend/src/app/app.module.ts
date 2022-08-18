import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MyInterceptor } from './my.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserListComponent } from './user-list/user-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { TimeEntryComponent } from './time-entries/time-entries.component';
import { initializeApp } from 'firebase/app';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../environments/environment';
import { AuthService } from './shared/services/auth.service';
import { DashboardComponent} from './dashboard/dashboard.component';
import { ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import { SignInComponent} from './sign-in/sign-in.component';
import { SignUpComponent} from './sign-up/sign-up.component';
import { VerifyEmailComponent} from './verify-email/verify-email.component';
import { CardModule } from 'primeng/card';
import { SplitButtonModule } from 'primeng/splitbutton';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {CalendarModule} from 'primeng/calendar';
import {SliderModule} from 'primeng/slider';
import {MultiSelectModule} from 'primeng/multiselect';
import {ContextMenuModule} from 'primeng/contextmenu';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import {ProgressBarModule} from 'primeng/progressbar';
import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {InputNumberModule} from 'primeng/inputnumber';
import {CheckboxModule} from 'primeng/checkbox';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    HeaderComponent,
    ProjectListComponent,
    TimeEntryComponent,
    DashboardComponent,
    ForgotPasswordComponent,
    SignInComponent,
    SignUpComponent,
    VerifyEmailComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    CardModule,
    SplitButtonModule,
    MenuModule,
    TableModule,
    InputTextModule,
    FormsModule,
    InputTextareaModule,
    DropdownModule,
    InputNumberModule,
    DialogModule,
    CalendarModule,
    CheckboxModule,
    ToastModule,
  ],
  //providers: [],
  providers: [ { provide: HTTP_INTERCEPTORS, useClass: MyInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
