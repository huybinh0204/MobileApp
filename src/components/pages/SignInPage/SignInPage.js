import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Keyboard } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { object, string } from 'yup';
import { Form, FormInput, FormSubmitButton, Toast } from '_components/atoms';
import { MainScreenLayout } from '_components/organisms';
import { FEATURE_FLAGS, ICONS, NAVIGATION, TOAST_TYPES } from '_constants';
import { useBooleanFeatureFlag } from '_hooks';
import strings from '_localization';
import { AuthenticationActions, AuthenticationSelectors } from '_store/authentication';
import { ButtonContainer, FormContainer, StyledMainButton } from './SignInPage.styles';

const validationSchema = object().shape({
  email: string().required(),
  password: string().required().min(8),
});

const defaultValues = {
  email: 'dev_ken@aheadmoney.com',
  password: 'Ahead123!',
};

const SignInPage = () => {
  const { navigate, canGoBack } = useNavigation();
  const dispatch = useDispatch();
  const isEmailVerificationEnabled = useBooleanFeatureFlag(FEATURE_FLAGS.EMAIL_VERIFICATION);

  const isLoading = useSelector(AuthenticationSelectors.getIsLoading);
  const isSessionExpired = useSelector(AuthenticationSelectors.getIsSessionExpired);
  const authenticationError = useSelector(AuthenticationSelectors.getAuthenticationError);

  const [showButtons, setShowButtons] = useState(true);
  const [isHiddenPassword, setIsHiddenPassword] = useState(true);
  const formMethods = useForm({ defaultValues, resolver: yupResolver(validationSchema) });

  const emailValue = formMethods.watch('email');
  const passwordValue = formMethods.watch('password');

  const togglePasswordVisibility = () => {
    setIsHiddenPassword((currentValue) => !currentValue);
  };

  const toggleButtonsVisibility = () => {
    setShowButtons((prevState) => !prevState);
  };

  const handleSignUpClick = () => {
    navigate(NAVIGATION.auth.signUpMail);
  };

  const handleForgotPassword = () => {
    navigate(NAVIGATION.auth.forgotPassword);
  };

  const handleSubmit = ({ email, password }) => {
    dispatch(AuthenticationActions.signIn({ email, password, isEmailVerificationEnabled }));
    Keyboard.dismiss();
  };

  const closeAuthenticationErrorToast = () => {
    dispatch(AuthenticationActions.setAuthenticationError(null));
  };

  const closeSessionExpiredToast = () => {
    dispatch(AuthenticationActions.setIsSessionExpired(false));
  };

  return (
    <MainScreenLayout showBackButton={canGoBack()} showMenuButton={false} testID="SignInPage">
      <FormContainer>
        <Form formMethods={formMethods}>
          <FormInput
            autoCapitalize="none"
            autoComplete="email"
            keyboardType="email-address"
            name="email"
            onBlur={toggleButtonsVisibility}
            onFocus={toggleButtonsVisibility}
            placeholder={strings.signIn.user_name}
            textContentType="emailAddress"
            testID="email"
          />
          <FormInput
            autoCapitalize="none"
            autoComplete="password"
            icon={isHiddenPassword ? ICONS.showPassword : ICONS.hidePassword}
            name="password"
            onBlur={toggleButtonsVisibility}
            onFocus={toggleButtonsVisibility}
            onIconPress={togglePasswordVisibility}
            placeholder={strings.signIn.password}
            secureTextEntry={isHiddenPassword}
            textContentType="password"
            testID="password"
          />
          <ButtonContainer>
            {showButtons && (
              <>
                <StyledMainButton onPress={handleSignUpClick} testID="signUpLink" variant="link">
                  {strings.signIn.signUp}
                </StyledMainButton>
                <StyledMainButton
                  onPress={handleForgotPassword}
                  testID="forgotButton"
                  variant="secondary"
                >
                  {strings.signIn.forgot_password}
                </StyledMainButton>
              </>
            )}
            <FormSubmitButton
              disabled={emailValue === '' || passwordValue === ''}
              isLoading={isLoading}
              onSubmit={handleSubmit}
              testID="signIn"
            >
              {strings.signIn.button_text}
            </FormSubmitButton>
          </ButtonContainer>
        </Form>
      </FormContainer>
      <Toast
        type={TOAST_TYPES.ERROR}
        onClose={closeAuthenticationErrorToast}
        testID="authenticationErrorToast"
        header={authenticationError?.title}
        content={authenticationError?.description}
        show={authenticationError !== null}
      />
      <Toast
        type={TOAST_TYPES.ERROR}
        onClose={closeSessionExpiredToast}
        testID="sessionExpiredToast"
        header={strings.signIn.expiredSession.title}
        content={strings.signIn.expiredSession.description}
        show={isSessionExpired}
      />
    </MainScreenLayout>
  );
};

export default SignInPage;
