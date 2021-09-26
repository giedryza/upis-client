import { ButtonProps } from 'ui/button/button.component';

export type MenuButton = Pick<
  ButtonProps,
  | 'label'
  | 'title'
  | 'icon'
  | 'iconPlacement'
  | 'styleType'
  | 'size'
  | 'block'
  | 'withDropdown'
  | 'ariaLabel'
>;

export interface Props {
  id: string;
  menuButton: MenuButton;
  position?: `${'top' | 'bottom'}-${'left' | 'right'}`;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}
