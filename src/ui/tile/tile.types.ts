import { ReactNode } from 'react';

import { IconName, ButtonProps } from 'ui';

interface Field {
  label: string;
  sublabel: ReactNode;
}

export interface Props {
  title: string;
  icon: IconName;
  subtitle?: string;
  heading?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  fields?: Field[];
  actions?: ButtonProps[];
}
