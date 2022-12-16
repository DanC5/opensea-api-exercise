import axios, { AxiosRequestConfig, Method } from 'axios';

type ApiRequest = {
  url: string;
  data?: Object;
  headers?: AxiosRequestConfig['headers'];
  method?: Method;
  params?: Object;
};

const dataMethods = ['PUT', 'POST', 'DELETE', 'PATCH'];

export const apiRequest = async <T extends Object = Object>({
  data = {},
  headers,
  method = 'GET',
  params = {},
  url,
}: ApiRequest) => {
  const isDataMethod = dataMethods.includes(method);

  const response = await axios<T>({
    data: isDataMethod ? data : null,
    headers,
    method,
    params: isDataMethod ? null : params,
    url,
  });

  return response;
};
