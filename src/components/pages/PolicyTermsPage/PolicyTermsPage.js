import { useNavigation } from '@react-navigation/native';
import React, { useRef } from 'react';
import { IconSvg } from '_components/atoms';
import { PressableList } from '_components/molecules';
import { SecondaryHeader } from '_components/organisms';
import { ICONS, NAVIGATION } from '_constants';
import strings from '_localization/index';
import { Container, listStyles } from './PolicyTermsPage.styles';

const arrowIcon = (props) => <IconSvg icon={ICONS.arrowRight} {...props} />;

const PolicyTermsPage = () => {
  const { navigate } = useNavigation();

  const { current: items } = useRef([
    {
      title: strings.settings.policyTerms.depositAccount.title,
      rightItem: arrowIcon,
      testID: 'PolicyDepositAccountAgreementOption',
      onPress: () => {
        navigate(NAVIGATION.settings.accountPolicyDetails, {
          url: strings.settings.policyTerms.depositAccount.url,
        });
      },
    },
    {
      title: strings.settings.policyTerms.electronicCommunication.title,
      rightItem: arrowIcon,
      testID: 'PolicyDepositAccountAgreementOption',
      onPress: () => {
        navigate(NAVIGATION.settings.accountPolicyDetails, {
          url: strings.settings.policyTerms.electronicCommunication.url,
        });
      },
    },
    {
      title: strings.settings.policyTerms.privacyPolicy.title,
      rightItem: arrowIcon,
      testID: 'PolicyDepositAccountAgreementOption',
      onPress: () => {
        navigate(NAVIGATION.settings.accountPolicyDetails, {
          url: strings.settings.policyTerms.privacyPolicy.url,
        });
      },
    },
    {
      title: strings.settings.policyTerms.kinlyUser.title,
      rightItem: arrowIcon,
      testID: 'PolicyDepositAccountAgreementOption',
      onPress: () => {
        navigate(NAVIGATION.settings.accountPolicyDetails, {
          url: strings.settings.policyTerms.kinlyUser.url,
        });
      },
    },
    {
      title: strings.settings.policyTerms.overdraft.title,
      rightItem: arrowIcon,
      testID: 'PolicyDepositAccountAgreementOption',
      onPress: () => {
        navigate(NAVIGATION.settings.accountPolicyDetails, {
          url: strings.settings.policyTerms.overdraft.url,
        });
      },
    },
    {
      title: strings.settings.policyTerms.bankPrivacy.title,
      rightItem: arrowIcon,
      testID: 'PolicyDepositAccountAgreementOption',
      onPress: () => {
        navigate(NAVIGATION.settings.accountPolicyDetails, {
          url: strings.settings.policyTerms.bankPrivacy.url,
        });
      },
    },
  ]);

  return (
    <Container testID="PolicyTermsPage">
      <SecondaryHeader title={strings.settings.account_policy} />
      <PressableList items={items} contentContainerStyle={listStyles} />
    </Container>
  );
};

export default PolicyTermsPage;
