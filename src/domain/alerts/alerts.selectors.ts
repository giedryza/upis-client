import { AppState } from 'tools/services/store';

export const selectAlerts = (state: AppState) => state.alerts.items;
