import { ReactNode } from 'react';

import { Status } from 'types/common';

export interface Notification {
  id: string;
  type: Status;
  message: ReactNode;
}
