import { BigAssignment } from '../models/big-assignment.model';

export interface BigUser {
  uid: string;
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  sec_group: string;
  enabled: boolean;
  assignments: Array<BigAssignment>
}
