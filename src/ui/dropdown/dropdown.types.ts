import { ButtonProps } from 'ui/button';

export type MenuButton = Omit<ButtonProps, 'url' | 'attributes'>;

export interface Props {
  id: string;
  menuButton: MenuButton;
  position?: `${'top' | 'bottom'}-${'left' | 'right'}`;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}
