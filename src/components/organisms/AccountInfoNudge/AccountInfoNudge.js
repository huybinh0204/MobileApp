import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef } from 'react';
import { TouchableOpacity } from 'react-native';
import BottomSheet from 'react-native-raw-bottom-sheet';
import { useDispatch, useSelector } from 'react-redux';
import { AccountNumber, IconSvg, MainButton } from '_components/atoms';
import { ListItem } from '_components/molecules';
import { COLORS, FEATURE_FLAGS, ICONS, NAVIGATION } from '_constants';
import { useBooleanFeatureFlag } from '_hooks';
import strings from '_localization';
import { AccountActions, AccountSelectors } from '_store/account';
import { CustomerSelectors } from '_store/customer';
import {
  FundDirectDepositStoreActions,
  FundDirectDepositStoreSelectors,
} from '_store/pageStore/fundDirectDepositStore';
import { normalize } from '_utilities/screen';
import {
  BottomSheetButton,
  ListItemDivider,
  MoveMoneyBottomSheetContainer,
  MoveMoneyBottomSheetTitle,
  NudgeCard,
  SecondaryText,
} from './AccountInfoNudge.styles';

const AccountInfoNudge = () => {
  const dispatch = useDispatch();
  const { navigate } = useNavigation();

  const externalId = useSelector(AccountSelectors.getExternalId);
  const customerExternalId = useSelector(CustomerSelectors.getExternalId);
  const isPhoneVerified = useSelector(CustomerSelectors.getVerificationStatus);
  const { accountNumber, routingNumber } = useSelector(
    FundDirectDepositStoreSelectors.getRenderData
  );

  const isAchInEnabled = useBooleanFeatureFlag(FEATURE_FLAGS.ACH_IN, customerExternalId);

  useEffect(() => {
    if (externalId && (!accountNumber || !routingNumber)) {
      dispatch(FundDirectDepositStoreActions.fetchRenderData(externalId));
    }
  }, [dispatch, accountNumber, routingNumber, externalId]);

  const modal = useRef(null);

  const goToTakeOutMoney = () => {
    modal.current?.close();

    if (isPhoneVerified) {
      navigate(NAVIGATION.accounts.takeOutMoney);
    } else {
      navigate(NAVIGATION.shared.phoneNumber, { target: NAVIGATION.accounts.takeOutMoney });
    }
  };

  const goToAddMoney = () => {
    modal.current?.close();

    if (isPhoneVerified) {
      navigate(NAVIGATION.shared.addMoney);
      dispatch(AccountActions.setLinkAchAccountSuccess(false));
    } else {
      navigate(NAVIGATION.shared.phoneNumber, { target: NAVIGATION.shared.addMoney });
    }
  };

  const goToKinlyAccount = () => {
    navigate(NAVIGATION.settings.accountInfo);
  };

  return (
    <>
      <NudgeCard>
        <AccountNumber onPressAccount={goToKinlyAccount} />
        <MainButton onPress={() => modal.current?.open()} testID="AccountInfoTransferFunds">
          {strings.transferMoney.transferFunds}
        </MainButton>
      </NudgeCard>
      <BottomSheet closeOnPressMask height={normalize(350)} ref={modal}>
        <MoveMoneyBottomSheetContainer>
          <MoveMoneyBottomSheetTitle>{strings.transferMoney.title}</MoveMoneyBottomSheetTitle>
          <SecondaryText disabled={!isAchInEnabled}>{strings.transferMoney.subTitle}</SecondaryText>
          <TouchableOpacity onPress={goToAddMoney} testID="AddMoney" disabled={!isAchInEnabled}>
            <ListItem
              icon={isAchInEnabled ? ICONS.finances : ICONS.financesInactive}
              title={strings.transferMoney.addMoney}
              color={isAchInEnabled ? COLORS.alpha500 : COLORS.beta500}
              subtitle={isAchInEnabled ? null : strings.transferMoney.addMoneyDisclaimer}
              disabled={!isAchInEnabled}
            >
              <IconSvg
                icon={isAchInEnabled ? ICONS.arrowRightActive : ICONS.arrowRightInactive}
                height={normalize(25)}
                width={normalize(25)}
              />
            </ListItem>
          </TouchableOpacity>
          <ListItemDivider />
          <TouchableOpacity onPress={goToTakeOutMoney} testID="TakeOutMoney">
            <ListItem icon={ICONS.atm} title={strings.transferMoney.takeOutMoney}>
              <IconSvg icon={ICONS.arrowRightActive} height={normalize(25)} width={normalize(25)} />
            </ListItem>
          </TouchableOpacity>
          <BottomSheetButton
            onPress={() => modal.current?.close()}
            testID="transferMoneyBottomSheetCancelButton"
          >
            {strings.transferMoney.cancel}
          </BottomSheetButton>
        </MoveMoneyBottomSheetContainer>
      </BottomSheet>
    </>
  );
};

export default AccountInfoNudge;
