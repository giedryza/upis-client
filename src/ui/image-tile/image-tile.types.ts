import { Status } from 'types/common';
import { ButtonProps } from 'ui/button';
import { ImageSizes } from 'ui/image';

interface Tag {
  label: string;
  status: Status;
}

export interface Props {
  image: string;
  alt: string;
  sizes: ImageSizes;
  objectFit?: 'contain' | 'cover';
  actions?: ButtonProps[];
  tags?: Tag[];
}
