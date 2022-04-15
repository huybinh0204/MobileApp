import { useReduxDevToolsExtension } from '@react-navigation/devtools';
import { NavigationContainer } from '@react-navigation/native';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { LinkCardPage } from '_components/pages';
import { FEATURE_FLAGS, NAVIGATION } from '_constants';
import { useBooleanFeatureFlag, useDeepLinkHandler } from '_hooks';
import {
  AboutScreen,
  AccountInfoScreen,
  AccountTransactionsDetailScreen,
  ActivateCardExpDateScreen,
  ActivateCardScreen,
  AddMoneyScreen,
  ChangePasswordScreen,
  ContactScreen,
  DepositCashScreen,
  DirectDepositFormViewScreen,
  EarlyPaycheckScreen,
  EarlyPaycheckSuccessScreen,
  ForgotPasswordScreen,
  FundChoiceScreen,
  LegalAgreementScreen,
  LinkDebitCardScreen,
  MarketplaceScreen,
  MoneyTransferSuccessScreen,
  OverdraftLegalAgreementScreen,
  OverdraftOptInSuccessScreen,
  OverdraftSellScreen,
  PhoneNumberConfirmationScreen,
  PhoneNumberScreen,
  PolicyTermsDetailScreen,
  PolicyTermsScreen,
  SetDebitCardPinFormScreen,
  SetDebitCardPinInfoScreen,
  SetDebitCardPinSuccessScreen,
  SettingsScreen,
  SignInScreen,
  SignUpAddressScreen,
  SignUpAddressSuggestionScreen,
  SignUpBirthDateScreen,
  SignUpMailScreen,
  SignUpMailVerificationScreen,
  SignUpNameScreen,
  SignUpPasswordScreen,
  SignUpPhoneConfirmationCodeScreen,
  SignUpPhoneScreen,
  SignUpSSNScreen,
  StatementPreviewScreen,
  StatementsScreen,
  TakeOutMoneyScreen,
  UpdateAddressScreen,
  UpdateCityScreen,
  UpdateEmailScreen,
  UserInfoScreen,
  WelcomeScreen,
  WelcomeToKinlyScreen,
} from '_navigators/screens';
import { TabNavigator } from '_navigators/stacks';
import {
  handleReady,
  handleStateChange,
  isReadyRef,
  navigationRef,
} from '_services/NavigationService';
import { AuthenticationSelectors } from '_store/authentication';
import { linking } from '_utilities/DeepLinking';
import DirectPartnerScreen from './screens/DirectPartnerScreen';

const { Navigator, Screen, Group } = createStackNavigator();

