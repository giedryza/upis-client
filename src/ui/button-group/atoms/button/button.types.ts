import { ReactNode } from 'react';

import { IconName } from 'ui';

export interface Props {
  label: ReactNode;
  value: string;
  disabled?: boolean;
  icon?: IconName;
}
