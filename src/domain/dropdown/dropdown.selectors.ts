import { createSelector } from 'reselect';

import { DropdownKey } from './dropdown.types';

import { State } from 'types/common/redux';

export const isDropdownActive = (state: State, key: DropdownKey) =>
  state.dropdown.activeDropdown === key;

export const makeIsDropdownActiveSelector = () =>
  createSelector(
    (state: State, key: DropdownKey) => state.dropdown.activeDropdown === key,
    (isActive) => isActive
  );
