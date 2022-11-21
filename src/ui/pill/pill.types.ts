import { ReactNode } from 'react';

import { ButtonProps } from 'ui';

export interface Props {
  label: string;
  title: string;
  actions?: (ButtonProps & { closable?: boolean })[];
  popover: ReactNode;
}
