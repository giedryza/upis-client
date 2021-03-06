import { Config, Method } from './http.types';

import { endpoints } from 'uri/endpoints';
import { ApiError } from 'utils/libs/errors/api.error';
import { isServer } from 'utils/common/is-server';

export class Http<T = any> {
  #method: Method = 'GET';

  #baseUrl: string = endpoints.baseUrl;

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

  #request = async (): Promise<T> => {
    const response = await fetch(this.url, this.init);

    if (response.status === 204) {
      return {} as T;
    }

    const json = await response.json();

    if (!response.ok) {
      const { statusText, status } = response;
      const { data } = json;

      throw new ApiError(statusText, status, data);
    }

    return json as T;
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
