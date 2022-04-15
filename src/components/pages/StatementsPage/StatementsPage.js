import { useTheme } from '@emotion/react';
import { DateTime } from 'luxon';
import React, { useEffect, useMemo } from 'react';
import { ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { SecondaryScreenLayout } from '_components/organisms';
import { FEATURE_FLAGS } from '_constants';
import { useBooleanFeatureFlag } from '_hooks';
import strings from '_localization';
import { AccountActions, AccountSelectors } from '_store/account';
import { CustomerSelectors } from '_store/customer';
import { getStatementsDateRange } from '_utilities/date';
import StatementsList from './StatementsList';
import { LoadingContainer } from './StatementsPage.styles';

const StatementsPage = () => {
  const { colors } = useTheme();
  const dispatch = useDispatch();

  const accountInfo = useSelector(AccountSelectors.getAccountInfo);
  const accountExternalId = useSelector(AccountSelectors.getExternalId);
  const customerExternalId = useSelector(CustomerSelectors.getExternalId);

  const showAllStatement = useBooleanFeatureFlag(
    FEATURE_FLAGS.SHOW_ALL_MONTHS_STATEMENT,
    customerExternalId
  );

  const currentDate = useMemo(() => DateTime.now().toISO(), []);
  const accountCreationDate = accountInfo?.createdAt;

  useEffect(() => {
    if (accountExternalId && !accountInfo) {
      dispatch(AccountActions.fetchAccountInfo(accountExternalId));
    }
  }, [accountExternalId, accountInfo, dispatch]);

  return (
    <SecondaryScreenLayout testID="StatementsPage" title={strings.settings.statements}>
      {!accountInfo ? (
        <LoadingContainer testID="Statements-Page-Loading">
          <ActivityIndicator color={colors.alpha500} size="large" />
        </LoadingContainer>
      ) : (
        <StatementsList
          statements={getStatementsDateRange(accountCreationDate, currentDate, showAllStatement)}
        />
      )}
    </SecondaryScreenLayout>
  );
};

export default StatementsPage;
