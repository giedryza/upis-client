import { AppErrorData, AppRequest } from 'types/common';

export type Method = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';

export interface Config {
  headers?: Record<string, string>;
  body?: BodyInit;
  params?: Record<string, any>;
  req?: AppRequest;
  credentials?: RequestCredentials;
  locale?: string;
}

export interface ApiResponse<D = any, M = any> {
  data: D;
  meta?: M;
}

export type ApiVersion = `v${1}`;

export class ApiError extends Error {
  constructor(
    public message: string,
    public status: number,
    public data: AppErrorData[],
    public isAppError: boolean
  ) {
    super(message);

    Object.setPrototypeOf(this, ApiError.prototype);
  }
}
