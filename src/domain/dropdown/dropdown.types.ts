import { Dispatch } from 'react';

import { Action, Reducer } from 'utils/context/types';

export enum DropdownKey {
  Test = 'test',
  LanguageSelect = 'language-select',
  AccountMenu = 'account-menu',
}

export interface DropdownState {
  activeDropdown: DropdownKey | null;
}

export enum DropdownActionTypes {
  SetActiveDropdown,
}

export type DropdownPayloads = {
  [DropdownActionTypes.SetActiveDropdown]: DropdownKey | null;
};

export type DropdownActions = Action<DropdownPayloads>;

export type DropdownReducer = Reducer<DropdownState, DropdownPayloads>;

export type DropdownDispatch = Dispatch<Action<DropdownPayloads>>;
