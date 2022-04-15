import { Dynatrace } from '@dynatrace/react-native-plugin';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Keyboard } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { CurrencyInput, Plaid, Toast } from '_components/atoms';
import { SecondaryScreenLayout, TransferDetailsBottomSheet } from '_components/organisms';
import { EVENTS, EVENT_TYPES, NAVIGATION, TOAST_TYPES, TRANSFER_TYPES } from '_constants';
import strings from '_localization';
import { AccountActions, AccountSelectors } from '_store/account';
import { FundDirectDepositStoreSelectors } from '_store/pageStore/fundDirectDepositStore';
import { RegisterActions } from '_store/register';
import { getPlaidValues } from '_utilities/Plaid';
import { isValidTransferAmount } from '_utilities/transfers';
import {
  AddMoneyContainer,
  AddMoneyLegend,
  AddMoneyLimitMessage,
  ConfirmAmountButton,
  InfoContainer,
} from './AddMoneyPage.styles';

const AddMoneyPage = () => {
  const dispatch = useDispatch();
  const { goBack, navigate } = useNavigation();
  const { params } = useRoute();
  const [account] = useSelector(AccountSelectors.getAccountList);
  const externalId = useSelector(AccountSelectors.getExternalId);
  const { accountNumber } = useSelector(FundDirectDepositStoreSelectors.getRenderData);
  const linkAchSuccess = useSelector(AccountSelectors.getLinkAchSuccess);
  const linkAchError = useSelector(AccountSelectors.getLinkAchError);
  const isLoadingLinkAchAccount = useSelector(AccountSelectors.getIsLoadingLinkAchAccount);

  const currencyInputRef = useRef(null);
  const transferDetailsBottomSheet = useRef(null);

  const [amount, setAmount] = useState(0);

  const accountNumberLastFour = accountNumber?.slice(accountNumber.length - 4);
  const toastMessage = linkAchError ?? strings.linkAccount.linkAccountSuccess;
  const type = linkAchError?.type || (linkAchSuccess && TOAST_TYPES.SUCCESS) || TOAST_TYPES.ERROR;

  const handleCloseToast = () => {
    dispatch(AccountActions.setLinkAchAccountSuccess(false));
    dispatch(AccountActions.setLinkAchAccountError(null));
  };

  const resetInput = () => {
    currencyInputRef.current.clear();
    setAmount(0);
  };

  const handleLinkBankAccountSuccess = (data) => {
    const achData = getPlaidValues(data);
    dispatch(AccountActions.linkAchAccount(achData, externalId));
  };

  const handleLinkBankAccountExit = (data) => {
    if (data.error) {
      Dynatrace.reportError(`Add money - Link Bank Account Error: ${JSON.stringify(data)}`, 0);
    }
  };

  const confirmTransferAmount = useCallback(() => {
    Keyboard.dismiss();
    transferDetailsBottomSheet.current.open();
    const event = EVENTS.MONEY_TRANSFER_CONFIRMATION_SHEET_OPENED;
    const transferType = TRANSFER_TYPES.ACH_IN;
    dispatch(RegisterActions.trackEvent(event, EVENT_TYPES.TRACK, { transferType, amount }));
  }, [dispatch, amount]);

  useEffect(() => {
    if (linkAchSuccess) {
      confirmTransferAmount();
      dispatch(AccountActions.setLinkAchAccountError(null));
    } else if (linkAchError) {
      Keyboard.dismiss();
    }
  }, [dispatch, confirmTransferAmount, linkAchSuccess, linkAchError]);

  const memoizedIsValidTransferAmount = useMemo(
    () => isValidTransferAmount(amount, TRANSFER_TYPES.ACH_IN),
    [amount]
  );

  const handleOnBackPress = () => {
    return params?.target ? navigate(NAVIGATION.accounts.stack) : goBack();
  };

  return (
    <SecondaryScreenLayout
      testID="AddMoneyPage"
      title={strings.fund.chooseAmount.title}
      onBackPress={handleOnBackPress}
    >
      <AddMoneyContainer>
        <InfoContainer>
          <AddMoneyLegend>{strings.fund.chooseAmount.legend}</AddMoneyLegend>
          <CurrencyInput ref={currencyInputRef} onChangeValue={setAmount} value={amount} />
        </InfoContainer>
        {!!memoizedIsValidTransferAmount.message && (
          <AddMoneyLimitMessage>{memoizedIsValidTransferAmount.message}</AddMoneyLimitMessage>
        )}
        {!account && !isLoadingLinkAchAccount ? (
          <Plaid
            disabled={!memoizedIsValidTransferAmount.valid}
            onExit={handleLinkBankAccountExit}
            onSuccess={handleLinkBankAccountSuccess}
            title={strings.fund.chooseAmount.continue}
          />
        ) : (
          <ConfirmAmountButton
            disabled={!memoizedIsValidTransferAmount.valid}
            isLoading={isLoadingLinkAchAccount}
            onPress={confirmTransferAmount}
            testID="addMoneyContinueButton"
          >
            {strings.fund.chooseAmount.continue}
          </ConfirmAmountButton>
        )}
      </AddMoneyContainer>
      <TransferDetailsBottomSheet
        ref={transferDetailsBottomSheet}
        transaction={{
          amount,
          transferAmount: amount,
          transferFrom: `${account?.name}`,
          transferTo: `${strings.moneyMovement.transferDetails.kinlyAccount} (${accountNumberLastFour})`,
          transferMethod: TRANSFER_TYPES.ACH_IN,
        }}
        clearInput={resetInput}
      />
      <Toast
        type={type}
        header={toastMessage?.title}
        content={toastMessage?.description}
        onClose={handleCloseToast}
        show={linkAchError !== null || linkAchSuccess}
        testID="addMoneyConfirmErrorToast"
      />
    </SecondaryScreenLayout>
  );
};

export default AddMoneyPage;
