import { AriaMenuProps } from 'react-aria';
import { MenuTriggerProps } from 'react-stately';

export interface Props<T> extends AriaMenuProps<T>, MenuTriggerProps {
  label?: string;
  ariaLabel?: string;
}
