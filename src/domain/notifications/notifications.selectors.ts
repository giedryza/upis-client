import { AppState } from 'tools/libs/store';

export const selectNotifications = (state: AppState) =>
  state.notifications.items;
