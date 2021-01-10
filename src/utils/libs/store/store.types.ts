export type { RootState as State } from './store.reducer';

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
