import { FC } from 'react';

import { DropdownKey } from 'domain/dropdown/dropdown.types';
import { isDropdownActive } from 'domain/dropdown/dropdown.selectors';
import { useDropdownContext } from 'domain/dropdown/dropdown.context';
import { dropdownActions } from 'domain/dropdown/dropdown.actions';
import {
  List as ListComponent,
  MenuItem,
} from 'ui/dropdown/list/list.component';

interface Props {
  id: DropdownKey;
  items: MenuItem[];
}

const List: FC<Props> = ({ id, items }) => {
  const { dropdownState, dropdownDispatch } = useDropdownContext();

  const handleClose = () => {
    if (isDropdownActive(dropdownState, id)) {
      dropdownDispatch(dropdownActions.setActiveDropdown(null));
    }
  };

  const handleItemClick = (onItemClick: MenuItem['onClick']) => {
    handleClose();

    if (onItemClick) {
      onItemClick();
    }
  };

  const parsedItems = items.map(({ onClick, ...rest }) => ({
    onClick: () => handleItemClick(onClick),
    ...rest,
  }));

  return <ListComponent id={id} items={parsedItems} />;
};

export { List };
