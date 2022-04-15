import { Dynatrace } from '@dynatrace/react-native-plugin';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Keyboard } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { CurrencyInput, Plaid, Toast } from '_components/atoms';
import { SelectButtonGroup } from '_components/molecules';
import { SecondaryScreenLayout, TransferDetailsBottomSheet } from '_components/organisms';
import { EVENTS, EVENT_TYPES, ICONS, NAVIGATION, TOAST_TYPES, TRANSFER_TYPES } from '_constants';
import strings from '_localization';
import { AccountActions, AccountSelectors } from '_store/account';
import { AuthenticationSelectors } from '_store/authentication';
import { FundDirectDepositStoreSelectors } from '_store/pageStore/fundDirectDepositStore';
import { RegisterActions } from '_store/register';
import { getPlaidValues } from '_utilities/Plaid';
import { calculateInstantTransferFee, isValidTransferAmount } from '_utilities/transfers';
import {
  ConfirmAmountButton,
  Legend,
  MainContainer,
  TransferLimit,
} from './TakeOutMoneyPage.styles';

const { ACH_OUT, INSTANT_OUT } = TRANSFER_TYPES;

const TakeOutMoneyPage = () => {
  const dispatch = useDispatch();
  const { navigate, goBack } = useNavigation();
  const { params } = useRoute();

  const accountExternalId = useSelector(AccountSelectors.getExternalId);
  const accountInfo = useSelector(AccountSelectors.getAccountInfo);
  const credentials = useSelector(AuthenticationSelectors.getCredentials);
  const linkAchSuccess = useSelector(AccountSelectors.getLinkAchSuccess);
  const linkAchError = useSelector(AccountSelectors.getLinkAchError);
  const [linkedBankAccount] = useSelector(AccountSelectors.getAccountList);
  const [linkedDebitCard] = useSelector(AccountSelectors.getAccountCardsList);
  const isLoadingAccountInfo = useSelector(AccountSelectors.getIsLoadingAccountInfo);
  const isLoadingLinkAchAccount = useSelector(AccountSelectors.getIsLoadingLinkAchAccount);
  const { accountNumber } = useSelector(FundDirectDepositStoreSelectors.getRenderData);

  const currencyInputRef = useRef(null);
  const transferDetailsBottomSheet = useRef(null);

  const [amount, setAmount] = useState(0);
  const [transferMethod, setTransferMethod] = useState(null);
  const [isTransferRequested, setIsTransferRequested] = useState(false);
  const [isAmoutErrorToastVisible, setIsAmoutErrorToastVisible] = useState(false);

  const accountBalance = accountInfo?.balance ?? 0;
  const accountNumberLastFour = accountNumber.slice(accountNumber.length - 4);
  const isInstantTransfer = transferMethod === INSTANT_OUT;
  const { transferAmount, transferFee } = calculateInstantTransferFee(amount);
  const fee = transferFee.toFixed(2);

  const transferMethods = useMemo(() => {
    const INSTANT_TRANSFER = {
      icon: ICONS.lightning,
      text: strings.formatString(strings.moneyMovement.instantTransfer, { fee }),
      value: INSTANT_OUT,
    };

    const ACH_TRANSFER = {
      icon: null,
      text: strings.moneyMovement.achTransfer,
      value: ACH_OUT,
    };

    return [INSTANT_TRANSFER, ACH_TRANSFER];
  }, [fee]);

  const closeAmoutErrorToast = () => {
    setIsAmoutErrorToastVisible(false);
  };

  const closeLinkAchErrorToast = () => {
    dispatch(AccountActions.setLinkAchAccountSuccess(false));
    dispatch(AccountActions.setLinkAchAccountError(null));
  };

  const resetInput = () => {
    currencyInputRef.current.clear();
    setAmount(0);
  };

  const handleLinkBankAccountSuccess = (data) => {
    const bankAccountData = getPlaidValues(data);
    dispatch(AccountActions.linkAchAccount(bankAccountData, accountExternalId));
  };

  const handleLinkBankAccountExit = (data) => {
    if (data.error) {
      Dynatrace.reportError(`Take out money - Link Bank Account Error: ${JSON.stringify(data)}`, 0);
    }
  };

  const confirmTransferAmount = useCallback(() => {
    dispatch(AccountActions.fetchAccountInfo(accountExternalId));
    setIsTransferRequested(true);
  }, [dispatch, accountExternalId]);

  const handleTransferAttempt = useCallback(() => {
    if (amount > accountBalance) {
      setIsAmoutErrorToastVisible(true);
    } else if (isInstantTransfer && !linkedDebitCard) {
      navigate(NAVIGATION.accounts.linkDebitCardPage);
    } else {
      transferDetailsBottomSheet.current.open();
      const event = EVENTS.MONEY_TRANSFER_CONFIRMATION_SHEET_OPENED;
      const transferType = isInstantTransfer ? INSTANT_OUT : ACH_OUT;
      dispatch(RegisterActions.trackEvent(event, EVENT_TYPES.TRACK, { transferType, amount }));
    }
  }, [accountBalance, amount, dispatch, isInstantTransfer, linkedDebitCard, navigate]);

  useEffect(() => {
    if (linkAchSuccess) {
      confirmTransferAmount();
      dispatch(AccountActions.setLinkAchAccountSuccess(false));
      dispatch(AccountActions.setLinkAchAccountError(null));
    } else if (linkAchError) {
      Keyboard.dismiss();
    }
  }, [confirmTransferAmount, dispatch, linkAchSuccess, linkAchError]);

  useEffect(() => {
    if (isTransferRequested && !isLoadingAccountInfo) {
      Keyboard.dismiss();
      handleTransferAttempt();
      setIsTransferRequested(false);
    }
  }, [handleTransferAttempt, isTransferRequested, isLoadingAccountInfo]);

  useEffect(() => {
    if (credentials?.sub) {
      dispatch(AccountActions.fetchPlaidLinkToken(credentials.sub));
    }
  }, [dispatch, credentials?.sub]);

  const memoizedIsValidTransferAmount = useMemo(
    () => isValidTransferAmount(amount, transferMethod),
    [amount, transferMethod]
  );

  const handleOnBackPress = () => {
    return params?.target ? navigate(NAVIGATION.accounts.stack) : goBack();
  };

  return (
    <SecondaryScreenLayout
      title={strings.moneyMovement.amountPageHeader}
      testID="TakeOutMoneyPage"
      onBackPress={handleOnBackPress}
    >
      <MainContainer>
        <Legend>{strings.moneyMovement.amountPageLegend}</Legend>
        <CurrencyInput
          ref={currencyInputRef}
          onChangeValue={setAmount}
          value={amount}
          testID="currency-input"
        />
        <SelectButtonGroup
          options={transferMethods}
          onSelect={setTransferMethod}
          selectedOption={transferMethod}
        />
        {!!memoizedIsValidTransferAmount.message && (
          <TransferLimit>{memoizedIsValidTransferAmount.message}</TransferLimit>
        )}
        {!linkedBankAccount && !isLoadingLinkAchAccount && transferMethod === ACH_OUT ? (
          <Plaid
            disabled={!memoizedIsValidTransferAmount.valid}
            onExit={handleLinkBankAccountExit}
            onSuccess={handleLinkBankAccountSuccess}
            title={strings.moneyMovement.submitButtonText}
            testID="PlaidButton"
          />
        ) : (
          <ConfirmAmountButton
            disabled={!memoizedIsValidTransferAmount.valid}
            isLoading={isLoadingAccountInfo || isLoadingLinkAchAccount}
            onPress={confirmTransferAmount}
            testID="SubmitButton"
          >
            {strings.moneyMovement.submitButtonText}
          </ConfirmAmountButton>
        )}
      </MainContainer>
      <TransferDetailsBottomSheet
        ref={transferDetailsBottomSheet}
        transaction={{
          amount,
          cardId: linkedDebitCard?.linkedDebitCardId,
          transferAmount: isInstantTransfer ? transferAmount : amount,
          transferFee: isInstantTransfer ? transferFee : 0,
          transferFrom: `${strings.moneyMovement.transferDetails.kinlyAccount} (${accountNumberLastFour})`,
          transferMethod,
          transferTo: isInstantTransfer
            ? `${linkedDebitCard?.issuer.payeeName} (${linkedDebitCard?.lastFourDigits})`
            : `${linkedBankAccount?.name}`,
        }}
        clearInput={resetInput}
      />
      <Toast
        type={TOAST_TYPES.ERROR}
        content={strings.moneyMovement.insufficientFundsToastContent}
        header={strings.moneyMovement.insufficientFundsToastHeader}
        onClose={closeAmoutErrorToast}
        show={isAmoutErrorToastVisible}
        testID="insufficientFundsToast"
      />
      <Toast
        type={TOAST_TYPES.ERROR}
        header={linkAchError?.title}
        content={linkAchError?.description}
        onClose={closeLinkAchErrorToast}
        show={linkAchError !== null}
        testID="linkAchErrorToast"
      />
    </SecondaryScreenLayout>
  );
};

export default TakeOutMoneyPage;
