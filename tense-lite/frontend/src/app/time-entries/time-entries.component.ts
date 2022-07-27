import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TimeEntryService } from '../time-entry.service';
import { ProjectService } from '../project.service';
import { UserService } from '../user.service';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Entry } from '../models/entry.model';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-time-entries',
  templateUrl: './time-entries.component.html',
  styleUrls: ['./time-entries.component.scss']
})
export class TimeEntryComponent implements OnInit {
  entries = new Array;
  //entries$: Observable<any>;
  date = new Date();
  display = this.date.toLocaleDateString();
  name: String;
  constructor(private timeEntryService: TimeEntryService, private fb: FormBuilder,
  private userService: UserService, public authService: AuthService, public projectService: ProjectService) { }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user')!);
    /*this.userService.getUserId(user.uid).subscribe((response) =>
    { this.entries$ = this.timeEntryService.getUserEntries(response); });*/
    this.userService.getUserId(user.uid).subscribe((response) =>
      { this.timeEntryService.getUserEntries(response).subscribe((response) =>
        { //this.entries = response;
          for(let i = 0; i < response.length; i++){
            this.getName(response[i]);
          }
        });
      });


  }
  getName(entry: Entry){
    this.projectService.getProjectName(entry.project_id).subscribe((response) =>
    { this.entries.push([entry, response]);});
  }
  isChecked = false;
  editing = false;
  convertDate(date: String) {
    let month = date.slice(0, date.indexOf('/'));
    if(month.length == 1){
      month = '0' + month;
    }
    let day = date.slice(date.indexOf('/')+1, date.lastIndexOf('/'))
    if(day.length == 1){
      day = '0' + day;
    }
    let year = date.slice(date.lastIndexOf('/')+1);
    let ret = year + '-' + month + '-' + day;
    return ret;
  }
  convertDateFromDate(date: String) {
    let year = date.slice(0, date.indexOf(','));
    let month = date.slice(date.indexOf(',')+1, date.lastIndexOf(','));
    if(month.length == 1){
      month = '0' + month;
    }
    let day = date.slice(date.lastIndexOf(',')+1);
    if(day.length == 1){
      day = '0' + day;
    }
    let ret = year + '-' + month + '-' + day;
    return ret;
  }

  showFormToggle() {
    this.isChecked = !this.isChecked;
    let date = new Date();
    let newDate = this.convertDate(this.display);
    this.entryForm.patchValue({
      user_id: '',
      project_id: '',
      entry_date: newDate,
      notes: '',
      hours: '',
      billable: ''
    })
  }
  entryForm = this.fb.group({
    user_id: [''],
    project_id: ['', Validators.required],
    entry_date: ['', Validators.required],
    notes: ['', Validators.required],
    hours: ['', Validators.required],
    billable: ['']
  });
  onSubmit() {
      this.userService.getUserId(this.authService.userData.uid).subscribe((response) =>
      { this.timeEntryService.addEntry(response, this.entryForm.value).subscribe((response) =>
        { console.log(response); });
      });
      this.isChecked = false;
      window.location.reload();
  }
  delete(id: number) {
    this.timeEntryService.delete(id).subscribe((response: any) =>
    { console.log(response);} );
    window.location.reload();
  }
  id: number = 0;
  edit(entry: Entry) {
    this.id = entry.id;
    this.editing = true;
    this.isChecked = !this.isChecked;
    var billable = '';
    if(entry.billable){
      billable = 'true';
    }
    let cur_date = this.convertDateFromDate(String(entry.entry_date))
    this.entryForm.patchValue({
      user_id: entry.user_id,
      project_id: entry.project_id,
      entry_date: cur_date,
      notes: entry.notes,
      hours: String(entry.hours),
      billable: billable
    });
  }
  editEntry() {
    this.timeEntryService.editEntry(this.id, this.entryForm.value).subscribe((response: any) =>
    { console.log(response);});
    this.editing = !this.editing;
    this.isChecked = !this.isChecked;
    window.location.reload();
  }
}
