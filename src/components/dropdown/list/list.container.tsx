import { FC, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { DropdownKey } from 'domain/dropdown/dropdown.types';
import { dropdownActions } from 'domain/dropdown/dropdown.actions';
import { makeIsDropdownActiveSelector } from 'domain/dropdown/dropdown.selectors';
import {
  List as ListComponent,
  MenuItem,
} from 'ui/dropdown/list/list.component';
import { State } from 'utils/libs/store/store.types';

interface Props {
  id: DropdownKey;
  items: MenuItem[];
}

const List: FC<Props> = ({ id, items }) => {
  const dispatch = useDispatch();

  const isDropdownActiveSelector = useMemo(makeIsDropdownActiveSelector, []);

  const isOpen = useSelector((state: State) =>
    isDropdownActiveSelector(state, id)
  );

  const handleClose = () => {
    if (isOpen) {
      dispatch(dropdownActions.setActiveDropdown(null));
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
