export const keyFactory = (key: string) => {
  const root = [key] as const;
  const lists = [...root, 'list'] as const;
  const details = [...root, 'detail'] as const;

  return {
    root,
    lists,
    list: (...deps: any[]) => [...lists, ...deps] as const,
    details,
    detail: (id: string, ...deps: any[]) => [...details, id, ...deps] as const,
  } as const;
};
