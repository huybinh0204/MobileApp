import { combineReducers } from 'redux';
import actionWatchReducer from 'redux-action-watch/lib/reducer';
import { resettableReducer } from 'reduxsauce';
import { AccountReducer } from './account';
import { AuthenticationReducer } from './authentication';
import { CustomerReducer } from './customer';
import { FundDirectDepositStoreReducer } from './pageStore/fundDirectDepositStore';
import { RegisterReducer } from './register';
import { TransferReducer } from './transfer';

const resettable = resettableReducer('RESET');

export default combineReducers({
  account: resettable(AccountReducer),
  auth: resettable(AuthenticationReducer),
  customer: resettable(CustomerReducer),
  fundDirectDepositStoreReducer: resettable(FundDirectDepositStoreReducer),
  register: RegisterReducer,
  transfer: resettable(TransferReducer),
  watcher: actionWatchReducer, // Must be last
});
