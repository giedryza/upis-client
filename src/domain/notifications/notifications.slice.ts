import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

import { Status } from 'types/common';

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
    open: (
      state,
      { payload }: PayloadAction<{ type: Status; message: string }>
    ) => {
      state.items.push({ ...payload, id: nanoid() });
    },
    close: (state, { payload }: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== payload);
    },
  },
});
