import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MainButton } from '_components/atoms';
import { OnboardingScreenLayout } from '_components/organisms';
import { FEATURE_FLAGS, ICONS, NAVIGATION } from '_constants';
import { useBooleanFeatureFlag } from '_hooks';
import strings from '_localization';
import { AccountActions, AccountSelectors } from '_store/account';
import { AuthenticationActions, AuthenticationSelectors } from '_store/authentication';
import { CustomerSelectors } from '_store/customer';
import { FundDirectDepositStoreActions } from '_store/pageStore/fundDirectDepositStore';
import FundChoiceListItem from './FundChoiceListItem';
import { Content, Description, FundSkipNote, Title } from './FundChoicePage.styles';

const FundChoicePage = () => {
  const dispatch = useDispatch();
  const { navigate } = useNavigation();

  const accountExternalId = useSelector(AccountSelectors.getExternalId);
  const customerExternalId = useSelector(CustomerSelectors.getExternalId);
  const credentials = useSelector(AuthenticationSelectors.getCredentials);

  const isAchInEnabled = useBooleanFeatureFlag(FEATURE_FLAGS.ACH_IN, customerExternalId);

  const fundingOptions = useMemo(() => {
    return [
      {
        enabled: true,
        title: strings.signUp.fund.directDeposit,
        leftItem: ICONS.directDeposit,
        rightItem: ICONS.arrowRightActive,
        onPress() {
          navigate(NAVIGATION.shared.earlyPaycheck);
        },
      },
      {
        enabled: isAchInEnabled,
        title: strings.signUp.fund.bankTransfer,
        leftItem: ICONS.bankCircle,
        rightItem: ICONS.arrowRightActive,
        onPress() {
          navigate(NAVIGATION.shared.addMoney);
        },
      },
      {
        enabled: true,
        title: strings.signUp.fund.depositCash,
        leftItem: ICONS.depositCash,
        rightItem: ICONS.arrowRightActive,
        onPress() {
          navigate(NAVIGATION.auth.depositCash);
        },
      },
    ];
  }, [isAchInEnabled, navigate]);

  const handleSkip = () => {
    dispatch(AuthenticationActions.setIsSignIn(true));
  };

  useEffect(() => {
    dispatch(FundDirectDepositStoreActions.fetchRenderData(accountExternalId));
    dispatch(AccountActions.fetchPlaidLinkToken(credentials?.sub));
  }, [dispatch, accountExternalId, credentials?.sub]);

  return (
    <OnboardingScreenLayout step={10} testID="FundChoicePage">
      <Content>
        <Title>{strings.signUp.fund.title}</Title>
        <Description>{strings.signUp.fund.content}</Description>
        {fundingOptions.map((option) =>
          option.enabled ? <FundChoiceListItem item={option} key={option.title} /> : null
        )}
        <FundSkipNote>{strings.signUp.fund.skipNote}</FundSkipNote>
        <MainButton accessibilityLabel="SkipFundChoiceButton" onPress={handleSkip} variant="link">
          {strings.signUp.fund.skipButton}
        </MainButton>
      </Content>
    </OnboardingScreenLayout>
  );
};

export default FundChoicePage;
