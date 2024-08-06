import { env } from '@/config/environment';
import { NOT_FOUND_STATUS } from './constants';

type CustomOptions = Omit<RequestInit, 'method'> & {
  baseUrl?: string | undefined;
  access_token?: string | undefined;
};

export type EntityErrorPayload = {
  status: 422;
  message: string;
};

export class HttpError extends Error {
  status: number;
  message: string;

  constructor({ status, message }: { status: number; message: any }) {
    super('Http Error');
    this.status = status;
    this.message = message;
  }
}

export class EntityError extends HttpError {
  status;
  message;
  constructor({ status, message }: EntityErrorPayload) {
    super({ status, message });
    this.status = status;
    this.message = message;
  }
  toJSON() {
    return {
      status: this.status,
      message: this.message,
    };
  }
}

let clientLogoutRequest: null | Promise<any> = null;
export const isClient = () => typeof window !== 'undefined';
const request = async <Response>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  url: string,
  options?: CustomOptions | undefined
) => {
  let body: FormData | string | undefined = undefined;
  if (options?.body instanceof FormData) {
    body = options.body;
  } else if (options?.body) {
    body = JSON.stringify(options.body);
  }
  const baseHeaders: {
    [key: string]: string;
  } =
    body instanceof FormData
      ? {}
      : {
          'Content-Type': 'application/json',
        };

  if (isClient()) {
    const access_token = options?.access_token;
    if (access_token) {
      baseHeaders.Authorization = `Bearer ${access_token}`;
    }
  }
  const baseUrl =
    options?.baseUrl === undefined ? env.API_ENDPOINT : options.baseUrl;

  const fullUrl = url.startsWith('/')
    ? `${baseUrl}${url}`
    : `${baseUrl}/${url}`;

  const res = await fetch(fullUrl, {
    ...options,
    headers: {
      ...baseHeaders,
      ...options?.headers,
    } as any,
    body,
    method,
  });
  const payload: Response = await res.json();

  if (!res.ok) {
    const { status, message } = payload as EntityErrorPayload;
    // if (res.status === NOT_FOUND_STATUS) {
    //   throw new EntityError({
    //     status,
    //     message,
    //   } as EntityErrorPayload).toJSON();
    // }
    throw new EntityError({
      status,
      message,
    } as EntityErrorPayload).toJSON();
  }
  return payload;
};

const http = {
  get<Response>(
    url: string,
    options?: Omit<CustomOptions, 'body'> | undefined
  ) {
    return request<Response>('GET', url, options);
  },
  post<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, 'body'> | undefined
  ) {
    return request<Response>('POST', url, { ...options, body });
  },
  put<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, 'body'> | undefined
  ) {
    return request<Response>('PUT', url, { ...options, body });
  },
  delete<Response>(
    url: string,
    options?: Omit<CustomOptions, 'body'> | undefined
  ) {
    return request<Response>('DELETE', url, { ...options });
  },
};

export default http;
