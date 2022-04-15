import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';

const { Types, Creators } = createActions(
  {
    trackEvent: ['event', 'eventType', 'properties'],
    trackEventSuccess: ['message'],
    trackEventFails: ['message'],
  },
  {
    prefix: '@@BE-REGISTER/',
  }
);

export const RegisterActions = Creators;
export const RegisterTypes = Types;

// INITIAL STATE
export const INITIAL_STATE = Immutable({});

// ACTION HANDLERS
const trackEventSuccess = (state, { message }) => {
  console.info('Track Event SUCCESS:', message);
  return state;
};

const trackEventFails = (state, { message }) => {
  console.warn('Track Event FAIL:', message);
  return state;
};

// REDUCER
export const RegisterReducer = createReducer(INITIAL_STATE, {
  [Types.TRACK_EVENT_SUCCESS]: trackEventSuccess,
  [Types.TRACK_EVENT_FAILS]: trackEventFails,
});
