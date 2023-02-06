import { ReactNode } from 'react';

export interface Props {
  label: ReactNode;
  value: string;
  disabled?: boolean;
  variant?: 'primary' | 'neutral';
}
