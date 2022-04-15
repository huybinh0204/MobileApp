import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import React, { forwardRef, useCallback, useEffect } from 'react';
import BottomSheet from 'react-native-raw-bottom-sheet';
import { useDispatch, useSelector } from 'react-redux';
import { MainButton, Toast } from '_components/atoms';
import { TransferDetailsItem } from '_components/molecules';
import { EVENTS, EVENT_TYPES, NAVIGATION, TOAST_TYPES, TRANSFER_TYPES } from '_constants';
import strings from '_localization';
import { AccountSelectors } from '_store/account';
import { RegisterActions } from '_store/register';
import { TransferActions, TransferSelectors } from '_store/transfer';
import { formatCurrency } from '_utilities/currency';
import { normalize } from '_utilities/screen';
import {
  DetailsSheetContainer,
  DetailsSheetDisclaimer,
  DetailsSheetSubmitButton,
  DetailsSheetTitle,
} from './TransferDetailsBottomSheet.styles';

const { ACH_IN, ACH_OUT, INSTANT_OUT } = TRANSFER_TYPES;

const TransferDetailsBottomSheet = forwardRef(({ transaction, clearInput }, ref) => {
  const dispatch = useDispatch();
  const { navigate } = useNavigation();

  const [account] = useSelector(AccountSelectors.getAccountList);
  const isLoading = useSelector(TransferSelectors.getIsLoading);
  const externalId = useSelector(AccountSelectors.getExternalId);

  const achInError = useSelector(TransferSelectors.getAchInError);
  const achInSuccess = useSelector(TransferSelectors.getAchInSuccess);
  const achOutError = useSelector(TransferSelectors.getAchOutError);
  const achOutSuccess = useSelector(TransferSelectors.getAchOutSuccess);
  const instantOutError = useSelector(TransferSelectors.getInstantOutError);
  const instantOutSuccess = useSelector(TransferSelectors.getInstantOutSuccess);

  const transferError = achInError || achOutError || instantOutError;

  const { amount, cardId, transferAmount, transferFee, transferFrom, transferTo, transferMethod } =
    transaction;

  const isInstantTransfer = transferMethod === INSTANT_OUT;

  const closeDetailsSheet = useCallback(() => {
    ref.current.close();
  }, [ref]);

  const handleCloseToast = () => {
    dispatch(TransferActions.achInFail(null));
    dispatch(TransferActions.achOutFail(null));
    dispatch(TransferActions.instantOutFail(null));
  };

  const handleConfirmTransfer = () => {
    const event = EVENTS.MONEY_TRANSFER_CONFIRMED;
    const transferType = transferMethod;
    dispatch(RegisterActions.trackEvent(event, EVENT_TYPES.TRACK, { transferType, amount }));
    if (transferMethod === ACH_IN) {
      dispatch(TransferActions.achIn({ achAccountId: account.id, amount, externalId }));
    } else if (transferMethod === ACH_OUT) {
      dispatch(TransferActions.achOut({ achAccountId: account.id, amount, externalId }));
    } else if (transferMethod === INSTANT_OUT) {
      dispatch(TransferActions.instantOut({ amount, cardId, externalId }));
    }
  };

  useEffect(() => {
    if (achInSuccess || achOutSuccess || instantOutSuccess) {
      closeDetailsSheet();
      navigate(NAVIGATION.shared.moneyTransferSuccess, transaction);
    }
  }, [achOutSuccess, achInSuccess, closeDetailsSheet, instantOutSuccess, navigate, transaction]);

  useEffect(() => {
    if (achInError || achOutError || instantOutError) {
      closeDetailsSheet();
      clearInput();
    }
  }, [achInError, achOutError, clearInput, closeDetailsSheet, instantOutError]);

  return (
    <>
      <BottomSheet
        closeOnPressBack={false}
        closeOnPressMask={false}
        height={normalize(isInstantTransfer ? 550 : 410)}
        ref={ref}
      >
        <DetailsSheetContainer>
          <DetailsSheetTitle>
            {strings.formatString(strings.moneyMovement.confirmationTitle, {
              amount: formatCurrency(amount),
            })}
          </DetailsSheetTitle>
          {isInstantTransfer && (
            <>
              <TransferDetailsItem
                label={strings.moneyMovement.transferDetails.receiveAmount}
                value={formatCurrency(transferAmount)}
              />
              <TransferDetailsItem
                label={strings.moneyMovement.transferDetails.fee}
                value={formatCurrency(transferFee)}
              />
            </>
          )}
          <TransferDetailsItem
            label={strings.moneyMovement.transferDetails.from}
            value={transferFrom}
          />
          <TransferDetailsItem
            label={strings.moneyMovement.transferDetails.to}
            value={transferTo}
          />
          <TransferDetailsItem
            isLastItem
            label={strings.moneyMovement.transferDetails.method}
            value={
              isInstantTransfer
                ? strings.moneyMovement.transferDetails.instantTransfer
                : strings.moneyMovement.transferDetails.standardTransfer
            }
          />
          {isInstantTransfer && (
            <DetailsSheetDisclaimer>
              {strings.moneyMovement.transferDetails.instantTransferDisclaimer}
            </DetailsSheetDisclaimer>
          )}
          <DetailsSheetSubmitButton isLoading={isLoading} onPress={handleConfirmTransfer}>
            {strings.moneyMovement.transferDetails.confirmButton}
          </DetailsSheetSubmitButton>
          <MainButton disabled={isLoading} onPress={closeDetailsSheet} variant="secondary">
            {strings.moneyMovement.transferDetails.cancelButton}
          </MainButton>
        </DetailsSheetContainer>
      </BottomSheet>
      <Toast
        type={TOAST_TYPES.ERROR}
        header={transferError?.title}
        content={transferError?.description}
        onClose={handleCloseToast}
        show={transferError !== null}
        testID="transferErrorToast"
      />
    </>
  );
});

TransferDetailsBottomSheet.defaultProps = {
  clearInput: () => {},
};

TransferDetailsBottomSheet.propTypes = {
  clearInput: PropTypes.func,
  transaction: PropTypes.shape({
    amount: PropTypes.number,
    cardId: PropTypes.string,
    transferAmount: PropTypes.number,
    transferFee: PropTypes.number,
    transferFrom: PropTypes.string,
    transferTo: PropTypes.string,
    transferMethod: PropTypes.string,
  }).isRequired,
};

export default TransferDetailsBottomSheet;
