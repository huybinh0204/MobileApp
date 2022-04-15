import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Keyboard } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { object, string } from 'yup';
import { Form, FormInput, Toast } from '_components/atoms';
import { SecondaryScreenLayout } from '_components/organisms';
import { TOAST_TYPES } from '_constants';
import strings from '_localization';
import { AuthenticationActions, AuthenticationSelectors } from '_store/authentication';
import { Container, FormInputContainer, Legend, SubmitButton } from './ForgotPasswordPage.styles';

const schema = object().shape({
  email: string().email().required(),
});

const defaultValues = {
  email: '',
};

const ForgotPasswordPage = () => {
  const dispatch = useDispatch();
  const error = useSelector(AuthenticationSelectors.getResetPasswordError);
  const emailSent = useSelector(AuthenticationSelectors.getResetPasswordSuccess);
  const isLoading = useSelector(AuthenticationSelectors.getIsLoadingResetPassword);

  const formMethods = useForm({ defaultValues, resolver: yupResolver(schema) });
  const { reset, watch } = formMethods;

  const emailValue = watch('email');

  const toastHeader = error
    ? strings.forgotPassword.errorTitle
    : strings.forgotPassword.successTitle;

  const toastContent = error
    ? strings.forgotPassword.errorMessage
    : strings.forgotPassword.successMessage;

  const type =
    (error && TOAST_TYPES.ERROR) || (emailSent && TOAST_TYPES.SUCCESS) || TOAST_TYPES.ERROR;

  const handleSubmit = ({ email }) => {
    dispatch(AuthenticationActions.resetPassword(email));
    Keyboard.dismiss();
  };

  const handleCloseToast = () => {
    reset(defaultValues);
    dispatch(AuthenticationActions.setResetPasswordError(false));
    dispatch(AuthenticationActions.setResetPasswordSuccess(false));
  };

  useEffect(() => {
    if (emailSent) {
      reset(defaultValues);
    }
  }, [emailSent, reset]);

  return (
    <SecondaryScreenLayout testID="ForgotPasswordPage" title={strings.forgotPassword.title}>
      <Container>
        <Legend>{strings.forgotPassword.paragraph}</Legend>
        <Form formMethods={formMethods}>
          <FormInputContainer>
            <FormInput
              autoCapitalize="none"
              autoComplete="email"
              keyboardType="email-address"
              name="email"
              placeholder={strings.forgotPassword.placeholder}
              testID="emailInput"
              textContentType="emailAddress"
            />
          </FormInputContainer>
          <SubmitButton
            disabled={emailValue === ''}
            isLoading={isLoading}
            onSubmit={handleSubmit}
            testID="resetPasswordButton"
          >
            {strings.forgotPassword.submit}
          </SubmitButton>
        </Form>
      </Container>
      <Toast
        type={type}
        onClose={handleCloseToast}
        testID="ResetPasswordToast"
        header={toastHeader}
        content={toastContent}
        show={error || emailSent}
      />
    </SecondaryScreenLayout>
  );
};

export default ForgotPasswordPage;
