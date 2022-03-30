export interface AppErrorData {
  message: string;
  field?: string;
}

export interface AppError extends Error {
  data: AppErrorData[];
  isAppError: true;
}
