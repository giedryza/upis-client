import { Action } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import { RootState as State } from 'utils/libs/store/store.reducer';

export type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export type Actions<T> = ActionMap<T>[keyof ActionMap<T>];

export type GenericAction = Action<string>;

export type GenericThunk<T> = ThunkAction<T, State, undefined, GenericAction>;
export type Thunk = GenericThunk<void>;
export type PromiseThunk<P = {} | void> = GenericThunk<Promise<P>>;

export type Dispatch = ThunkDispatch<State, undefined, GenericAction>;

export interface ThunkResponse {
  success: boolean;
}

export type { State };
