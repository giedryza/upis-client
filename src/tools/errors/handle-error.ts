import { notifications } from 'domain/notifications';
import { store } from 'tools/libs/store';

export const handleError = (message: string) => {
  store.dispatch(notifications.actions.open({ type: 'danger', message }));
};
