import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch } from '_components/atoms';
import { ConfirmationBottomSheet } from '_components/molecules';
import { EVENTS, EVENT_TYPES, NAVIGATION, OverdraftState } from '_constants';
import strings from '_localization';
import { AccountActions, AccountSelectors } from '_store/account';
import { RegisterActions } from '_store/register';
import { normalize } from '_utilities/screen';
import { OptInSwitchBlock } from './OverdraftProtectionToggle.styles';

const OverdraftProtectionToggle = () => {
  const { navigate } = useNavigation();
  const dispatch = useDispatch();
  const externalId = useSelector(AccountSelectors.getExternalId);
  const overdraft = useSelector(AccountSelectors.getOverdraft);
  const overdraftProtectionError = useSelector(AccountSelectors.getOverdraftError);
  const overdraftProtectionOptedIn = overdraft?.state === OverdraftState.OPT_IN;
  const isEligible = overdraft?.state === OverdraftState.OPT_OUT && overdraft?.eligible;

  const [showOptOutLoading, setShowOptOutLoading] = useState(false);
  const [isOptInODBottomSheetVisible, setIsOptInODBottomSheetVisible] = useState(false);
  const [isOptOutODBottomSheetVisible, setIsOptOutODBottomSheetVisible] = useState(false);
  const [isOverdraftEnabled, setIsOverdraftEnabled] = useState(overdraftProtectionOptedIn);

  useEffect(() => {
    setIsOptInODBottomSheetVisible(false);
    setIsOptOutODBottomSheetVisible(false);
  }, [overdraftProtectionError, overdraftProtectionOptedIn]);

  useEffect(() => {
    if (isOptInODBottomSheetVisible) {
      dispatch(
        RegisterActions.trackEvent(
          EVENTS.OVERDRAFT_PROTECTION_OPT_IN_CONFIRMATION_OPENED,
          EVENT_TYPES.TRACK
        )
      );
    }

    if (isOptOutODBottomSheetVisible) {
      dispatch(
        RegisterActions.trackEvent(
          EVENTS.OVERDRAFT_PROTECTION_OPT_OUT_CONFIRMATION_OPENED,
          EVENT_TYPES.TRACK
        )
      );
    }
  }, [dispatch, isOptInODBottomSheetVisible, isOptOutODBottomSheetVisible]);

  const onOverdraftProtectionOptIn = () => {
    onOptInBottomSheetClose();
    if (isEligible) {
      navigate(NAVIGATION.shared.overdraftLegalAgreement);
    } else {
      navigate(NAVIGATION.shared.overdraftSell);
    }
  };

  const onOverdraftProtectionOptOut = () => {
    setShowOptOutLoading(true);
    dispatch(AccountActions.setOverdraftProtectionState(externalId, OverdraftState.OPT_OUT));
  };

  const onOptInBottomSheetClose = () => {
    setIsOptInODBottomSheetVisible(false);
    setIsOverdraftEnabled(overdraftProtectionOptedIn);
  };

  const onOptInCancel = () => {
    onOptInBottomSheetClose();
    dispatch(
      RegisterActions.trackEvent(
        EVENTS.OVERDRAFT_PROTECTION_OPT_IN_CONFIRMATION_CANCELLED,
        EVENT_TYPES.TRACK
      )
    );
  };

  const onOptOutBottomSheetClose = () => {
    setIsOptOutODBottomSheetVisible(false);
    setIsOverdraftEnabled(overdraftProtectionOptedIn);
    setShowOptOutLoading(false);

    if (overdraftProtectionError) {
      dispatch(AccountActions.setOverdraftProtectionError(null));
    }
  };

  const onOptOutCancel = () => {
    onOptOutBottomSheetClose();
    dispatch(
      RegisterActions.trackEvent(
        EVENTS.OVERDRAFT_PROTECTION_OPT_OUT_CONFIRMATION_CANCELLED,
        EVENT_TYPES.TRACK
      )
    );
  };

  const onOverdraftProtectionSwitchChange = (value) => {
    setIsOverdraftEnabled(value);
    setIsOptInODBottomSheetVisible(value);
    setIsOptOutODBottomSheetVisible(!value);
  };

  return (
    <>
      <OptInSwitchBlock>
        <Switch
          value={isOverdraftEnabled}
          onValueChange={onOverdraftProtectionSwitchChange}
          testID="overdraf-protection-switch"
        />
      </OptInSwitchBlock>
      <ConfirmationBottomSheet
        bottomSheetProps={{
          isVisible: isOptInODBottomSheetVisible,
          onClose: onOptInBottomSheetClose,
          closeOnPressMask: false,
          height: normalize(320),
        }}
        title={strings.overdraft.nudge.optedOut.header.title}
        description={strings.overdraft.nudge.optedOut.header.description}
        confirmationButtonText={strings.overdraft.nudge.optedOut.buttonText}
        confirmationButtonProps={{
          accessibilityLabel: 'overdraftProtectionOptInActionButton',
          onPress: onOverdraftProtectionOptIn,
        }}
        cancelButtonText={strings.overdraftProtection.bottomSheet.optIn.secondaryButtonText}
        cancelButtonProps={{
          accessibilityLabel: 'overdraftProtectionOptInBottomSheetCancelButton',
          onPress: onOptInCancel,
          variant: 'secondary',
        }}
      />
      <ConfirmationBottomSheet
        bottomSheetProps={{
          isVisible: isOptOutODBottomSheetVisible,
          onClose: onOptOutBottomSheetClose,
          height: normalize(320),
          closeOnPressMask: false,
        }}
        title={strings.overdraftProtection.bottomSheet.optOut.description}
        confirmationButtonText={strings.overdraftProtection.bottomSheet.optOut.title}
        confirmationButtonProps={{
          accessibilityLabel: 'overdraftProtectionOptOutActionButton',
          onPress: onOverdraftProtectionOptOut,
          variant: 'critical',
          isLoading: showOptOutLoading,
        }}
        cancelButtonText={strings.overdraftProtection.bottomSheet.optOut.secondaryButtonText}
        cancelButtonProps={{
          accessibilityLabel: 'overdraftProtectionOptOutBottomSheetCancelButton',
          onPress: onOptOutCancel,
          variant: 'secondary',
        }}
      />
    </>
  );
};

export default OverdraftProtectionToggle;
