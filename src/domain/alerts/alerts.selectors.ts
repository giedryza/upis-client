import { AppState } from 'tools/services';

export const selectAlerts = (state: AppState) => state.alerts.items;
