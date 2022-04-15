import { Dynatrace } from '@dynatrace/react-native-plugin';
import { EVENTS, EVENT_TYPES } from '_constants';
import AppsFlyerService from '_services/AppsFlyerService';
import { resetNavigation } from '_services/NavigationService';
import { AccountActions } from '_store/account';
import { AuthenticationActions, AuthenticationSelectors } from '_store/authentication';
import { FundDirectDepositStoreActions } from '_store/pageStore/fundDirectDepositStore';
import { RegisterActions } from '_store/register';
import { TransferActions } from '_store/transfer';
import { isPastDateTime } from '_utilities/date';

export const createVerifySessionMiddleware = (apiClient) => (store) => (next) => (action) => {
  const state = store.getState();
  const credentials = AuthenticationSelectors.getCredentials(state);
  const tokenExpiration = credentials?.expiration;
  const sessionExpired = tokenExpiration && isPastDateTime(tokenExpiration);

  if (sessionExpired) {
    apiClient.clearAuthorization();
    const reportSessionExpiration = Dynatrace.enterAction(EVENTS.SESSION_EXPIRED);
    next(AuthenticationActions.resetAuthentication({ isSessionExpired: true }));
    next(AccountActions.resetAccount());
    next(TransferActions.resetTransfer());
    next(FundDirectDepositStoreActions.resetRenderData());
    next(RegisterActions.trackEvent(EVENTS.SESSION_EXPIRED, EVENT_TYPES.TRACK));
    reportSessionExpiration.leaveAction();
    AppsFlyerService.reset();
    resetNavigation();
  } else {
    return next(action);
  }
};
