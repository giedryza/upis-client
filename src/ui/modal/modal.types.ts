import { OverlayProvider } from 'react-aria';

import { ModalContent } from './atoms';

export interface Props {
  id: string;
  isOpen: boolean;
  onClose: () => void;
}

export interface ModalComposition {
  Provider: typeof OverlayProvider;
  Content: typeof ModalContent;
}
