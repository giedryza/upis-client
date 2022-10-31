interface Image {
  id: string;
  url: string;
  alt: string;
}

export interface Props {
  id: string;
  isOpen: boolean;
  onClose: () => void;
  images: Image[];
  currentImageId?: string;
}
