import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useMemo, useState } from 'react';
import ENV from 'react-native-config';
import { useDispatch, useSelector } from 'react-redux';
import { BottomSheet, IconSvg } from '_components/atoms';
import { PressableList } from '_components/molecules';
import { MainScreenLayout } from '_components/organisms';
import { EVENTS, EVENT_TYPES, FEATURE_FLAGS, ICONS, LINK_TYPES, NAVIGATION } from '_constants';
import { useBooleanFeatureFlag } from '_hooks';
import strings from '_localization/index';
import { AccountActions, AccountSelectors } from '_store/account';
import { RegisterActions } from '_store/register';
import { openExternalLink } from '_utilities/ExternalLinks';
import { normalize } from '_utilities/screen';
import {
  BottomSheetButton,
  BottomSheetContainer,
  BottomSheetContent,
  BottomSheetTitle,
  DebitCardBanner,
  DebitCardDisclaimer,
  listStyles,
  SupportNumberLink,
} from './CardTabPage.styles';

const itemIcon = (icon) => (props) => <IconSvg icon={icon} {...props} />;

const CardTabPage = () => {
  const dispatch = useDispatch();
  const { navigate } = useNavigation();

  const accountExternalId = useSelector(AccountSelectors.getExternalId);
  const hasActiveDebitCards = useSelector(AccountSelectors.hasActiveDebitCards);
  const hasDebitCardWaitingToActivate = useSelector(AccountSelectors.hasDebitCardWaitingToActivate);
  const isChangePinEnabled = useBooleanFeatureFlag(FEATURE_FLAGS.CHANGE_PIN);

  const [bottomSheet, setBottomSheet] = useState({ isVisible: false, title: '', content: '' });

  const pressableItems = useMemo(() => {
    return [
      {
        hide: !hasDebitCardWaitingToActivate,
        testID: 'ActivateCard',
        title: strings.cardTab_list_activate_card,
        leftItem: itemIcon(ICONS.activatedCard),
        rightItem: itemIcon(ICONS.arrowRight),
        onPress() {
          navigate(NAVIGATION.card.activateCard);
        },
      },
      {
        hide: !hasActiveDebitCards,
        testID: 'ChangePIN',
        title: strings.cardTab_list_change_pin,
        leftItem: itemIcon(ICONS.changePin),
        rightItem: itemIcon(ICONS.arrowRight),
        onPress() {
          isChangePinEnabled
            ? navigate(NAVIGATION.card.setDebitCardPinInfo, { isChangePinVariant: true })
            : setBottomSheet({
                isVisible: true,
                title: strings.card.changePinInfo.header,
                content: strings.card.changePinInfo.changePinMessage,
              });
        },
      },
      {
        title: strings.cardTab_list_lock_card,
        leftItem: itemIcon(ICONS.lockCard),
        rightItem: itemIcon(ICONS.arrowRight),
        onPress() {
          setBottomSheet({
            isVisible: true,
            title: strings.cardTab_lockCard_title,
            content: strings.cardTab_lockCard_content,
          });
          dispatch(RegisterActions.trackEvent(EVENTS.LOCK_CARD_OPENED, EVENT_TYPES.TRACK));
        },
      },
      {
        title: strings.cardTab_list_replace_card,
        leftItem: itemIcon(ICONS.replaceCard),
        rightItem: itemIcon(ICONS.arrowRight),
        onPress() {
          setBottomSheet({
            isVisible: true,
            title: strings.cardTab_replaceCard_title,
            content: strings.cardTab_replaceCard_content,
          });
          dispatch(RegisterActions.trackEvent(EVENTS.REPLACE_CARD_OPENED, EVENT_TYPES.TRACK));
        },
      },
      {
        title: strings.cardTab_list_find_atm,
        leftItem: itemIcon(ICONS.atm),
        rightItem: itemIcon(ICONS.arrowRight),
        async onPress() {
          await openExternalLink(ENV.FIND_ATM_URI);
          dispatch(RegisterActions.trackEvent(EVENTS.FIND_ATM_OPENED, EVENT_TYPES.TRACK));
        },
      },
      {
        title: strings.cardTab_list_find_place_to_deposit_cash,
        leftItem: itemIcon(ICONS.findDepositCash),
        rightItem: itemIcon(ICONS.arrowRight),
        async onPress() {
          await openExternalLink(ENV.FIND_PLACE_TO_DEPOSIT_CASH_URI);
          dispatch(
            RegisterActions.trackEvent(EVENTS.FIND_PLACE_TO_DEPOSIT_CASH_OPENED, EVENT_TYPES.TRACK)
          );
        },
      },
    ];
  }, [dispatch, navigate, hasActiveDebitCards, hasDebitCardWaitingToActivate, isChangePinEnabled]);

  const closeBottomSheet = () => {
    setBottomSheet({ ...bottomSheet, isVisible: false });
  };

  const fetchData = useCallback(() => {
    dispatch(AccountActions.fetchKinlyDebitCards(accountExternalId));
  }, [accountExternalId, dispatch]);

  useFocusEffect(fetchData);

  return (
    <MainScreenLayout testID="CardTabPage" title={strings.cardTab_title}>
      <DebitCardBanner
        icon={ICONS.debitCardBanner}
        height={normalize(150)}
        width={normalize(230)}
        testID="CardBanner"
      />
      <DebitCardDisclaimer>{strings.cardTab_disclaimer}</DebitCardDisclaimer>
      <PressableList
        contentContainerStyle={listStyles}
        items={pressableItems}
        testID="CardTabList"
      />
      <BottomSheet
        closeOnDragDown
        isVisible={bottomSheet.isVisible}
        onClose={closeBottomSheet}
        height={normalize(280)}
      >
        <BottomSheetContainer>
          <BottomSheetTitle>{bottomSheet.title}</BottomSheetTitle>
          <BottomSheetContent>{bottomSheet.content}</BottomSheetContent>
          <SupportNumberLink href={strings.kinly_support_number} type={LINK_TYPES.PHONE}>
            {strings.kinly_support_number}
          </SupportNumberLink>
          <BottomSheetButton onPress={closeBottomSheet}>
            {strings.cardTab_bottomSheet_continue}
          </BottomSheetButton>
        </BottomSheetContainer>
      </BottomSheet>
    </MainScreenLayout>
  );
};

export default CardTabPage;
