import { Dynatrace } from '@dynatrace/react-native-plugin';
import React, { useEffect, useRef, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import BottomSheet from 'react-native-raw-bottom-sheet';
import { useDispatch, useSelector } from 'react-redux';
import { MainButton } from '_components/atoms';
import { AddBankAccount, ConfirmationBottomSheet } from '_components/molecules';
import { EVENTS, EVENT_TYPES } from '_constants';
import strings from '_localization';
import { AccountActions, AccountSelectors } from '_store/account';
import { AuthenticationSelectors } from '_store/authentication';
import { RegisterActions } from '_store/register';
import { getPlaidValues } from '_utilities/Plaid';
import { normalize } from '_utilities/screen';
import { BottomSheetContainer, BottomSheetTitle, Header, Remove } from './LinkedAccounts.styles';

const LinkedBankAccount = () => {
  const dispatch = useDispatch();

  const token = useSelector(AccountSelectors.getPlaidLinkToken);
  const externalId = useSelector(AccountSelectors.getExternalId);
  const credentials = useSelector(AuthenticationSelectors.getCredentials);
  const [account] = useSelector(AccountSelectors.getAccountList);
  const [linkedAccount, setLinkedAccount] = useState(null);
  const unlinkError = useSelector(AccountSelectors.getUnlinkAchError);
  const unlinkSuccess = useSelector(AccountSelectors.getUnlinkAchSuccess);
  const isLoadingUnlink = useSelector(AccountSelectors.getIsLoadingUnlinkAchAccount);
  const isLoadingLink = useSelector(AccountSelectors.getIsLoadingLinkAchAccount);

  const bottomSheet = useRef(null);
  const [isUnlinkConfirmationVisible, setIsUnlinkConfirmationVisible] = useState(false);

  useEffect(() => {
    if (externalId) {
      dispatch(AccountActions.getLinkAccounts(externalId));
    }
  }, [dispatch, externalId]);

  useEffect(() => {
    if (credentials?.sub && !token) {
      dispatch(AccountActions.fetchPlaidLinkToken(credentials.sub));
    }
  }, [dispatch, credentials?.sub, token]);

  useEffect(() => {
    if (unlinkError || unlinkSuccess) {
      setIsUnlinkConfirmationVisible(false);
      hideAccountInfo();
    }
  }, [unlinkError, unlinkSuccess]);

  useEffect(() => {
    if (!isLoadingUnlink) {
      if (account) {
        setLinkedAccount(account);
      } else {
        setLinkedAccount(null);
      }
    }
  }, [account, isLoadingUnlink]);

  const onLinkAccountSuccess = (data) => {
    dispatch(AccountActions.linkAchAccount(getPlaidValues(data), externalId));
  };

  const onLinkAccountExit = (data) => {
    if (data.error) {
      Dynatrace.reportError(`Link Bank Account Error: ${JSON.stringify(data)}`, 0);
    }
  };

  const showAccountInfo = () => {
    bottomSheet.current?.open();
  };

  const hideAccountInfo = () => {
    bottomSheet.current?.close();
  };

  const openUnlinkConfirmation = () => {
    setIsUnlinkConfirmationVisible(true);
    dispatch(
      RegisterActions.trackEvent(EVENTS.ACCOUNT_ACH_UNLINK_CONFIRMATION_OPENED, EVENT_TYPES.TRACK)
    );
  };

  const closeUnlinkConfirmation = () => {
    setIsUnlinkConfirmationVisible(false);
  };

  const cancelUnlinkConfirmation = () => {
    closeUnlinkConfirmation();
    dispatch(
      RegisterActions.trackEvent(
        EVENTS.ACCOUNT_ACH_UNLINK_CONFIRMATION_CANCELLED,
        EVENT_TYPES.TRACK
      )
    );
  };

  const handleUnlinkAccount = () => {
    dispatch(AccountActions.unlinkAch(externalId, account?.id));
  };

  return (
    <>
      <AddBankAccount
        token={token}
        linkedAccount={linkedAccount}
        showAccountInfo={showAccountInfo}
        onLinkAccountExit={onLinkAccountExit}
        onLinkAccountSuccess={onLinkAccountSuccess}
        loading={isLoadingLink}
      />
      <BottomSheet closeOnPressMask={false} height={normalize(170)} ref={bottomSheet}>
        <BottomSheetContainer>
          <Header>
            <BottomSheetTitle>{linkedAccount?.name}</BottomSheetTitle>
            <TouchableOpacity
              onPress={openUnlinkConfirmation}
              testID="accountInfoBottomSheetRemove"
            >
              <Remove>{strings.linkAccount.cardInfoBottomSheet.remove}</Remove>
            </TouchableOpacity>
          </Header>
          <MainButton
            accessibilityLabel="accountInfoBottomSheetCloseButton"
            onPress={hideAccountInfo}
          >
            {strings.linkAccount.cardInfoBottomSheet.closeButton}
          </MainButton>
        </BottomSheetContainer>
        <ConfirmationBottomSheet
          bottomSheetProps={{
            isVisible: isUnlinkConfirmationVisible,
            onClose: closeUnlinkConfirmation,
            height: normalize(320),
            closeOnPressMask: false,
          }}
          title={linkedAccount?.name}
          description={strings.linkAccount.unlinkConfirmationBottomSheet.description}
          confirmationButtonText={
            strings.linkAccount.unlinkConfirmationBottomSheet.confirmButtonText
          }
          confirmationButtonProps={{
            accessibilityLabel: 'unlinkAccountButton',
            onPress: handleUnlinkAccount,
            variant: 'critical',
            isLoading: isLoadingUnlink,
          }}
          cancelButtonText={strings.linkAccount.unlinkConfirmationBottomSheet.cancelButtonText}
          cancelButtonProps={{
            accessibilityLabel: 'unlinkAccountCancelButton',
            onPress: cancelUnlinkConfirmation,
            variant: 'secondary',
          }}
        />
      </BottomSheet>
    </>
  );
};

export default LinkedBankAccount;
