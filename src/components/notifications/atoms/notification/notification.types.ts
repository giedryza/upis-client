import { ReactNode } from 'react';

import { Status } from 'types/common';

export interface Props {
  id: string;
  type: Status;
  message: ReactNode;
}
