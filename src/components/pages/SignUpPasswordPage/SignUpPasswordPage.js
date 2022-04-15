import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Keyboard } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { object, string } from 'yup';
import { Form, FormInput, FormSubmitButton, Toast } from '_components/atoms';
import { OnboardingScreenLayout } from '_components/organisms';
import { FEATURE_FLAGS, ICONS, NAVIGATION, REGEX, TOAST_TYPES } from '_constants';
import { useBooleanFeatureFlag } from '_hooks';
import strings from '_localization';
import { AuthenticationActions, AuthenticationSelectors } from '_store/authentication';
import {
  SignUpPasswordContainer,
  SignUpPasswordOptionsContainer,
  SignUpPasswordTitle,
} from './SignUpPasswordPage.styles';

const validationSchema = object().shape({
  password: string()
    .min(8)
    .required(strings.signUp.requiredField)
    .matches(REGEX.signUpPasswordRegex, strings.signUp.invalidPassword),
});

const defaultValues = {
  password: '',
};

const SignUpPasswordPage = () => {
  const { params } = useRoute();
  const { navigate } = useNavigation();
  const dispatch = useDispatch();
  const isEmailVerificationEnabled = useBooleanFeatureFlag(FEATURE_FLAGS.EMAIL_VERIFICATION);

  const isLoading = useSelector(AuthenticationSelectors.getIsLoading);
  const authentication = useSelector(AuthenticationSelectors.getAuthentication);
  const authenticationError = useSelector(AuthenticationSelectors.getAuthenticationError);

  const [isHiddenPassword, setIsHiddenPassword] = useState(true);
  const formMethods = useForm({ defaultValues, resolver: yupResolver(validationSchema) });

  const passwordValue = formMethods.watch('password');

  const handleCloseToast = () => {
    dispatch(AuthenticationActions.setAuthenticationError(null));
  };

  const handleSubmit = ({ password }) => {
    dispatch(AuthenticationActions.signUp(params.email, password));
    Keyboard.dismiss();
  };

  const togglePasswordVisibility = () => {
    setIsHiddenPassword((currentValue) => !currentValue);
  };

  useEffect(() => {
    if (authentication) {
      if (isEmailVerificationEnabled) {
        navigate(NAVIGATION.auth.signUpMailVerification, { email: params.email });
      } else {
        navigate(NAVIGATION.auth.signUpPhone, { email: params.email });
      }
    }
  }, [authentication, dispatch, isEmailVerificationEnabled, navigate, params.email]);

  return (
    <OnboardingScreenLayout step={2} testID="SignUpAuth0">
      <SignUpPasswordContainer>
        <SignUpPasswordTitle>{strings.signUp.password.title}</SignUpPasswordTitle>
        <Form formMethods={formMethods}>
          <FormInput
            autoCapitalize="none"
            icon={isHiddenPassword ? ICONS.showPassword : ICONS.hidePassword}
            name="password"
            onIconPress={togglePasswordVisibility}
            placeholder={strings.signUp.password.placeholder}
            testID="password"
            secureTextEntry={isHiddenPassword}
            textContentType="newPassword"
          />
          <SignUpPasswordOptionsContainer>
            <FormSubmitButton
              disabled={passwordValue === ''}
              isLoading={isLoading}
              onSubmit={handleSubmit}
              testID="submitAuth0SignUp"
            >
              {strings.signUp.continue}
            </FormSubmitButton>
          </SignUpPasswordOptionsContainer>
        </Form>
      </SignUpPasswordContainer>
      <Toast
        content={authenticationError?.description}
        header={authenticationError?.title}
        onClose={handleCloseToast}
        show={authenticationError !== null}
        testID="createAuth0AccountToast"
        type={TOAST_TYPES.ERROR}
      />
    </OnboardingScreenLayout>
  );
};

export default SignUpPasswordPage;
