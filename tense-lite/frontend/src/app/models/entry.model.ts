export interface Entry {
  id: number;
  user_id: string;
  project_id: string;
  entry_date: Date;
  notes: string;
  hours: number;
  //hourly_rate: number;
  entry_value: number;
  billable: boolean
  enabled: boolean;
}
