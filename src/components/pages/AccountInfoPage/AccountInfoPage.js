import Clipboard from '@react-native-community/clipboard';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Toast } from '_components/atoms';
import { SecondaryScreenLayout } from '_components/organisms';
import { ICONS, TOAST_TYPES } from '_constants';
import strings from '_localization';
import { AccountSelectors } from '_store/account';
import {
  FundDirectDepositStoreActions,
  FundDirectDepositStoreSelectors,
} from '_store/pageStore/fundDirectDepositStore';
import { normalize } from '_utilities/screen';
import { Content, DataLabel, DataRow, DataValue, Logo } from './AccountInfoPage.styles';

const AccountInfoPage = () => {
  const dispatch = useDispatch();
  const [toastText, setToastText] = useState(null);
  const externalId = useSelector(AccountSelectors.getExternalId);
  const accountInfo = useSelector(FundDirectDepositStoreSelectors.getRenderData);
  const { accountNumber, routingNumber } = accountInfo;

  useEffect(() => {
    if (externalId && (!accountNumber || !routingNumber)) {
      dispatch(FundDirectDepositStoreActions.fetchRenderData(externalId));
    }
  }, [accountNumber, routingNumber, dispatch, externalId]);

  const copyAccountNumber = () => {
    Clipboard.setString(accountNumber);
    setToastText(strings.accountInfo.accountNumberCopied);
  };

  const copyRoutingNumber = () => {
    Clipboard.setString(routingNumber);
    setToastText(strings.accountInfo.routingNumberCopied);
  };

  const closeToast = () => {
    setToastText(null);
  };

  return (
    <SecondaryScreenLayout title={strings.settings.account_info} testID="AccountInfoPage">
      <Content>
        <Logo icon={ICONS.logoSpecial} width={normalize(128)} height={normalize(128)} />
        <DataRow
          accessibilityLabel="Copy account number"
          accessibilityRole="button"
          disabled={!accountNumber}
          onLongPress={copyAccountNumber}
        >
          <DataLabel>{strings.accountInfo.accountNumber}</DataLabel>
          <DataValue>{accountNumber ?? '-'}</DataValue>
        </DataRow>
        <DataRow
          accessibilityLabel="Copy routing number"
          accessibilityRole="button"
          disabled={!routingNumber}
          onLongPress={copyRoutingNumber}
        >
          <DataLabel>{strings.accountInfo.routingNumber}</DataLabel>
          <DataValue>{routingNumber ?? '-'}</DataValue>
        </DataRow>
      </Content>
      <Toast
        type={TOAST_TYPES.INFO}
        onClose={closeToast}
        testID="accountInfoToast"
        header={strings.accountInfo.copied}
        content={toastText}
        show={!!toastText}
      />
    </SecondaryScreenLayout>
  );
};

export default AccountInfoPage;
