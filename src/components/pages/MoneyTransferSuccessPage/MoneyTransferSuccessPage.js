import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { useDispatch } from 'react-redux';
import { MainButton } from '_components/atoms';
import { TransferDetailsItem } from '_components/molecules';
import { SecondaryScreenLayout } from '_components/organisms';
import { ICONS, TRANSFER_TYPES } from '_constants';
import strings from '_localization';
import { AuthenticationActions } from '_store/authentication';
import { TransferActions } from '_store/transfer';
import { normalize } from '_utilities/screen';
import {
  ButtonContainer,
  Icon,
  InstantTransferDisclaimer,
  MoneyTransferSuccessContainer,
  Title,
} from './MoneyTransferSuccessPage.styles';

const MoneyTransferSuccessPage = () => {
  const dispatch = useDispatch();
  const { params } = useRoute();
  const { popToTop } = useNavigation();

  const { transferAmount, transferFee, transferFrom, transferTo, transferMethod } = params;
  const isInstantTransfer = transferMethod === TRANSFER_TYPES.INSTANT_OUT;

  const handlePress = () => {
    dispatch(TransferActions.resetTransfer());
    dispatch(AuthenticationActions.setIsSignIn(true));
    popToTop();
  };

  return (
    <SecondaryScreenLayout showBackButton={false} testID="MoneyTransferSuccessPage">
      <MoneyTransferSuccessContainer>
        <Icon icon={ICONS.checkmarkLines} width={normalize(80)} height={normalize(80)} />
        <Title>{strings.fund.success.title}</Title>
        <TransferDetailsItem
          label={strings.moneyMovement.transferDetails.transferAmount}
          value={`${strings.currencySymbol}${transferAmount.toFixed(2)}`}
        />
        {isInstantTransfer && (
          <TransferDetailsItem
            label={strings.moneyMovement.transferDetails.fee}
            value={`${strings.currencySymbol}${transferFee}`}
          />
        )}
        <TransferDetailsItem
          label={strings.moneyMovement.transferDetails.from}
          value={transferFrom}
        />
        <TransferDetailsItem label={strings.moneyMovement.transferDetails.to} value={transferTo} />
        <TransferDetailsItem
          isLastItem
          label={strings.moneyMovement.transferDetails.method}
          value={
            isInstantTransfer
              ? strings.moneyMovement.transferDetails.instantTransfer
              : strings.moneyMovement.transferDetails.standardTransfer
          }
        />
        <ButtonContainer>
          {isInstantTransfer && (
            <InstantTransferDisclaimer>
              {strings.moneyMovement.transferDetails.instantTransferDisclaimer}
            </InstantTransferDisclaimer>
          )}
          <MainButton onPress={handlePress} testID="moneyTransferSuccessButton">
            {strings.fund.success.gotIt}
          </MainButton>
        </ButtonContainer>
      </MoneyTransferSuccessContainer>
    </SecondaryScreenLayout>
  );
};

export default MoneyTransferSuccessPage;
