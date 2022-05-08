import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

import { Notification } from './notifications.types';

interface NotificationsState {
  items: Notification[];
}

const initialState: NotificationsState = {
  items: [],
};

export const notifications = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    open: {
      reducer: (state, { payload }: PayloadAction<Notification>) => {
        state.items.push(payload);
      },
      prepare: (item: Omit<Notification, 'id'>) => ({
        payload: { ...item, id: nanoid() },
      }),
    },
    close: (state, { payload }: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== payload);
    },
  },
});
