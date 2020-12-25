import { endpoints } from './http.constants';

interface Config {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  headers?: Record<string, string>;
  body?: Record<string, any>;
}

export const http = async (endpoint: string, config: Config = {}) => {
  const { method = 'GET', headers = {}, body = null } = config;

  const defaults = {
    headers: {
      'Content-Type': 'application/json',
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

  const response = await fetch(`${endpoints.baseUrl}/${endpoint}`, init);

  const json = await response.json();

  if (!response.ok) return Promise.reject(json);

  return json;
};
