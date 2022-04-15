import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';

const { Types, Creators } = createActions(
  {
    fetchRenderData: ['externalId'],
    fetchRenderDataSuccess: ['data'],
    fetchRenderDataFail: ['error'],
    resetRenderData: [null],
  },
  {
    prefix: '@@BE-DIRECT-DEPOSIT/',
  }
);

export const FundDirectDepositStoreActions = Creators;
export const FundDirectDepositStoreTypes = Types;

// INITAL STATE
export const INITIAL_STATE = Immutable({
  renderData: {
    accountNumber: null,
    routingNumber: null,
  },
  renderDataError: false,
});

// SELECTORS
export const FundDirectDepositStoreSelectors = {
  getRenderData: (state) => state.fundDirectDepositStoreReducer.renderData,
  getRenderDataError: (state) => state.fundDirectDepositStoreReducer.renderDataError,
};

// ACTION HANDLERS
const fetchRenderDataSuccess = (state, { data }) => {
  return state.merge({ renderData: data });
};

const fetchRenderDataFail = (state) => {
  return state.merge({ renderDataError: true });
};

const resetRenderData = () => {
  return INITIAL_STATE;
};

// REDUCER
export const FundDirectDepositStoreReducer = createReducer(INITIAL_STATE, {
  [Types.FETCH_RENDER_DATA_SUCCESS]: fetchRenderDataSuccess,
  [Types.FETCH_RENDER_DATA_FAIL]: fetchRenderDataFail,
  [Types.RESET_RENDER_DATA]: resetRenderData,
});
