import { Status } from 'types/common';
import { ButtonProps } from 'ui/button';

export interface Props {
  image: string;
  alt: string;
  actions?: ButtonProps[];
  label?: string;
  status?: Status;
}
