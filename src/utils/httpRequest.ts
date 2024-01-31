import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { API_ROOT } from './constants';

class HttpRequest {
  private httpRequest: axios.AxiosInstance;

  constructor() {
    this.httpRequest = axios.create({
      baseURL: API_ROOT,
    });

    this.httpRequest.interceptors.request.use((config: AxiosRequestConfig) => {
      // const accessToken = store?.getState()?.auth?.login?.currentUser?.accessToken;
      // if (accessToken && !config.headers) {
      //   config.headers['Authorization'] = `Bearer ${accessToken}`;
      // }
      return config;
    });

    this.httpRequest.interceptors.response.use(
      (response: AxiosResponse) => response,
      async (error: any) => {
        const originalRequest = error.config;
        if (error.response.status === 401) {
          axios.interceptors.response.eject(this.httpRequest);
          try {
            const response = await axios.post(`${API_ROOT}/api/auth/refresh`, null, {
              withCredentials: true,
            });
            const responseData = response.data;
            const refreshUser = {
              // ...user,
              accessToken: responseData.accessToken,
            };

            this.httpRequest.defaults.headers.common['Authorization'] = responseData.accessToken;
            originalRequest.headers['Authorization'] = responseData.accessToken;

            return this.httpRequest(originalRequest);
          } catch (error) {
            if (error) {
              // dispatch(logoutSuccess());
              // history.push('/');
            }
          }
        }
        return Promise.reject(error);
      }
    );
  }

  async get<T>(path: string, options?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.httpRequest.get<T>(path, {
        ...options,
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async post<T>(path: string, options?: any): Promise<T> {
    try {
      const response = await this.httpRequest.post<T>(path, options, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw error?.response?.data;
    }
  }

  async update<T>(path: string, options?: any): Promise<T> {
    try {
      const response = await this.httpRequest.put<T>(path, options, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async patch<T>(path: string, options?: any): Promise<T> {
    try {
      const response = await this.httpRequest.patch<T>(path, options, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async delete<T>(path: string, options?: any): Promise<T> {
    try {
      const response = await this.httpRequest.delete<T>(path, options, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export const axiosJWT = new HttpRequest();
