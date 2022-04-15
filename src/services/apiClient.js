import axios from 'axios';
import ENV from 'react-native-config';
import { v4 as uuid } from 'uuid';
import strings from '_localization';
import W3CContextService from '_services/W3CContextService';
import AccountService from './AccountService';
import AuthenticationService from './AuthenticationService';
import CustomerService from './CustomerService';
import TrackEventService from './RegisterServices/TrackEventService';
import FundDirectDepositPageService from './RenderData/FundDirectDepositPageService';
import TransferService from './TransferService';

const httpClient = axios.create({
  baseURL: ENV.EXPERIENCE_LAYER_BASE_URL,
  timeout: 10000,
});

const setAuthorization = (authorization, userId) => {
  httpClient.defaults.headers.common.authorization = `Bearer ${authorization}`;
  httpClient.defaults.headers.common.userId = userId;
};

const clearAuthorization = () => {
  delete httpClient.defaults.headers.common.authorization;
  delete httpClient.defaults.headers.common.userId;
};

httpClient.interceptors.request.use((config) => {
  config.headers['idempotency-key'] = config?.headers?.['idempotency-key'] ?? uuid();
  config.headers.traceparent = W3CContextService.traceParent;
  config.headers.tracestate = W3CContextService.traceState;
  return config;
});

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      return Promise.reject(error.response.data);
    }

    if (error.request) {
      return Promise.reject(strings.connectionError);
    }

    return Promise.reject(error);
  }
);

export default {
  setAuthorization,
  clearAuthorization,
  ...httpClient,
  ...AuthenticationService(httpClient),
  ...AccountService(httpClient),
  ...CustomerService(httpClient),
  ...TransferService(httpClient),
  ...FundDirectDepositPageService(httpClient),
  ...TrackEventService(httpClient),
};
