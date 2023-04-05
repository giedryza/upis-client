import { ReactNode } from 'react';

export interface Props {
  onInView: (isInView: boolean) => void;
  placeholder?: ReactNode;
  focusable?: boolean;
}
