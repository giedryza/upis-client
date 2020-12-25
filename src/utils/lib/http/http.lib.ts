import { uri } from './http.constants';

interface Config {
  method?: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: Record<string, any>;
}

export const http = async (endpoint: string, config: Config = {}) => {
  const { method = 'GET', headers = {}, body = null } = config;
  const { 'Content-Type': contentType = 'application/json' } = headers;

  const defaults = {
    headers: {
      ...(['POST', 'PATCH', 'PUT'].includes(method)
        ? { 'Content-Type': contentType }
        : {}),
    },
  };

  const init: RequestInit = {
    method,
    headers: new Headers({
      ...defaults.headers,
      ...headers,
    }),
    body: body ? JSON.stringify(body) : undefined,
  };

  const response = await fetch(`${uri.baseUrl}/${endpoint}`, init);

  const json = await response.json();

  if (!response.ok) return Promise.reject(json);

  return json;
};
