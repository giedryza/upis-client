import { VFC, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Props } from './list.types';

import { makeIsDropdownActiveSelector } from 'domain/dropdown/dropdown.selectors';
import {
  List as ListComponent,
  MenuItem,
} from 'ui/dropdown/list/list.component';
import { State } from 'types/common/redux';
import { actions } from 'domain/actions';

export const List: VFC<Props> = ({ id, items }) => {
  const dispatch = useDispatch();

  const isDropdownActiveSelector = useMemo(makeIsDropdownActiveSelector, []);

  const isOpen = useSelector((state: State) =>
    isDropdownActiveSelector(state, id)
  );

  const handleClose = () => {
    if (isOpen) {
      dispatch(actions.dropdown.setActiveDropdown(null));
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
