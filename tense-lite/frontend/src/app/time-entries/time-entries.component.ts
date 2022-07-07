import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TimeEntryService } from '../time-entry.service';

@Component({
  selector: 'app-time-entries',
  templateUrl: './time-entries.component.html',
  styleUrls: ['./time-entries.component.scss']
})
export class TimeEntryComponent implements OnInit {
  entries$: Observable<any>;
  constructor(private timeEntryService: TimeEntryService) { }

  ngOnInit(): void {
    this.entries$ = this.timeEntryService.getEntries();
  }

}
