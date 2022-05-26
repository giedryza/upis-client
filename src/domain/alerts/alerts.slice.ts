import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

import { Alert } from './alerts.types';

interface AlertsState {
  items: Alert[];
}

const initialState: AlertsState = {
  items: [],
};

export const alerts = createSlice({
  name: 'alerts',
  initialState,
  reducers: {
    open: {
      reducer: (state, { payload }: PayloadAction<Alert>) => {
        state.items.push(payload);
      },
      prepare: (item: Omit<Alert, 'id'>) => ({
        payload: { ...item, id: nanoid() },
      }),
    },
    close: (state, { payload }: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== payload);
    },
  },
});
