import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Props as ButtonProps } from 'ui/button/button.component';
import { DropdownKey } from 'domain/dropdown/dropdown.types';
import { dropdownActions } from 'domain/dropdown/dropdown.actions';
import { isDropdownActive } from 'domain/dropdown/dropdown.selectors';
import { Dropdown as DropdownComponent } from 'ui/dropdown/dropdown.component';
import { State } from 'utils/libs/store/store.types';

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
  const dispatch = useDispatch();

  const isOpen = useSelector((state: State) => isDropdownActive(state, id));

  const onOpen = () => {
    dispatch(dropdownActions.setActiveDropdown(id));
  };

  const onClose = () => {
    dispatch(dropdownActions.setActiveDropdown(null));
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
