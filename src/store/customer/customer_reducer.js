import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';

const { Types, Creators } = createActions(
  {
    setExternalId: ['externalId'],
    updateCustomerData: ['newData'],
    fetchCustomer: ['customerExternalId'],
    setFetchCustomerSuccess: ['data'],
    setFetchCustomerError: ['fetchCustomerError'],
    updateAddress: ['customerExternalId', 'address'],
    updateEmail: ['customerExternalId', 'email'],
    setUpdateAddressSuccess: ['updateAddressSuccess'],
    setUpdateAddressError: ['updateAddressError'],
    setUpdateEmailSuccess: ['updateEmailSuccess'],
    setUpdateEmailError: ['updateEmailError'],
    startPhoneVerification: ['customerExternalId', 'phoneNumber'],
    setPhoneVerificationSuccess: ['phoneVerificationSuccess'],
    setPhoneVerificationError: ['phoneVerificationError'],
    confirmPhoneVerification: ['code', 'customerExternalId', 'phoneNumber'],
    setConfirmPhoneVerificationSuccess: ['confirmPhoneVerificationSuccess'],
    setConfirmPhoneVerificationError: ['confirmPhoneVerificationError'],
    setIsLoading: ['isLoading'],
    checkVerificationStatus: ['field', 'customerExternalId'],
    setVerificationStatus: ['verificationStatus'],
    setVerificationStatusError: ['verificationError'],
    getSuggestedAddresses: ['address'],
    setSuggestedAddresses: ['suggestedAddresses'],
    setSuggestedAddressesError: ['suggestedAddressesError'],
    resetCustomer: [null],
  },
  {
    prefix: '@@BE-CUSTOMER/',
  }
);

export const CustomerActions = Creators;
export const CustomerTypes = Types;

// INITIAL STATE
export const INITIAL_STATE = Immutable({
  externalId: null,
  data: null,
  fetchCustomerError: null,
  updateAddressError: null,
  updateAddressSuccess: false,
  updateEmailError: null,
  updateEmailSuccess: false,
  phoneVerificationSuccess: false,
  phoneVerificationError: null,
  confirmPhoneVerificationSuccess: false,
  confirmPhoneVerificationError: null,
  isLoading: false,
  verificationStatus: null,
  verificationError: null,
  suggestedAddresses: [],
  suggestedAddressesError: null,
});

// SELECTORS
export const CustomerSelectors = {
  getExternalId: (state) => state.customer.externalId,
  getCustomer: (state) => state.customer.data,
  getFetchCustomerError: (state) => state.customer.fetchCustomerError,
  getUpdateAddressError: (state) => state.customer.updateAddressError,
  getUpdateAddressSuccess: (state) => state.customer.updateAddressSuccess,
  getUpdateEmailError: (state) => state.customer.updateEmailError,
  getUpdateEmailSuccess: (state) => state.customer.updateEmailSuccess,
  getPhoneVerificationSuccess: (state) => state.customer.phoneVerificationSuccess,
  getPhoneVerificationError: (state) => state.customer.phoneVerificationError,
  getConfirmPhoneVerificationSuccess: (state) => state.customer.confirmPhoneVerificationSuccess,
  getConfirmPhoneVerificationError: (state) => state.customer.confirmPhoneVerificationError,
  getIsLoading: (state) => state.customer.isLoading,
  getIsRefreshingCustomer: (state) => state.customer.isLoading && state.customer.data !== null,
  getVerificationStatus: (state) => state.customer.verificationStatus,
  getVerificationStatusError: (state) => state.customer.verificationError,
  getSuggestedAddresses: (state) => state.customer.suggestedAddresses,
  getSuggestedAddressesError: (state) => state.customer.suggestedAddressesError,
};

// ACTION HANDLERS

const updateCustomerData = (state, { newData }) => {
  return state.update('data', (data) => ({ ...data, ...newData }));
};

const setExternalId = (state, { externalId }) => {
  return state.merge({ externalId });
};

