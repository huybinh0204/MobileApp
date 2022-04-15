import { useTheme } from '@emotion/react';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import BottomSheet from 'react-native-raw-bottom-sheet';
import { useDispatch, useSelector } from 'react-redux';
import { IconSvg, MainButton } from '_components/atoms';
import { ConfirmationBottomSheet, ListItem } from '_components/molecules';
import { EVENTS, EVENT_TYPES, ICONS, NAVIGATION } from '_constants';
import strings from '_localization';
import { AccountActions, AccountSelectors } from '_store/account';
import { RegisterActions } from '_store/register';
import { normalize } from '_utilities/screen';
import { BottomSheetContainer, BottomSheetTitle, Header, Remove } from './LinkedAccounts.styles';

const LinkedDebitCard = () => {
  const { colors } = useTheme();
  const { navigate } = useNavigation();

  const dispatch = useDispatch();
  const externalId = useSelector(AccountSelectors.getExternalId);
  const [debitCard] = useSelector(AccountSelectors.getAccountCardsList);
  const isLoadingUnlink = useSelector(AccountSelectors.getIsLoadingUnlinkDebitCard);
  const unlinkError = useSelector(AccountSelectors.getUnlinkDebitCardError);
  const unlinkSuccess = useSelector(AccountSelectors.getUnlinkDebitCardSuccess);

  const [linkedDebitCard, setLinkedDebitCard] = useState(debitCard);
  const bottomSheet = useRef(null);
  const [isUnlinkConfirmationVisible, setIsUnlinkConfirmationVisible] = useState(false);

  useEffect(() => {
    if (!isLoadingUnlink) {
      setLinkedDebitCard(debitCard);
    }
  }, [isLoadingUnlink, debitCard]);

  useEffect(() => {
    if (externalId) {
      dispatch(AccountActions.getAccountLinkedCards(externalId));
    }
  }, [dispatch, externalId]);

  useEffect(() => {
    if (unlinkError || unlinkSuccess) {
      setIsUnlinkConfirmationVisible(false);
      hideDebitCardInfo();
    }
  }, [unlinkError, unlinkSuccess]);

  const handleLinkDebitCard = () => {
    navigate(NAVIGATION.accounts.linkCard);
  };

  const showDebitCardInfo = () => {
    bottomSheet.current?.open();
  };

  const hideDebitCardInfo = () => {
    bottomSheet.current?.close();
  };

  const openUnlinkConfirmation = () => {
    setIsUnlinkConfirmationVisible(true);
    dispatch(
      RegisterActions.trackEvent(
        EVENTS.ACCOUNT_DEBIT_CARD_UNLINK_CONFIRMATION_OPENED,
        EVENT_TYPES.TRACK
      )
    );
  };

  const closeUnlinkConfirmation = () => {
    setIsUnlinkConfirmationVisible(false);
  };

  const cancelUnlinkConfirmation = () => {
    closeUnlinkConfirmation();
    dispatch(
      RegisterActions.trackEvent(
        EVENTS.ACCOUNT_DEBIT_CARD_UNLINK_CONFIRMATION_CANCELLED,
        EVENT_TYPES.TRACK
      )
    );
  };

  const handleUnlinkDebitCard = () => {
    dispatch(
      AccountActions.unlinkAccountCard(
        linkedDebitCard?.externalUserId,
        linkedDebitCard?.linkedDebitCardId
      )
    );
  };

  return (
    <>
      {linkedDebitCard ? (
        <TouchableOpacity onPress={showDebitCardInfo}>
          <ListItem
            color={colors.beta900}
            icon={ICONS.linkCard}
            title={`${linkedDebitCard.issuer.payeeName} (${linkedDebitCard.lastFourDigits})`}
          >
            <IconSvg width={normalize(25)} height={normalize(25)} icon={ICONS.arrowRight} />
          </ListItem>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={handleLinkDebitCard}>
          <ListItem icon={ICONS.linkCard} title={strings.linkCard.linkDebitCard}>
            <IconSvg width={normalize(25)} height={normalize(25)} icon={ICONS.arrowRightActive} />
          </ListItem>
        </TouchableOpacity>
      )}
      <BottomSheet closeOnPressMask={false} height={normalize(170)} ref={bottomSheet}>
        <BottomSheetContainer>
          <Header>
            <BottomSheetTitle>
              {`${linkedDebitCard?.issuer?.payeeName} (${linkedDebitCard?.lastFourDigits})`}
            </BottomSheetTitle>
            <TouchableOpacity
              testID="debitCardInfoBottomSheetRemove"
              onPress={openUnlinkConfirmation}
            >
              <Remove>{strings.linkCard.cardInfoBottomSheet.remove}</Remove>
            </TouchableOpacity>
          </Header>
          <MainButton testID="debitCardInfoBottomSheetCloseButton" onPress={hideDebitCardInfo}>
            {strings.linkCard.cardInfoBottomSheet.closeButton}
          </MainButton>
        </BottomSheetContainer>
        <ConfirmationBottomSheet
          bottomSheetProps={{
            isVisible: isUnlinkConfirmationVisible,
            onClose: closeUnlinkConfirmation,
            height: normalize(320),
            closeOnPressMask: false,
          }}
          title={`${linkedDebitCard?.issuer?.payeeName} (${linkedDebitCard?.lastFourDigits})`}
          description={strings.linkCard.unlinkConfirmationBottomSheet.description}
          confirmationButtonText={strings.linkCard.unlinkConfirmationBottomSheet.confirmButtonText}
          confirmationButtonProps={{
            testID: 'unlinkDebitCardButton',
            onPress: handleUnlinkDebitCard,
            variant: 'critical',
            isLoading: isLoadingUnlink,
          }}
          cancelButtonText={strings.linkCard.unlinkConfirmationBottomSheet.cancelButtonText}
          cancelButtonProps={{
            testID: 'unlinkDebitCardCancelButton',
            onPress: cancelUnlinkConfirmation,
            variant: 'secondary',
          }}
        />
      </BottomSheet>
    </>
  );
};

export default LinkedDebitCard;
