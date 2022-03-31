import { getErrors, handleError } from 'tools/errors';

export const handleErrors = (error: unknown) => {
  const errors = getErrors(error);

  errors.forEach(({ message }) => handleError(message));
};
