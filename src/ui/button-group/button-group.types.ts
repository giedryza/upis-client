import { ReactNode } from 'react';

import { IconName } from 'ui';

export interface Props {
  items: Item[];
  label?: string;
  ariaLabel?: string;
  name?: string;
  value?: string;
  onChange?: (value: string) => void;
  info?: string;
  error?: string;
  disabled?: boolean;
}

interface Item {
  label: ReactNode;
  value: string;
  disabled?: boolean;
  icon?: IconName;
}
