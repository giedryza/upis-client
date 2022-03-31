import { notifications } from 'domain/notifications';
import { store } from 'tools/services/store';

export const handleError = (message: string) => {
  store.dispatch(notifications.actions.open({ type: 'danger', message }));
};
