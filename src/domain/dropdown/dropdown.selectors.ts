import { createSelector } from 'reselect';

import { State } from 'types/common/redux';

import { DropdownKey } from './dropdown.types';

export const isDropdownActive = (state: State, key: DropdownKey) =>
  state.dropdown.activeDropdown === key;

export const makeIsDropdownActiveSelector = () =>
  createSelector(
    (state: State, key: DropdownKey) => state.dropdown.activeDropdown === key,
    (isActive) => isActive
  );
