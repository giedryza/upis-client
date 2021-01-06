import { createContext, useContext } from 'react';

export const contextFactory = <ContextType>() => {
  const context = createContext<ContextType | undefined>(undefined);

  const useCreatedContext = () => {
    const ctx = useContext(context);
    if (!ctx) throw new Error('Context is not within scope');
    return ctx;
  };

  return [useCreatedContext, context.Provider] as const;
};
