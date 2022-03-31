import { configureStore } from '@reduxjs/toolkit';

import { notifications } from 'domain/notifications';

export const makeStore = () =>
  configureStore({
    reducer: {
      [notifications.name]: notifications.reducer,
    },
  });

export const store = makeStore();
