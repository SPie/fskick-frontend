import axios, {AxiosInstance} from 'axios';

const client: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_ENDPOINT,
  headers: {
    'Content-type': 'application/json',
  },
});

export interface Response<T = any> {
  data: T;
}

export const get = (path: string): Promise<any> => {
  return client.get(path).then(response => response.data);
}