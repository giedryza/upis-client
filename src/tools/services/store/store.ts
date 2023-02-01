import { configureStore } from '@reduxjs/toolkit';

import { lightbox } from 'domain/lightbox';
import { alerts } from 'domain/alerts';

const makeStore = () =>
  configureStore({
    reducer: {
      [lightbox.name]: lightbox.reducer,
      [alerts.name]: alerts.reducer,
    },
  });

export const store = makeStore();
