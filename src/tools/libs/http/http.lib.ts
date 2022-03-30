import { getSession } from 'next-auth/react';
import { stringifyUrl } from 'query-string';

import { isServer } from 'tools/common';

import { ApiVersion, Config, Method, ApiError } from './http.types';

export class Http<T = any> {
  #method: Method = 'GET';

  #version: ApiVersion = 'v1';

  #baseUrl: string = `${process.env.NEXT_PUBLIC_HOST_API}/api/${this.#version}`;

  constructor(private endpoint: string, private config: Config = {}) {}

  private get url(): string {
    const { params } = this.config;

    return stringifyUrl({
      url: `${this.#baseUrl}/${this.endpoint}`,
      query: params,
    });
  }

  private get defaultHeaders(): Record<string, string> {
    const { body } = this.config;

    const isJson =
      typeof body === 'string' &&
      ['POST', 'PATCH', 'PUT'].includes(this.#method);

    return {
      ...(isJson && { 'Content-Type': 'application/json' }),
    };
  }

  private get serverHeaders(): Record<string, string> {
    const { req } = this.config;

    const headers = req && isServer() ? req.headers : {};

    return headers as Record<string, string>;
  }

  #init = async (): Promise<RequestInit> => {
    const { headers = {}, body, req } = this.config;

    const session = await getSession({ req });

    return {
      method: this.#method,
      headers: new Headers({
        ...this.defaultHeaders,
        ...this.serverHeaders,
        ...headers,
        ...(!!session?.jwt && { Authorization: `Bearer ${session.jwt}` }),
      }),
      body,
      credentials: 'include',
    };
  };

  #request = async (): Promise<T> => {
    const init = await this.#init();

    const response = await fetch(this.url, init);

    if (response.status === 204) {
      return {} as T;
    }

    const json = await response.json();

    if (!response.ok) {
      const { statusText, status } = response;
      const { data, isAppError } = json;

      throw new ApiError(statusText, status, data, isAppError);
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
