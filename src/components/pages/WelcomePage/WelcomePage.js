import { useTheme } from '@emotion/react';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { useWindowDimensions } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { useDispatch, useSelector } from 'react-redux';
import { Toast } from '_components/atoms';
import { CustomStatusBar } from '_components/organisms';
import { FEATURE_FLAGS, NAVIGATION, TOAST_TYPES } from '_constants';
import { useBooleanFeatureFlag } from '_hooks';
import strings from '_localization';
import { AuthenticationActions, AuthenticationSelectors } from '_store/authentication';
import { normalize } from '_utilities/screen';
import carouselData from './carouselData';
import CarouselItem from './CarouselItem';
import {
  ActionButton,
  ButtonsContainer,
  Container,
  paginationContainerStyles,
  paginationDotStyles,
} from './WelcomePage.styles';

const WelcomePage = () => {
  const dispatch = useDispatch();
  const { navigate } = useNavigation();
  const isEmailVerificationEnabled = useBooleanFeatureFlag(FEATURE_FLAGS.EMAIL_VERIFICATION);

  const { colors } = useTheme();
  const { width } = useWindowDimensions();

  const isLoading = useSelector(AuthenticationSelectors.getIsLoading);
  const isSessionExpired = useSelector(AuthenticationSelectors.getIsSessionExpired);
  const authenticationError = useSelector(AuthenticationSelectors.getAuthenticationError);
  const isUniversalLoginEnabled = useBooleanFeatureFlag(FEATURE_FLAGS.UNIVERSAL_LOGIN);

  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const handleSignUpClick = () => {
    navigate(NAVIGATION.auth.signUpMail);
  };

  const handleSignInClick = () => {
    if (isUniversalLoginEnabled) {
      dispatch(AuthenticationActions.signIn({ isEmailVerificationEnabled }));
    } else {
      navigate(NAVIGATION.auth.signIn);
    }
  };

  const closeAuthenticationErrorToast = () => {
    dispatch(AuthenticationActions.setAuthenticationError(null));
  };

  const closeSessionExpiredToast = () => {
    dispatch(AuthenticationActions.setIsSessionExpired(false));
  };

  return (
    <Container testID="WelcomePage" edges={['bottom']}>
      <CustomStatusBar backgroundColor={colors.statusBar} barStyle="dark-content" />
      <Carousel
        loop
        data={carouselData}
        itemWidth={width}
        inactiveSlideOpacity={1}
        inactiveSlideScale={1}
        onSnapToItem={setActiveSlideIndex}
        renderItem={({ item }) => <CarouselItem item={item} />}
        sliderWidth={width}
      />
      <Pagination
        activeDotIndex={activeSlideIndex}
        dotsLength={carouselData.length}
        dotStyle={paginationDotStyles}
        containerStyle={paginationContainerStyles}
        inactiveDotScale={1}
      />
      <ButtonsContainer>
        <ActionButton
          isLoading={isLoading}
          onPress={handleSignInClick}
          variant="secondary"
          testID="SignInButton"
        >
          {strings.welcome.signInButtonLabel}
        </ActionButton>
        <ActionButton disabled={isLoading} onPress={handleSignUpClick} testID="SignUpButton">
          {strings.welcome.signUpButtonLabel}
        </ActionButton>
      </ButtonsContainer>
      <Toast
        offset={normalize(40)}
        type={TOAST_TYPES.ERROR}
        onClose={closeAuthenticationErrorToast}
        testID="authenticationErrorToast"
        header={authenticationError?.title}
        content={authenticationError?.description}
        show={authenticationError !== null && !isUniversalLoginEnabled}
      />
      <Toast
        offset={normalize(40)}
        type={TOAST_TYPES.ERROR}
        onClose={closeSessionExpiredToast}
        testID="sessionExpiredToast"
        header={strings.signIn.expiredSession.title}
        content={strings.signIn.expiredSession.description}
        show={isSessionExpired}
      />
    </Container>
  );
};

export default WelcomePage;
