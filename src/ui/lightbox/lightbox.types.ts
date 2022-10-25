import { OverlayProvider } from 'react-aria';

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

export interface LightboxComposition {
  Provider: typeof OverlayProvider;
}
