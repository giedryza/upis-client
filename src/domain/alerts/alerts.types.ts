import { ReactNode } from 'react';

import { Status } from 'types/common';

export interface Alert {
  id: string;
  type: Status;
  message: ReactNode;
}
