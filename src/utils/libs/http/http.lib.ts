import { IncomingMessage } from 'http';

import { uri } from './http.constants';

import { isServer } from 'utils/common/is-server';

interface Config {
  method?: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: Record<string, any>;
  req?: IncomingMessage;
}

const getServerHeaders = (req?: IncomingMessage) => {
  const headers = req && isServer() ? req.headers : {};

  return headers as Record<string, string>;
};

export const http = async (endpoint: string, config: Config = {}) => {
  const { method = 'GET', headers = {}, body = null, req } = config;
  const { 'Content-Type': contentType = 'application/json' } = headers;

  const serverHeaders = getServerHeaders(req);

  const defaultHeaders = {
    ...(['POST', 'PATCH', 'PUT'].includes(method)
      ? { 'Content-Type': contentType }
      : {}),
  };

  const init: RequestInit = {
    method,
    headers: new Headers({
      ...defaultHeaders,
      ...serverHeaders,
      ...headers,
    }),
    body: body ? JSON.stringify(body) : undefined,
    credentials: 'include',
  };

  const response = await fetch(`${uri.baseUrl}/${endpoint}`, init);

  const json = await response.json();

  if (!response.ok) return Promise.reject(json);

  return json;
};
