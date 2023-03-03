import axios from 'axios';
import { TIMEOUT } from '../shared/constants/axios.constant';
import { paramsSerializer } from '../shared/utils/axios.util';

const HTTP_MGMT = axios.create({
  baseURL: process.env.REACT_APP_MGMT_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: TIMEOUT,
  paramsSerializer: paramsSerializer,
});

export default HTTP_MGMT;