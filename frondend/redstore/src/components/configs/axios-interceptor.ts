import axios, { AxiosRequestConfig } from 'axios';
import { KEY_STORE } from '../shared/constants/auth.constant';
import { TIMEOUT } from '../shared/constants/axios.constant';

const setupAxiosInterceptors = (onUnauthenticated: any, increaseFetch: any, decreaseFetch: any, axiosCustom: any) => {
  const onRequestSuccess = (config: (any | AxiosRequestConfig)) => {
    if (!config.ignoreSpinner) {
      increaseFetch()
    }
    const token = localStorage.getItem(KEY_STORE.ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  };

  const onResponseSuccess = (response: any) => {
    const { config } = response;
    if (!(config && config.ignoreSpinner)) {
      decreaseFetch()
    }
    return response
  }

  const onResponseError = (err: any) => {
    const { config } = err;
    if (!(config && config.ignoreSpinner)) {
      decreaseFetch()
    }
    const status = err.status || (err.response ? err.response.status : 0);
    if (status === 403 || status === 401) {
      onUnauthenticated();
    }
    return Promise.reject(err);
  };
  axiosCustom.interceptors.request.use(onRequestSuccess);
  axiosCustom.interceptors.response.use(onResponseSuccess, onResponseError);
};

export default setupAxiosInterceptors;