const setFetchCustomerSuccess = (state, { data }) => {
  return state.merge({ data });
};

const setFetchCustomerError = (state, { fetchCustomerError }) => {
  return state.merge({ fetchCustomerError });
};

const setUpdateAddressSuccess = (state, { updateAddressSuccess }) => {
  return state.merge({ updateAddressSuccess });
};

const setUpdateAddressError = (state, { updateAddressError }) => {
  return state.merge({ updateAddressError });
};

const setIsLoading = (state, { isLoading }) => {
  return state.merge({ isLoading });
};

const setUpdateEmailSuccess = (state, { updateEmailSuccess }) => {
  return state.merge({ updateEmailSuccess });
};

const setUpdateEmailError = (state, { updateEmailError }) => {
  return state.merge({ updateEmailError });
};

const setPhoneVerificationSuccess = (state, { phoneVerificationSuccess }) => {
  return state.merge({ phoneVerificationSuccess });
};

const setPhoneVerificationError = (state, { phoneVerificationError }) => {
  return state.merge({ phoneVerificationError });
};

const setConfirmPhoneVerificationSuccess = (state, { confirmPhoneVerificationSuccess }) => {
  return state.merge({ confirmPhoneVerificationSuccess });
};

const setConfirmPhoneVerificationError = (state, { confirmPhoneVerificationError }) => {
  return state.merge({ confirmPhoneVerificationError });
};

const setVerificationStatus = (state, { verificationStatus }) => {
  return state.merge({ verificationStatus });
};
const setVerificationStatusError = (state, { verificationError }) => {
  return state.merge({ verificationError });
};

const setSuggestedAddresses = (state, { suggestedAddresses }) => {
  return state.merge({
    suggestedAddresses: suggestedAddresses.map((address) => ({
      addressLine1: address.primary_line,
      city: address.city,
      state: address.state,
      zipCode: address.zip_code,
    })),
  });
};

const setSuggestedAddressesError = (state, { suggestedAddressesError }) => {
  return state.merge({ suggestedAddressesError });
};

const resetCustomer = () => {
  return INITIAL_STATE;
};

// REDUCER
export const CustomerReducer = createReducer(INITIAL_STATE, {
  [Types.UPDATE_CUSTOMER_DATA]: updateCustomerData,
  [Types.SET_EXTERNAL_ID]: setExternalId,
  [Types.SET_FETCH_CUSTOMER_SUCCESS]: setFetchCustomerSuccess,
  [Types.SET_FETCH_CUSTOMER_ERROR]: setFetchCustomerError,
  [Types.SET_UPDATE_ADDRESS_SUCCESS]: setUpdateAddressSuccess,
  [Types.SET_UPDATE_ADDRESS_ERROR]: setUpdateAddressError,
  [Types.SET_UPDATE_EMAIL_SUCCESS]: setUpdateEmailSuccess,
  [Types.SET_UPDATE_EMAIL_ERROR]: setUpdateEmailError,
  [Types.SET_IS_LOADING]: setIsLoading,
  [Types.RESET_CUSTOMER]: resetCustomer,
  [Types.SET_PHONE_VERIFICATION_SUCCESS]: setPhoneVerificationSuccess,
  [Types.SET_PHONE_VERIFICATION_ERROR]: setPhoneVerificationError,
  [Types.SET_CONFIRM_PHONE_VERIFICATION_SUCCESS]: setConfirmPhoneVerificationSuccess,
  [Types.SET_CONFIRM_PHONE_VERIFICATION_ERROR]: setConfirmPhoneVerificationError,
  [Types.SET_VERIFICATION_STATUS]: setVerificationStatus,
  [Types.SET_VERIFICATION_STATUS_ERROR]: setVerificationStatusError,
  [Types.SET_SUGGESTED_ADDRESSES]: setSuggestedAddresses,
  [Types.SET_SUGGESTED_ADDRESSES_ERROR]: setSuggestedAddressesError,
});
