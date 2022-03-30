import { AppError } from 'types/common';
import { isError } from 'tools/errors';

export const isAppError = (error: unknown): error is AppError => {
  if (!isError(error)) {
    return false;
  }

  return (error as AppError).isAppError;
};
