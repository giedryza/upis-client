import { createContext, useContext } from 'react';

export const makeContext = <ContextType>() => {
  const context = createContext<ContextType | undefined>(undefined);

  const useCreatedContext = () => {
    const c = useContext(context);
    if (!c) throw new Error('Context is not within scope');
    return c;
  };

  return [useCreatedContext, context.Provider] as const;
};
