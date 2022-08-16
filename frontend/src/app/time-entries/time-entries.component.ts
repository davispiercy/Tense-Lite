import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TimeEntryService } from '../time-entry.service';
import { ProjectService } from '../project.service';
import { UserService } from '../user.service';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Entry } from '../models/entry.model';
import { AuthService } from '../shared/services/auth.service';
import { AssignmentService } from '../assignment.service';
import { AppComponent } from '../app.component';
import { CardModule } from 'primeng/card';
import { SplitButtonModule} from 'primeng/splitbutton';


@Component({
  selector: 'app-time-entries',
  templateUrl: './time-entries.component.html',
  styleUrls: ['./time-entries.component.scss']
})
export class TimeEntryComponent implements OnInit {
  entries = new Array;
  date = new Date();
  display = this.date.toLocaleDateString();
  name: String;
  projects = new Array;
  p_ids = new Array;
  user_id: number;
  items = new Array;
  displayResponsive = false;
  a_date: Date;
  hours: number;
  notes: String;
  constructor(private timeEntryService: TimeEntryService, private fb: FormBuilder,
  private userService: UserService, public authService: AuthService, public projectService: ProjectService,
  private assignmentService: AssignmentService, public appComponent: AppComponent) { }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user')!);
    this.userService.getUserId(user.uid).subscribe((response) =>
      { this.user_id = response;
        this.assignmentService.getAssignmentsByUser(this.user_id).subscribe((response2) =>
        { for(let i = 0; i < response2.length; i++) {
            this.getPName(response2[i].project_id);
          }
        });
        this.timeEntryService.getUserEntriesByDate(this.user_id, this.convertDate(this.date.toLocaleDateString())).subscribe((response3) =>
        { for(let i = 0; i < response3.length; i++) {
            this.getName(response3[i]);
          }
        });
      }
    );
    this.items = [
      {label: 'Delete', icon: 'pi pi-times'},
    ]
  }
  getName(entry: Entry){
    this.projectService.getProjectName(entry.project_id).subscribe((response) =>
    { this.entries.push([entry, response]); });
  }
  getPName(project_id: number){
    this.projectService.getProjectName(project_id).subscribe((response) =>
    { this.projects.push(response); this.p_ids.push(project_id); });
  }
  refresh() {
    this.entries = new Array;
    this.projects = new Array;
    this.p_ids = new Array;
    const user = JSON.parse(localStorage.getItem('user')!);
    this.userService.getUserId(user.uid).subscribe((response) =>
    { this.user_id = response;
      this.assignmentService.getAssignmentsByUser(this.user_id).subscribe((response2) =>
      { for(let i = 0; i < response2.length; i++) {
          this.getPName(response2[i].project_id);
        }
      });
      this.timeEntryService.getUserEntriesByDate(this.user_id, this.convertDate(this.date.toLocaleDateString())).subscribe((response3) =>
      { for(let i = 0; i < response3.length; i++) {
          this.getName(response3[i]);
        }
      });
    }
    );
  }
  add_entry() {
    this.timeEntryService.addBlankEntry(this.user_id).subscribe((response) =>
      { console.log(response); /*this.refresh();*/ } );
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

  cDate(date: String) {
      let month = date.slice(0, date.indexOf('/'));
      if(month.length == 1){
        month = '0' + month;
      }
      let day = date.slice(date.indexOf('/')+1, date.lastIndexOf('/'))
      if(day.length == 1){
        day = '0' + day;
      }
      let year = date.slice(date.lastIndexOf('/')+1);
      let ret = year + month + day;
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
    this.entryForm.patchValue({
      pName: '',
      entry_date: this.convertDate(this.date.toLocaleDateString()),
      notes: '',
      hours: '',
    })
  }
  entryForm = this.fb.group({
    pName: ['', Validators.required],
    entry_date: [this.convertDate(this.date.toLocaleDateString()), Validators.required],
    notes: ['', Validators.required],
    hours: ['', Validators.required],
  });
  onSubmit() {
    if(parseFloat(this.entryForm.value.hours!) % 0.25 == 0 &&
       parseFloat(this.entryForm.value.hours!) > 0.0 &&
       parseFloat(this.entryForm.value.hours!) <= 24.0){
      this.projectService.getProjectId(this.entryForm.value.pName!).subscribe((response2) =>
        { this.assignmentService.getAssignment(this.user_id, response2).subscribe((response3) =>
          { console.log(this.entryForm.value);
            this.timeEntryService.addEntry(this.user_id, response2, this.entryForm.value, response3.hourly_rate).subscribe((response4) =>
              { console.log(response4); this.refresh(); });
            });
          });
      this.isChecked = false;
    }


  }
  delete(id: number) {
    this.timeEntryService.delete(id).subscribe((response: any) =>
    { console.log(response); this.refresh(); });
    //window.location.reload();
  }
  id: number = 0;
  edit(entry: Entry, name: string) {
    this.id = entry.id;
    this.editing = true;
    this.isChecked = !this.isChecked;
    let cur_date = this.convertDateFromDate(String(entry.entry_date))
    this.entryForm.patchValue({
      pName: name,
      entry_date: cur_date,
      notes: entry.notes,
      hours: String(entry.hours),
    });
  }
  editEntry() {
    if(parseFloat(this.entryForm.value.hours!) % 0.25 == 0 &&
        parseFloat(this.entryForm.value.hours!) > 0.0 &&
        parseFloat(this.entryForm.value.hours!) <= 24.0) {
      this.timeEntryService.delete(this.id).subscribe((response0) =>
      { this.projectService.getProjectId(this.entryForm.value.pName!).subscribe((response2) =>
        { this.assignmentService.getAssignment(this.user_id, response2).subscribe((response3) =>
          { this.timeEntryService.addEntry(this.user_id, response2, this.entryForm.value, response3.hourly_rate).subscribe((response4) =>
            { console.log(response4); this.refresh(); });
          });
        });
      });
      this.editing = !this.editing;
      this.isChecked = !this.isChecked;
    }

  }
  dateForm = this.fb.group({
    display_date: [this.convertDate(this.date.toLocaleDateString()), [Validators.required]]
  });
  setDate() {
    if(this.dateForm.value.display_date){
      let temp = this.dateForm.value.display_date;
      let t = temp.split("-");
      this.date = new Date(parseInt(t[0]), parseInt(t[1])-1, parseInt(t[2]))
      this.entries = new Array;
      this.timeEntryService.getUserEntriesByDate(this.user_id, this.convertDate(this.date.toLocaleDateString())).subscribe((response3) =>
        { for(let i = 0; i < response3.length; i++) {
            this.getName(response3[i]);
          }
      });
    }
    else{    }
  }
  save(entry: any){
    if(entry[0].hours % 0.25 == 0){
      console.log(entry[0]);
      this.timeEntryService.delete(entry[0].id).subscribe((response) =>
      { this.projectService.getProjectId(entry[1]).subscribe((response2) =>
        { this.assignmentService.getAssignment(entry[0].user_id, response2).subscribe((response3) =>
          { this.timeEntryService.addEntry(entry[0].user_id, response2, entry[0], response3.hourly_rate).subscribe((response4) =>
            { console.log(response4); });
          });
        });
      });
    }
  }
  addBlank(user_id: number, date: Date){
    this.timeEntryService.addBlank(user_id, date).subscribe((response) =>
    { console.log(response); });
  }
}

