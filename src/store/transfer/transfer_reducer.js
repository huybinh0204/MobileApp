import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';

const { Types, Creators } = createActions(
  {
    achIn: ['data'],
    achInSuccess: [null],
    achInFail: ['achInError'],
    achOut: ['data'],
    achOutSuccess: [null],
    achOutFail: ['achOutError'],
    instantOut: ['data'],
    instantOutSuccess: [null],
    instantOutFail: ['instantOutError'],
    setIsLoading: ['isLoading'],
    resetTransfer: [null],
  },
  {
    prefix: '@@BE-TRANSFER/',
  }
);

export const TransferActions = Creators;
export const TransferTypes = Types;

// INITIAL STATE
export const INITIAL_STATE = Immutable({
  achInSuccess: false,
  achInError: null,
  achOutSuccess: false,
  achOutError: null,
  instantOutSuccess: false,
  instantOutError: null,
  isLoading: false,
});

// SELECTORS
export const TransferSelectors = {
  getAchInSuccess: (state) => state.transfer.achInSuccess,
  getAchInError: (state) => state.transfer.achInError,
  getAchOutSuccess: (state) => state.transfer.achOutSuccess,
  getAchOutError: (state) => state.transfer.achOutError,
  getInstantOutSuccess: (state) => state.transfer.instantOutSuccess,
  getInstantOutError: (state) => state.transfer.instantOutError,
  getIsLoading: (state) => state.transfer.isLoading,
};

// ACTION HANDLERS
const achInSuccess = (state) => {
  return state.merge({ achInSuccess: true });
};

const achInFail = (state, { achInError }) => {
  return state.merge({ achInError });
};

const achOutSuccess = (state) => {
  return state.merge({ achOutSuccess: true });
};

const achOutFail = (state, { achOutError }) => {
  return state.merge({ achOutError });
};

const instantOutSuccess = (state) => {
  return state.merge({ instantOutSuccess: true });
};

const instantOutFail = (state, { instantOutError }) => {
  return state.merge({ instantOutError });
};

const setIsLoading = (state, { isLoading }) => {
  return state.merge({ isLoading });
};

const resetTransfer = () => {
  return INITIAL_STATE;
};

// REDUCER
export const TransferReducer = createReducer(INITIAL_STATE, {
  [Types.ACH_IN_SUCCESS]: achInSuccess,
  [Types.ACH_IN_FAIL]: achInFail,
  [Types.ACH_OUT_SUCCESS]: achOutSuccess,
  [Types.ACH_OUT_FAIL]: achOutFail,
  [Types.INSTANT_OUT_SUCCESS]: instantOutSuccess,
  [Types.INSTANT_OUT_FAIL]: instantOutFail,
  [Types.SET_IS_LOADING]: setIsLoading,
  [Types.RESET_TRANSFER]: resetTransfer,
});
