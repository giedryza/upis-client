import { ReactNode } from 'react';

import { ButtonProps } from 'ui';

export interface Props {
  label: string;
  title: string;
  popover: ReactNode;
  active?: boolean;
  actions?: (ButtonProps & { closable?: boolean })[];
  disabled?: boolean;
}
