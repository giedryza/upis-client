import { configureStore } from '@reduxjs/toolkit';

import { confirm } from 'domain/confirm';
import { modal } from 'domain/modal';
import { lightbox } from 'domain/lightbox';
import { alerts } from 'domain/alerts';

const makeStore = () =>
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
      [lightbox.name]: lightbox.reducer,
      [alerts.name]: alerts.reducer,
    },
  });

export const store = makeStore();
