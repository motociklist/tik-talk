import {Profile} from './profile.interfase';

export interface Chat {
  created?: Date;
  id: string;
  message?: string;
  undeadMessage?: string;
  userFrom: Profile;
}
