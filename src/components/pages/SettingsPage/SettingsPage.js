import { useTheme } from '@emotion/react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useMemo } from 'react';
import ENV from 'react-native-config';
import { useDispatch, useSelector } from 'react-redux';
import { IconSvg } from '_components/atoms';
import { OverdraftProtectionToggle } from '_components/organisms';
import { EVENTS, EVENT_TYPES, FEATURE_FLAGS, ICONS, NAVIGATION } from '_constants';
import { useBooleanFeatureFlag } from '_hooks';
import strings from '_localization/index';
import { AuthenticationActions } from '_store/authentication';
import { CustomerActions, CustomerSelectors } from '_store/customer';
import { RegisterActions } from '_store/register';
import { openExternalLink } from '_utilities/ExternalLinks';
import { normalize } from '_utilities/screen';
import {
  CloseButton,
  Container,
  SectionHeader,
  SectionList,
  Separator,
  SettingsOption,
  UserBlock,
  UserTitle,
} from './SettingsPage.styles';

const itemIcon = (icon) => (props) => <IconSvg icon={icon} {...props} />;

const SettingsPage = () => {
  const dispatch = useDispatch();
  const { colors } = useTheme();
  const { navigate, goBack } = useNavigation();

  const customer = useSelector(CustomerSelectors.getCustomer);
  const customerExternalId = useSelector(CustomerSelectors.getExternalId);

  const isFAQEnabled = useBooleanFeatureFlag(FEATURE_FLAGS.FAQ);
  const isUniversalLoginEnabled = useBooleanFeatureFlag(FEATURE_FLAGS.UNIVERSAL_LOGIN);

  const fetchCustomerData = useCallback(() => {
    if (customerExternalId) {
      dispatch(CustomerActions.fetchCustomer(customerExternalId));
    }
  }, [dispatch, customerExternalId]);

  useFocusEffect(fetchCustomerData);

  const items = useMemo(() => {
    return [
      {
        title: strings.settings.account,
        data: [
          {
            title: strings.settings.user_info,
            testID: 'settingsUserInfoOption',
            leftItem: itemIcon(ICONS.userCircled),
            rightItem: itemIcon(ICONS.arrowRight),
            onPress() {
              navigate(NAVIGATION.settings.userInfo);
            },
          },
          {
            title: strings.settings.account_info,
            testID: 'settingsAccountInfoOption',
            leftItem: itemIcon(ICONS.accountInfoSettings),
            rightItem: itemIcon(ICONS.arrowRight),
            onPress() {
              navigate(NAVIGATION.settings.accountInfo);
            },
          },
          {
            title: strings.settings.change_password,
            testID: 'settingsChangePasswordOption',
            leftItem: itemIcon(ICONS.keyIcon),
            rightItem: itemIcon(ICONS.arrowRight),
            onPress() {
              navigate(NAVIGATION.settings.changePassword);
            },
          },
          {
            title: strings.settings.direct_deposit,
            testID: 'settingsDirectDepositOption',
            leftItem: itemIcon(ICONS.directDepositSettings),
            rightItem: itemIcon(ICONS.arrowRight),
            onPress() {
              navigate(NAVIGATION.shared.earlyPaycheck);
            },
          },
          {
            title: strings.settings.depositCash,
            testID: 'settingsDepositCashOption',
            leftItem: itemIcon(ICONS.atm),
            rightItem: itemIcon(ICONS.arrowRight),
            async onPress() {
              await openExternalLink(ENV.FIND_PLACE_TO_DEPOSIT_CASH_URI);
              RegisterActions.trackEvent(
                EVENTS.FIND_PLACE_TO_DEPOSIT_CASH_OPENED,
                EVENT_TYPES.TRACK
              );
            },
          },
          {
            title: strings.settings.findATM,
            testID: 'settingsFindATMOption',
            leftItem: itemIcon(ICONS.findATMOption),
            rightItem: itemIcon(ICONS.arrowRight),
            async onPress() {
              await openExternalLink(ENV.FIND_ATM_URI);
              dispatch(RegisterActions.trackEvent(EVENTS.FIND_ATM_OPENED, EVENT_TYPES.TRACK));
            },
          },
        ],
      },
      {
        title: strings.settings.kinlyMarketplace,
        data: [
          {
            title: strings.settings.shopDeals,
            testID: 'settingsUserInfoOption',
            leftItem: itemIcon(ICONS.shopDeals),
            rightItem: itemIcon(ICONS.arrowRight),
            onPress() {
              navigate(NAVIGATION.settings.marketplace);
            },
          },
        ],
      },
      {
        title: strings.settings.overdraftProtection,
        data: [
          {
            title: strings.settings.overdraftProtection,
            testID: 'settingsOverdraftProtectionToggle',
            leftItem: itemIcon(ICONS.overdraftProtectionSettings),
            rightItem: () => <OverdraftProtectionToggle />,
          },
        ],
      },
      {
        title: strings.settings.documents,
        data: [
          {
            title: strings.settings.statements,
            testID: 'settingsStatementsOption',
            leftItem: itemIcon(ICONS.statements),
            rightItem: itemIcon(ICONS.arrowRight),
            onPress() {
              navigate(NAVIGATION.settings.statements);
            },
          },
          {
            title: strings.settings.account_policy,
            testID: 'accountPolicyOption',
            leftItem: itemIcon(ICONS.termsSettings),
            rightItem: itemIcon(ICONS.arrowRight),
            onPress() {
              navigate(NAVIGATION.settings.accountPolicy);
            },
          },
        ],
      },
      {
        title: strings.settings.help,
        data: [
          {
            title: strings.settings.contact,
            testID: 'settingsContactOption',
            leftItem: itemIcon(ICONS.contactSetting),
            rightItem: itemIcon(ICONS.arrowRight),
            onPress() {
              navigate(NAVIGATION.settings.contact);
            },
          },
          {
            hide: !isFAQEnabled,
            title: strings.settings.faq,
            testID: 'settingsFaqOption',
            leftItem: itemIcon(ICONS.faqSettings),
            rightItem: itemIcon(ICONS.arrowRight),
            async onPress() {
              dispatch(RegisterActions.trackEvent(EVENTS.FAQ_SCREEN_OPENED, EVENT_TYPES.SCREEN));
              await openExternalLink(strings.ahead_faq_page);
            },
          },
          {
            title: strings.settings.about,
            testID: 'settingsAboutOption',
            leftItem: itemIcon(ICONS.aboutSettings),
            rightItem: itemIcon(ICONS.arrowRight),
            onPress() {
              navigate(NAVIGATION.settings.about);
            },
          },
        ],
      },
      {
        data: [
          {
            title: strings.settings.logout,
            testID: 'logoutOption',
            titleStyles: {
              color: colors.alpha500,
            },
            onPress() {
              dispatch(AuthenticationActions.logout(isUniversalLoginEnabled));
            },
          },
        ],
      },
    ];
  }, [colors.alpha500, dispatch, isFAQEnabled, isUniversalLoginEnabled, navigate]);

  return (
    <Container testID="SettingsPage">
      <UserBlock>
        <CloseButton onPress={goBack}>
          <IconSvg icon={ICONS.close} width={normalize(24)} height={normalize(24)} />
        </CloseButton>
        <UserTitle>{`${strings.settings.hello}, ${customer?.firstName} ${customer?.lastName}!`}</UserTitle>
      </UserBlock>
      <SectionList
        sections={items}
        initialNumToRender={16}
        keyExtractor={(item, index) => item + index}
        renderSectionHeader={({ section: { title } }) =>
          !!title && (
            <SectionHeader isFirstItem={title === strings.settings.account}>{title}</SectionHeader>
          )
        }
        ItemSeparatorComponent={({ leadingItem }) => (leadingItem.hide ? null : <Separator />)}
        stickySectionHeadersEnabled={false}
        renderItem={({ item }) => !item.hide && <SettingsOption {...item} />}
      />
    </Container>
  );
};

export default SettingsPage;
