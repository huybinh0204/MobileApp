import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MainButton, Toast } from '_components/atoms';
import { OnboardingScreenLayout } from '_components/organisms';
import { NAVIGATION, TOAST_TYPES } from '_constants';
import strings from '_localization';
import { AuthenticationActions, AuthenticationSelectors } from '_store/authentication';
import {
  SignUpMailVerificationContainer,
  SignUpMailVerificationMessage,
  SignUpMailVerificationTextContainer,
  SignUpMailVerificationTitle,
} from './SignUpMailVerificationPage.styles';

const SignUpMailVerificationPage = () => {
  const dispatch = useDispatch();
  const { navigate } = useNavigation();
  const { params } = useRoute();

  const currentUserData = useSelector(AuthenticationSelectors.getCurrentUserData);
  const error = useSelector(AuthenticationSelectors.getCurrentUserDataError);
  const isLoading = useSelector(AuthenticationSelectors.getIsLoadingCurrentUserData);

  useEffect(() => {
    if (currentUserData?.emailVerified) {
      navigate(NAVIGATION.auth.signUpPhone, { email: params.email });
    }
  }, [currentUserData, navigate, params]);

  const handleSubmit = () => {
    dispatch(AuthenticationActions.fetchCurrentUserData());
  };

  const handleCloseToast = () => {
    dispatch(AuthenticationActions.setCurrentUserDataError(null));
  };

  return (
    <OnboardingScreenLayout step={3} testID="MailVerificationPage" showBackButton={false}>
      <SignUpMailVerificationContainer>
        <SignUpMailVerificationTextContainer>
          <SignUpMailVerificationTitle>
            {strings.signUp.emailVerification.title}
          </SignUpMailVerificationTitle>
          <SignUpMailVerificationMessage>
            {strings.signUp.emailVerification.message}
          </SignUpMailVerificationMessage>
        </SignUpMailVerificationTextContainer>

        <MainButton accessibilityLabel="Continue" onPress={handleSubmit} isLoading={isLoading}>
          {strings.signUp.continue}
        </MainButton>
      </SignUpMailVerificationContainer>
      <Toast
        type={TOAST_TYPES.ALERT}
        header={strings.signUp.emailVerification.notVerified.title}
        content={strings.signUp.emailVerification.notVerified.description}
        onClose={handleCloseToast}
        show={currentUserData?.emailVerified === false}
        testID="errorToast"
      />
      <Toast
        type={TOAST_TYPES.ERROR}
        header={strings.signUp.emailVerification.fetchCurrentUserError.title}
        content={strings.signUp.emailVerification.fetchCurrentUserError.description}
        onClose={handleCloseToast}
        show={!!error}
        testID="errorToast"
      />
    </OnboardingScreenLayout>
  );
};

export default SignUpMailVerificationPage;
