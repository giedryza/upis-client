import { z } from 'zod';

import { isServer } from 'tools/common';

import { items } from './storage.schemas';

const parseJson = (key: string): unknown => {
  if (isServer()) return null;

  const item = localStorage.getItem(key);

  if (!item) return null;

  try {
    return JSON.parse(item);
  } catch (error) {
    return null;
  }
};

export const getItem = <Key extends keyof typeof items>(
  key: Key
): z.infer<(typeof items)[Key]> => {
  return items[key].parse(parseJson(key));
};

export const setItem = <Key extends keyof typeof items, Item extends any>(
  key: Key,
  item: Item
) => {
  return localStorage.setItem(key, JSON.stringify(item));
};

export const removeItem = <Key extends keyof typeof items>(key: Key) => {
  return localStorage.removeItem(key);
};
