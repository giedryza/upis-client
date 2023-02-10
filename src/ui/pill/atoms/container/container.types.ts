import { ComponentProps, ReactElement } from 'react';

import { Content } from '..';

export interface Props {
  label: string;
  children: ReactElement<ComponentProps<typeof Content>>;
  active?: boolean;
  disabled?: boolean;
}
