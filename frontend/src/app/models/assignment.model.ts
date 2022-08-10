export interface Assignment {
  user_id: number;
  project_id: number;
  hourly_rate: number;
  start_date: Date;
  end_date: Date;
  enabled: boolean;
}
