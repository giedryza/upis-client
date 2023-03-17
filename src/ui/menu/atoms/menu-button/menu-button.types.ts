import { AriaMenuProps } from 'react-aria';
import { MenuTriggerProps } from 'react-stately';

import { IconName } from 'ui/icon';

export interface Props<T> extends AriaMenuProps<T>, MenuTriggerProps {
  label?: string;
  icon?: IconName;
}