const RootNavigator = () => {
  const isLoggedIn = useSelector(AuthenticationSelectors.getIsSignIn);
  const isSessionExpired = useSelector(AuthenticationSelectors.getIsSessionExpired);
  const isUniversalLoginEnabled = useBooleanFeatureFlag(FEATURE_FLAGS.UNIVERSAL_LOGIN);

  const initialRouteName =
    isSessionExpired && !isUniversalLoginEnabled ? NAVIGATION.auth.signIn : NAVIGATION.auth.welcome;

  useEffect(() => {
    return () => {
      isReadyRef.current = false;
    };
  }, []);

  useDeepLinkHandler();
  useReduxDevToolsExtension(navigationRef);

  return (
    <>
      <NavigationContainer
        linking={linking}
        onReady={handleReady}
        onStateChange={handleStateChange}
        ref={navigationRef}
      >
        <Navigator screenOptions={{ headerShown: false }} initialRouteName={initialRouteName}>
          {isLoggedIn ? (
            <Group screenOptions={{ headerShown: false }}>
              <Screen name={NAVIGATION.shared.main} component={TabNavigator} />
              <Screen name={NAVIGATION.accounts.linkCard} component={LinkCardPage} />
              <Screen name={NAVIGATION.accounts.takeOutMoney} component={TakeOutMoneyScreen} />
              <Screen
                name={NAVIGATION.accounts.linkDebitCardPage}
                component={LinkDebitCardScreen}
              />
              <Screen
                name={NAVIGATION.accounts.transactions}
                component={AccountTransactionsDetailScreen}
              />
              <Screen name={NAVIGATION.card.activateCard} component={ActivateCardScreen} />
              <Screen name={NAVIGATION.card.securityCheck} component={ActivateCardExpDateScreen} />
              <Screen
                name={NAVIGATION.card.setDebitCardPinInfo}
                component={SetDebitCardPinInfoScreen}
                options={({ route: { params } }) => ({
                  gestureEnabled: params.isChangePinVariant,
                })}
              />
              <Screen
                name={NAVIGATION.card.setDebitCardPinForm}
                component={SetDebitCardPinFormScreen}
              />
              <Screen
                name={NAVIGATION.card.setDebitCardPinSuccess}
                component={SetDebitCardPinSuccessScreen}
                options={{ gestureEnabled: false }}
              />
              <Screen
                name={NAVIGATION.settings.main}
                component={SettingsScreen}
                options={{
                  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                  gestureDirection: 'horizontal-inverted',
                }}
              />
              <Screen name={NAVIGATION.settings.contact} component={ContactScreen} />
              <Screen name={NAVIGATION.settings.userInfo} component={UserInfoScreen} />
              <Screen name={NAVIGATION.settings.accountInfo} component={AccountInfoScreen} />
              <Screen name={NAVIGATION.settings.statements} component={StatementsScreen} />
              <Screen
                name={NAVIGATION.settings.statementDetails}
                component={StatementPreviewScreen}
              />
              <Screen name={NAVIGATION.settings.accountPolicy} component={PolicyTermsScreen} />
              <Screen
                name={NAVIGATION.settings.accountPolicyDetails}
                component={PolicyTermsDetailScreen}
              />
              <Screen name={NAVIGATION.settings.changePassword} component={ChangePasswordScreen} />
              <Screen name={NAVIGATION.settings.about} component={AboutScreen} />
              <Screen name={NAVIGATION.settings.updateEmail} component={UpdateEmailScreen} />
              <Screen name={NAVIGATION.settings.updateAddress} component={UpdateAddressScreen} />
              <Screen name={NAVIGATION.settings.updateCity} component={UpdateCityScreen} />
              <Screen name={NAVIGATION.settings.marketplace} component={MarketplaceScreen} />
              <Screen name={NAVIGATION.shared.overdraftSell} component={OverdraftSellScreen} />
              <Screen
                name={NAVIGATION.shared.overdraftLegalAgreement}
                component={OverdraftLegalAgreementScreen}
              />
              <Screen
                name={NAVIGATION.shared.overdraftOptInSuccess}
                component={OverdraftOptInSuccessScreen}
              />
              <Screen name={NAVIGATION.shared.phoneNumber} component={PhoneNumberScreen} />
              <Screen
                name={NAVIGATION.shared.phoneNumberConfirmation}
                component={PhoneNumberConfirmationScreen}
              />
              <Screen name={NAVIGATION.marketplace.directPartner} component={DirectPartnerScreen} />
            </Group>
          ) : (
            <Group screenOptions={{ headerShown: false }}>
              <Screen name={NAVIGATION.auth.welcome} component={WelcomeScreen} />
              <Screen name={NAVIGATION.auth.signIn} component={SignInScreen} />
              <Screen name={NAVIGATION.auth.forgotPassword} component={ForgotPasswordScreen} />
              <Screen name={NAVIGATION.auth.signUpMail} component={SignUpMailScreen} />
              <Screen
                name={NAVIGATION.auth.signUpMailVerification}
                component={SignUpMailVerificationScreen}
                options={{ gestureEnabled: false }}
              />
              <Screen name={NAVIGATION.auth.signUpPassword} component={SignUpPasswordScreen} />
              <Screen
                name={NAVIGATION.auth.signUpName}
                component={SignUpNameScreen}
                options={{ gestureEnabled: false }}
              />
              <Screen name={NAVIGATION.auth.signUpBirthDate} component={SignUpBirthDateScreen} />
              <Screen name={NAVIGATION.auth.signUpPhone} component={SignUpPhoneScreen} />
              <Screen
                name={NAVIGATION.auth.signUpAddressSuggestion}
                component={SignUpAddressSuggestionScreen}
              />
              <Screen name={NAVIGATION.auth.signUpAddress} component={SignUpAddressScreen} />
              <Screen
                name={NAVIGATION.auth.signUpPhoneConfirmation}
                component={SignUpPhoneConfirmationCodeScreen}
              />
              <Screen name={NAVIGATION.auth.signUpSSN} component={SignUpSSNScreen} />
              <Screen
                name={NAVIGATION.auth.legalAgreement}
                component={LegalAgreementScreen}
                options={{ gestureEnabled: false }}
              />
              <Screen
                name={NAVIGATION.auth.welcomeToKinly}
                component={WelcomeToKinlyScreen}
                options={{ gestureEnabled: false }}
              />
              <Screen name={NAVIGATION.auth.fundChoice} component={FundChoiceScreen} />
              <Screen name={NAVIGATION.auth.depositCash} component={DepositCashScreen} />
            </Group>
          )}
          <Group
            screenOptions={{ headerShown: false }}
            navigationKey={
              isLoggedIn ? NAVIGATION.navigationKey.user : NAVIGATION.navigationKey.guest
            }
          >
            <Screen name={NAVIGATION.shared.addMoney} component={AddMoneyScreen} />
            <Screen name={NAVIGATION.shared.earlyPaycheck} component={EarlyPaycheckScreen} />
            <Screen
              name={NAVIGATION.shared.earlyPaycheckSuccess}
              component={EarlyPaycheckSuccessScreen}
            />
            <Screen
              name={NAVIGATION.shared.directDepositFormView}
              component={DirectDepositFormViewScreen}
            />
            <Screen
              name={NAVIGATION.shared.moneyTransferSuccess}
              component={MoneyTransferSuccessScreen}
              options={{ gestureEnabled: false }}
            />
          </Group>
        </Navigator>
      </NavigationContainer>
    </>
  );
};

export default RootNavigator;
