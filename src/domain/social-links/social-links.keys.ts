export const socialLinksKeys = {
  all: ['social-links'] as const,
  lists: () => [...socialLinksKeys.all, 'list'] as const,
  list: (...args: any[]) => [...socialLinksKeys.lists(), ...args] as const,
  details: () => [...socialLinksKeys.all, 'detail'] as const,
  detail: (id: string) => [...socialLinksKeys.details(), id] as const,
};
