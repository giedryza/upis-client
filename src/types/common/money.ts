export const currencies = ['EUR'] as const;

export type Currency = typeof currencies[number];

export interface Price {
  amount: number;
  currency: Currency;
}
