import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MainButton, Toast } from '_components/atoms';
import { SecondaryScreenLayout } from '_components/organisms';
import { ICONS, TOAST_TYPES } from '_constants';
import strings from '_localization';
import { AuthenticationActions, AuthenticationSelectors } from '_store/authentication';
import { CustomerSelectors } from '_store/customer';
import { normalize } from '_utilities/screen';
import {
  Container,
  Illustration,
  ParagraphContainerStyled,
  SecondaryTitle,
  TextStyled,
} from './ChangePasswordPage.styles';

const ChangePasswordPage = () => {
  const dispatch = useDispatch();
  const error = useSelector(AuthenticationSelectors.getResetPasswordError);
  const emailSent = useSelector(AuthenticationSelectors.getResetPasswordSuccess);
  const isLoading = useSelector(AuthenticationSelectors.getIsLoadingResetPassword);
  const customer = useSelector(CustomerSelectors.getCustomer);

  const toastHeader = error
    ? strings.forgotPassword.errorTitle
    : strings.forgotPassword.successTitle;

  const toastContent = error
    ? strings.forgotPassword.errorMessage
    : strings.forgotPassword.successMessage;

  const type =
    (error && TOAST_TYPES.ERROR) || (emailSent && TOAST_TYPES.SUCCESS) || TOAST_TYPES.ERROR;

  const handleSubmit = () => {
    dispatch(AuthenticationActions.resetPassword(customer?.email));
  };

  const handleCloseToast = () => {
    dispatch(AuthenticationActions.setResetPasswordError(false));
    dispatch(AuthenticationActions.setResetPasswordSuccess(false));
  };

  return (
    <SecondaryScreenLayout title={strings.settings.change_password} testID="ChangePasswordPage">
      <Container>
        <Illustration icon={ICONS.checkEmail} width={normalize(300)} height={normalize(300)} />
        <ParagraphContainerStyled>
          <SecondaryTitle numberOfLines={1}>{strings.changePassword.title}</SecondaryTitle>
          <TextStyled numberOfLines={2}>{strings.changePassword.subtitle}</TextStyled>
        </ParagraphContainerStyled>
        <MainButton
          accessibilityLabel="Change Password Button"
          testID="changePasswordButton"
          isLoading={isLoading}
          onPress={handleSubmit}
        >
          {strings.changePassword.button}
        </MainButton>
      </Container>
      <Toast
        type={type}
        onClose={handleCloseToast}
        testID="ChangePasswordToast"
        header={toastHeader}
        content={toastContent}
        show={error || emailSent}
      />
    </SecondaryScreenLayout>
  );
};

export default ChangePasswordPage;
