import { FC, useMemo } from 'react';

import { Props as ButtonProps } from 'ui/button/button.component';
import { DropdownKey } from 'state/dropdown/dropdown.types';
import { useDropdownContext } from 'state/dropdown/dropdown.context';
import { isDropdownActive } from 'state/dropdown/dropdown.selectors';
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
  const { dropdownState, dropdownActions } = useDropdownContext();

  const isOpen = useMemo(() => isDropdownActive(dropdownState, id), [
    dropdownState,
    id,
  ]);

  const onOpen = () => {
    dropdownActions.setActiveDropdown(id);
  };

  const onClose = () => {
    dropdownActions.setActiveDropdown(null);
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
