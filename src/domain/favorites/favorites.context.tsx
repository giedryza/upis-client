import { FC, PropsWithChildren, useEffect, useMemo, useState } from 'react';

import { contextFactory } from 'tools/common';
import { storage } from 'tools/services';

interface FavoritesContext {
  favorites: string[];
  addToFavorites: (id: string) => void;
  removeFromFavorites: (id: string) => void;
  clearFavorites: () => void;
}

const [useFavoritesContext, FavoritesContextProvider] =
  contextFactory<FavoritesContext>();

export const FavoritesProvider: FC<PropsWithChildren> = ({ children }) => {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    setFavorites(storage.getItem('favorites'));
  }, []);

  useEffect(() => {
    storage.setItem('favorites', favorites);
  }, [favorites]);

  const addToFavorites = (id: string) => setFavorites((prev) => [...prev, id]);

  const removeFromFavorites = (id: string) =>
    setFavorites((prev) => prev.filter((favorite) => favorite !== id));

  const clearFavorites = () => setFavorites([]);

  const value = useMemo(
    () => ({
      favorites,
      addToFavorites,
      setFavorites,
      removeFromFavorites,
      clearFavorites,
    }),
    [favorites]
  );

  return (
    <FavoritesContextProvider value={value}>
      {children}
    </FavoritesContextProvider>
  );
};

export { useFavoritesContext };
