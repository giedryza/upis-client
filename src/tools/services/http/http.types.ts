import { IncomingMessage } from 'http';

import { AppErrorData } from 'types/common';

export type Method = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';

export interface Config {
  headers?: Record<string, string>;
  body?: BodyInit;
  params?: Record<string, any>;
  req?: IncomingMessage;
  credentials?: RequestCredentials;
}

export interface Response<D> {
  data: D;
}

export interface ResponseWithMeta<D, M> extends Response<D> {
  meta: M;
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
