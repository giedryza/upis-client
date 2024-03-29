import { ImageSizes } from 'ui/image';

interface Image {
  id: string;
  url: string;
  alt: string;
  placeholder?: string;
}

export interface Props {
  images: Image[];
  sizes: ImageSizes;
  meta?: boolean;
  options?: {
    fit?: 'contain' | 'cover';
    behavior?: 'auto' | 'smooth';
    size?: 'sm' | 'md' | 'lg';
    keyboard?: boolean;
    focusable?: boolean;
  };
}
