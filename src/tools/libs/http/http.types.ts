import { IncomingMessage } from 'http';

export type Method = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';

export interface Config {
  headers?: Record<string, string>;
  body?: Record<string, any>;
  req?: IncomingMessage;
}

export interface Response<D> {
  data: D;
}

export interface ResponseWithMeta<D, M> extends Response<D> {
  meta: M;
}
