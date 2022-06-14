export const toursKeys = {
  all: ['tours'] as const,
  lists: () => [...toursKeys.all, 'list'] as const,
  list: (...args: any[]) => [...toursKeys.lists(), ...args] as const,
  details: () => [...toursKeys.all, 'detail'] as const,
  detail: (id: string) => [...toursKeys.details(), id] as const,
};
