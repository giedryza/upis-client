import { configureStore } from '@reduxjs/toolkit';

import { confirm } from 'domain/confirm';
import { modal } from 'domain/modal';
import { alerts } from 'domain/alerts';

export const makeStore = () =>
  configureStore({
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [
            confirm.actions.setProceed.type,
            confirm.actions.setCancel.type,
          ],
          ignoredPaths: [`${confirm.name}.proceed`, `${confirm.name}.cancel`],
        },
      }),
    reducer: {
      [confirm.name]: confirm.reducer,
      [modal.name]: modal.reducer,
      [alerts.name]: alerts.reducer,
    },
  });

export const store = makeStore();
