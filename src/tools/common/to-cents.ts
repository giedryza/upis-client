import { toInteger } from 'tools/common';

export const toCents = (money: number): number => toInteger(money * 100);
