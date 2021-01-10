import { createSelector } from 'reselect';

import { DropdownKey } from './dropdown.types';

import { State } from 'utils/libs/store/store.types';

export const isDropdownActive = (state: State, key: DropdownKey) =>
  state.dropdown.activeDropdown === key;

export const makeIsDropdownActiveSelector = () =>
  createSelector(
    (state: State, key: DropdownKey) => state.dropdown.activeDropdown === key,
    (isActive) => isActive
  );
