import { configureStore } from '@reduxjs/toolkit';

import { confirm } from 'domain/confirm';
import { modal } from 'domain/modal';
import { notifications } from 'domain/notifications';

export const makeStore = () =>
  configureStore({
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ['confirm/setProceed', 'confirm/setCancel'],
          ignoredPaths: ['confirm.proceed', 'confirm.cancel'],
        },
      }),
    reducer: {
      [confirm.name]: confirm.reducer,
      [modal.name]: modal.reducer,
      [notifications.name]: notifications.reducer,
    },
  });

export const store = makeStore();
