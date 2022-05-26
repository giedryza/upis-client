import { alerts } from 'domain/alerts';
import { store } from 'tools/services/store';

export const handleError = (message: string) => {
  store.dispatch(alerts.actions.open({ type: 'danger', message }));
};
