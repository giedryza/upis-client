import { FC, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { DropdownKey } from 'domain/dropdown/dropdown.types';
import { makeIsDropdownActiveSelector } from 'domain/dropdown/dropdown.selectors';
import {
  Dropdown as DropdownComponent,
  MenuButton,
} from 'ui/dropdown/dropdown.component';
import { State } from 'types/common/redux';
import { actions } from 'domain/actions';

interface Props {
  id: DropdownKey;
  menuButton: MenuButton;
  position?: `${'top' | 'bottom'}-${'left' | 'right'}`;
}

const Dropdown: FC<Props> = ({ id, menuButton, position, children }) => {
  const dispatch = useDispatch();

  const isDropdownActiveSelector = useMemo(makeIsDropdownActiveSelector, []);
  const isOpen = useSelector((state: State) =>
    isDropdownActiveSelector(state, id)
  );

  const onOpen = () => {
    dispatch(actions.dropdown.setActiveDropdown(id));
  };

  const onClose = () => {
    dispatch(actions.dropdown.setActiveDropdown(null));
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
