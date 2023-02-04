import { alerts } from 'domain/alerts';
import { store } from 'tools/services';

export const handleError = (message: string) => {
  store.dispatch(alerts.actions.open({ type: 'danger', message }));
};
