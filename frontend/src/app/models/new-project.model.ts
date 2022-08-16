export class NewProject {
  id: number;
  name: string;
  start_date: Date;
  end_date: Date;
  billable: boolean;
  enabled: boolean;

  constructor(id: number, name: string, start_date: Date, end_date: Date, billable: boolean, enabled: boolean) {
    this.id = id;
    this.name = name;
    this.start_date = start_date;
    this.end_date = end_date;
    this.billable = billable;
    this.enabled = enabled;
  }
}
