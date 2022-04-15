import { useTheme } from '@emotion/react';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useEffect } from 'react';
import { RefreshControl } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Toast } from '_components/atoms';
import {
  AccountSummary,
  ActivateCardNudge,
  EarlyPaycheckNudge,
  MainScreenLayout,
  OverdraftNudge,
} from '_components/organisms';
import { TOAST_TYPES } from '_constants';
import strings from '_localization';
import { AccountActions, AccountSelectors } from '_store/account';
import { CustomerActions, CustomerSelectors } from '_store/customer';
import { ScrollView } from './HomeTabPage.styles';

const HomeTabPage = () => {
  const { spacing } = useTheme();
  const dispatch = useDispatch();

  const accountExternalId = useSelector(AccountSelectors.getExternalId);
  const customerExternalId = useSelector(CustomerSelectors.getExternalId);
  const isRefreshingCustomer = useSelector(CustomerSelectors.getIsRefreshingCustomer);
  const isRefreshingKinlyDebitCards = useSelector(AccountSelectors.getIsRefreshingKinlyDebitCards);
  const isRefreshingOverdraft = useSelector(AccountSelectors.getIsRefreshingOverdraftStatus);
  const fetchAccountInfoError = useSelector(AccountSelectors.getFetchAccountInfoError);
  const fetchKinlyDebitCardsError = useSelector(AccountSelectors.getFetchKinlyDebitCardsError);
  const fetchCustomerError = useSelector(CustomerSelectors.getFetchCustomerError);
  const fetchOverdraftError = useSelector(AccountSelectors.getFetchOverdraftError);
  const hasDebitCardWaitingToActivate = useSelector(AccountSelectors.hasDebitCardWaitingToActivate);

  const isRefreshing = isRefreshingCustomer || isRefreshingKinlyDebitCards || isRefreshingOverdraft;

  const handleCloseToast = () => {
    dispatch(AccountActions.setFetchAccountInfoError(null));
    dispatch(AccountActions.setFetchKinlyDebitCardsError(null));
    dispatch(AccountActions.setFetchOverdraftStatusError(null));
    dispatch(CustomerActions.setFetchCustomerError(null));
  };

  const fetchData = useCallback(() => {
    dispatch(AccountActions.fetchKinlyDebitCards(accountExternalId));
    dispatch(AccountActions.fetchOverdraftStatus(accountExternalId));
    dispatch(CustomerActions.fetchCustomer(customerExternalId));
  }, [accountExternalId, customerExternalId, dispatch]);

  const fetchAccountInfo = useCallback(() => {
    dispatch(AccountActions.fetchAccountInfo(accountExternalId));
  }, [dispatch, accountExternalId]);

  useFocusEffect(fetchAccountInfo);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <MainScreenLayout title={strings.home.header} testID="HomeTabPage">
      <ScrollView
        contentContainerStyle={{ paddingBottom: spacing.s }}
        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={fetchData} />}
      >
        <AccountSummary />
        {hasDebitCardWaitingToActivate && <ActivateCardNudge testID="ActivateCardNudgeComponent" />}
        <OverdraftNudge />
        <EarlyPaycheckNudge />
      </ScrollView>
      <Toast
        header={fetchAccountInfoError?.title}
        content={fetchAccountInfoError?.description}
        show={fetchAccountInfoError !== null}
        onClose={handleCloseToast}
        type={TOAST_TYPES.ERROR}
      />
      <Toast
        header={fetchCustomerError?.title}
        content={fetchCustomerError?.description}
        show={fetchCustomerError !== null}
        onClose={handleCloseToast}
        type={TOAST_TYPES.ERROR}
      />
      <Toast
        header={fetchOverdraftError?.title}
        content={fetchOverdraftError?.description}
        show={fetchOverdraftError !== null}
        onClose={handleCloseToast}
        type={TOAST_TYPES.ERROR}
      />
      <Toast
        header={fetchKinlyDebitCardsError?.title}
        content={fetchKinlyDebitCardsError?.description}
        show={fetchKinlyDebitCardsError !== null}
        onClose={handleCloseToast}
        type={TOAST_TYPES.ERROR}
      />
    </MainScreenLayout>
  );
};

export default HomeTabPage;
