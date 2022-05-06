import { configureStore } from '@reduxjs/toolkit';

import { notifications } from 'domain/notifications';
import { modal } from 'domain/modal';

export const makeStore = () =>
  configureStore({
    reducer: {
      [modal.name]: modal.reducer,
      [notifications.name]: notifications.reducer,
    },
  });

export const store = makeStore();
