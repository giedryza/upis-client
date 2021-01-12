import { Reducer } from 'redux';

import { Actions } from 'types/common/redux';

export enum DropdownKey {
  Test = 'test',
  LanguageSelect = 'language-select',
  AccountMenu = 'account-menu',
}

export interface DropdownState {
  activeDropdown: DropdownKey | null;
}

export enum DropdownActionTypes {
  SetActiveDropdown = 'dropdown/SET_ACTIVE_DROPDOWN',
}

export type DropdownPayloads = {
  [DropdownActionTypes.SetActiveDropdown]: DropdownKey | null;
};

export type DropdownActions = Actions<DropdownPayloads>;

export type DropdownReducer = Reducer<DropdownState, DropdownActions>;
