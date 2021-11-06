import { ReactNode } from 'react';

import { IconName } from 'ui/icon/icon.component';

export type EditInfoVariant = 'add' | 'edit';

export interface Props {
  id: string;
  label?: string;
  value?: string;
  form?: ReactNode;
  isValid?: boolean;
  icon?: IconName;
  variant?: EditInfoVariant;
  onDelete?: () => void;
}
