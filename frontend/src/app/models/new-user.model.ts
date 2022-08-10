import { BigUser } from '../models/big-user.model';
import { NewAssignment } from '../models/new-assignment.model';

export class NewUser {
  uid: string;
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  sec_group: string;
  enabled: boolean;
  active_assignments: Array<NewAssignment>;
  inactive_assignments: Array<NewAssignment>;

  constructor(uid: string, id: number, first_name: string, last_name: string, email: string,
   sec_group: string, enabled: boolean) {
    this.uid = uid;
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.sec_group = sec_group;
    this.enabled = enabled;
    this.active_assignments = new Array<NewAssignment>;
    this.inactive_assignments = new Array<NewAssignment>;
  }
}
