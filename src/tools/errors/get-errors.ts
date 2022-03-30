import { isAppError, isError } from 'tools/errors';
import { AppErrorData } from 'types/common';

export const getErrors = (error: unknown): AppErrorData[] => {
  if (isAppError(error)) {
    return error.data;
  }

  if (isError(error)) {
    return [{ message: error.message }];
  }

  return [{ message: 'Something went wrong.' }];
};
