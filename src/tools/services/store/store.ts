import { configureStore } from '@reduxjs/toolkit';

import { lightbox } from 'domain/lightbox';
import { alerts } from 'domain/alerts';
import { serp } from 'domain/serp';

const makeStore = () =>
  configureStore({
    reducer: {
      [lightbox.name]: lightbox.reducer,
      [alerts.name]: alerts.reducer,
      [serp.name]: serp.reducer,
    },
  });

export const store = makeStore();
