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

export type Action<T> = ActionMap<T>[keyof ActionMap<T>];

export type Reducer<State, PayloadByType> = (
  state: State,
  actions: Action<PayloadByType>
) => State;
