import { BigAssignment } from '../models/big-assignment.model';

export class NewAssignment {
  user_id: number;
  project_id: number;
  project_name: string;
  hourly_rate: number;
  start_date: Date;
  end_date: Date;
  amount: number;
  enabled: boolean;

  constructor(user_id: number, project_id: number, project_name: string, hourly_rate: number,
    start_date: Date, end_date: Date, amount: number, enabled: boolean) {
    this.user_id = user_id;
    this.project_id = project_id;
    this.project_name = project_name;
    this.hourly_rate = hourly_rate;
    this.start_date = start_date;
    this.end_date = end_date;
    this.amount = amount;
    this.enabled = enabled;
  }
}
