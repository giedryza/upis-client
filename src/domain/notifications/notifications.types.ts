import { Status } from 'types/common';

export interface Notification {
  id: string;
  type: Status;
  message: string;
}
