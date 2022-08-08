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
  fields?: Field[];
  actions?: ButtonProps[];
}
