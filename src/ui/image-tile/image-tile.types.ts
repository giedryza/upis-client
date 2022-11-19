import { Status } from 'types/common';
import { ButtonProps } from 'ui/button';

interface Tag {
  label: string;
  status: Status;
}

export interface Props {
  image: string;
  alt: string;
  objectFit?: 'contain' | 'cover';
  actions?: ButtonProps[];
  tags?: Tag[];
}
