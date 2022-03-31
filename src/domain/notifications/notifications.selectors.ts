import { AppState } from 'tools/services/store';

export const selectNotifications = (state: AppState) =>
  state.notifications.items;
