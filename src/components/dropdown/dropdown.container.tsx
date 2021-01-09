import { FC } from 'react';

import { Props as ButtonProps } from 'ui/button/button.component';
import { DropdownKey } from 'domain/dropdown/dropdown.types';
import { useDropdownContext } from 'domain/dropdown/dropdown.context';
import { dropdownActions } from 'domain/dropdown/dropdown.actions';
import { isDropdownActive } from 'domain/dropdown/dropdown.selectors';
import { Dropdown as DropdownComponent } from 'ui/dropdown/dropdown.component';

type MenuButton = Pick<
  ButtonProps,
  | 'label'
  | 'title'
  | 'icon'
  | 'iconPlacement'
  | 'styleType'
  | 'size'
  | 'block'
  | 'ariaLabel'
>;

interface Props {
  id: DropdownKey;
  menuButton: MenuButton;
  position?: `${'top' | 'bottom'}-${'left' | 'right'}`;
}

const Dropdown: FC<Props> = ({ id, menuButton, position, children }) => {
  const { dropdownState, dropdownDispatch } = useDropdownContext();

  const isOpen = isDropdownActive(dropdownState, id);

  const onOpen = () => {
    dropdownDispatch(dropdownActions.setActiveDropdown(id));
  };

  const onClose = () => {
    dropdownDispatch(dropdownActions.setActiveDropdown(null));
  };

  return (
    <DropdownComponent
      id={id}
      menuButton={menuButton}
      position={position}
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
    >
      {children}
    </DropdownComponent>
  );
};

export { Dropdown };
