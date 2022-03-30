import { notifications } from 'domain/notifications';
import { getErrors } from 'tools/errors';
import { store } from 'tools/libs/store';

export const handleError = (error: unknown) => {
  const errors = getErrors(error);

  errors.forEach(({ message }) => {
    store.dispatch(notifications.actions.open({ type: 'danger', message }));
  });
};
