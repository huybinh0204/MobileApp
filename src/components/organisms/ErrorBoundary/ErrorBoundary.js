import { Dynatrace } from '@dynatrace/react-native-plugin';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import { useSelector } from 'react-redux';
import { Link, MainButton } from '_components/atoms';
import { EVENTS, NAVIGATION } from '_constants';
import strings from '_localization';
import DynatraceService from '_services/DynatraceService';
import { navigate } from '_services/NavigationService';
import { AuthenticationSelectors } from '_store/authentication';
import {
  Container,
  DescriptionError,
  LinkEmail,
  MessageContainer,
  TitleError,
} from './ErrorBoundary.styles';

const ErrorFallback = ({ resetErrorBoundary }) => {
  const isSessionExpired = useSelector(AuthenticationSelectors.getIsSessionExpired);

  const handleContinue = () => {
    resetErrorBoundary();
    navigate(isSessionExpired ? NAVIGATION.auth.signIn : NAVIGATION.auth.welcome);
  };

  useEffect(() => {
    DynatraceService.reportNavigationAction(EVENTS.ERROR_BOUNDARY_SCREEN_OPENED);
  }, []);

  return (
    <Container>
      <MessageContainer>
        {/*<TitleError>{strings.common.errorBoundary.title}</TitleError>*/}
      {/*  <DescriptionError>*/}
      {/*    {strings.formatString(strings.common.errorBoundary.description, {*/}
      {/*      email: (*/}
      {/*        <Link href={strings.contact.email} wrapperComponent={LinkEmail} type={'mail'}>*/}
      {/*          {strings.contact.email}*/}
      {/*        </Link>*/}
      {/*      ),*/}
      {/*    })}*/}
      {/*  </DescriptionError>*/}
      {/*  <MainButton onPress={handleContinue}>{strings.common.errorBoundary.buttonText}</MainButton>*/}
      </MessageContainer>
    </Container>
  );
};

export const ErrorBoundary = ({ children }) => {
  const handleError = (error) => {
    if (error && Object.values(error).length > 0) {
      Dynatrace.reportError(`Unhandled Error: ${JSON.stringify(error)}`, 0);
    }
  };

  return (
    <ReactErrorBoundary FallbackComponent={ErrorFallback} onError={handleError}>
      {children}
    </ReactErrorBoundary>
  );
};

ErrorFallback.propTypes = {
  resetErrorBoundary: PropTypes.func.isRequired,
};

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorBoundary;
