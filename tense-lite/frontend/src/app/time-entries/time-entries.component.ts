import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TimeEntryService } from '../time-entry.service';
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
  entries$: Observable<any>;
  constructor(private timeEntryService: TimeEntryService, private fb: FormBuilder,
  private userService: UserService, public authService: AuthService) { }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user')!);
    var id: number;
    this.userService.getUserId(user.uid).subscribe((response) =>
    { id = response; this.entries$ = this.timeEntryService.getUserEntries(id); });
  }
  isChecked = false;
  editing = false;
  showFormToggle() {
    this.isChecked = !this.isChecked;
    this.entryForm.patchValue({
      user_id: '',
      project_id: '',
      entry_date: '',
      notes: '',
      hours: '',
      billable: ''
    })
  }
  entryForm = this.fb.group({
    user_id: ['', Validators.required],
    project_id: ['', Validators.required],
    entry_date: ['', Validators.required],
    notes: ['', Validators.required],
    hours: ['', Validators.required],
    billable: ['']
  });
  onSubmit() {
      this.timeEntryService.addEntry(this.entryForm.value).subscribe((response: any) =>
      { console.log(response);});
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
    this.editing = !this.editing;
    this.isChecked = !this.isChecked;
    var billable = '';
    if(entry.billable){
      billable = 'true';
    }
    this.entryForm.patchValue({
      user_id: entry.user_id,
      project_id: entry.project_id,
      entry_date: String(entry.entry_date),
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
