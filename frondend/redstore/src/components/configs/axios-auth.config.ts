import axios from 'axios';
import { TIMEOUT } from '../../shared/constants/axios.constant';
import { paramsSerializer } from '../../shared/utils/axios.util';

const HTTP_AUTH = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: TIMEOUT,
  paramsSerializer: paramsSerializer,
});

export default HTTP_AUTH;