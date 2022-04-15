import { createActions } from 'reduxsauce';

const { Creators } = createActions(
  {
    appStateChanged: ['appState'],
  },
  {
    prefix: '@@BE-APP/',
  }
);

export const AppActions = Creators;
