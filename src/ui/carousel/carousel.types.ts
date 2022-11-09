interface Image {
  id: string;
  url: string;
  alt: string;
}

export interface Props {
  images: Image[];
  meta?: boolean;
  options?: {
    fit?: 'contain' | 'cover';
    behavior?: 'auto' | 'smooth';
    size?: 'sm' | 'md' | 'lg';
    keyboard?: boolean;
  };
}
