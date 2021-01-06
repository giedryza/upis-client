import { IncomingMessage } from 'http';

import { uri } from './http.constants';

import { ApiError } from 'utils/libs/errors/api.error';
import { isServer } from 'utils/common/is-server';

export interface HttpResponse<D> {
  data: D;
}

type Method = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';

interface Config {
  headers?: Record<string, string>;
  body?: Record<string, any>;
  req?: IncomingMessage;
}

export class Http<T = any> {
  #method: Method = 'GET';

  #baseUrl: string = uri.baseUrl;

  constructor(private endpoint: string, private config: Config = {}) {}

  private get url(): string {
    return `${this.#baseUrl}/${this.endpoint}`;
  }

  private get defaultHeaders(): Record<string, string> {
    const { headers = {} } = this.config;
    const { 'Content-Type': contentType = 'application/json' } = headers;

    return {
      ...(['POST', 'PATCH', 'PUT'].includes(this.#method)
        ? { 'Content-Type': contentType }
        : {}),
    };
  }

  private get serverHeaders(): Record<string, string> {
    const { req } = this.config;

    const headers = req && isServer() ? req.headers : {};

    return headers as Record<string, string>;
  }

  private get init(): RequestInit {
    const { headers = {}, body } = this.config;

    return {
      method: this.#method,
      headers: new Headers({
        ...this.defaultHeaders,
        ...this.serverHeaders,
        ...headers,
      }),
      body: body ? JSON.stringify(body) : body,
      credentials: 'include',
    };
  }

  #request = async (): Promise<HttpResponse<T>> => {
    const response = await fetch(this.url, this.init);

    const json = await response.json();

    if (!response.ok) {
      const { statusText, status } = response;
      const { data } = json;

      throw new ApiError(statusText, status, data);
    }

    return json;
  };

  get = () => {
    this.#method = 'GET';

    return this.#request();
  };

  post = () => {
    this.#method = 'POST';

    return this.#request();
  };

  patch = () => {
    this.#method = 'PATCH';

    return this.#request();
  };

  put = () => {
    this.#method = 'PUT';

    return this.#request();
  };

  delete = () => {
    this.#method = 'DELETE';

    return this.#request();
  };
}
