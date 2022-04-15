import { useTheme } from '@emotion/react';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { ActivityIndicator, Keyboard, TouchableOpacity } from 'react-native';
import PlaidLink from 'react-native-plaid-link-sdk';
import { useDispatch, useSelector } from 'react-redux';
import Toast from '_components/atoms/Toast/Toast';
import { TOAST_TYPES } from '_constants';
import strings from '_localization';
import { AccountActions, AccountSelectors } from '_store/account';
import { AuthenticationSelectors } from '_store/authentication';
import { Label, PlaidButtonContainer } from './Plaid.styles';

const Plaid = ({ disabled, onExit, onSuccess, testID, title }) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const credentials = useSelector(AuthenticationSelectors.getCredentials);
  const error = useSelector(AccountSelectors.getPlaidLinkTokenError);
  const token = useSelector(AccountSelectors.getPlaidLinkToken);
  const isLoading = useSelector(AccountSelectors.getIsLoadingPlaidLinkToken);

  const [isVisibleToast, setIsVisibleToast] = useState(false);

  const handlePressWithoutToken = () => {
    if (error) {
      Keyboard.dismiss();
      setIsVisibleToast(true);
    }
  };

  const handleCloseToast = () => {
    setIsVisibleToast(false);
    dispatch(AccountActions.fetchPlaidLinkTokenFail(false));
    dispatch(AccountActions.fetchPlaidLinkToken(credentials?.sub));
  };

  const content = (
    <PlaidButtonContainer testID={testID} disabled={disabled || isLoading}>
      {isLoading ? <ActivityIndicator color={theme.colors.white} /> : <Label>{title}</Label>}
    </PlaidButtonContainer>
  );

  return (
    <>
      {token === null ? (
        <TouchableOpacity disabled={disabled || isLoading} onPress={handlePressWithoutToken}>
          {content}
        </TouchableOpacity>
      ) : (
        <PlaidLink onExit={onExit} onSuccess={onSuccess} tokenConfig={{ token }}>
          {content}
        </PlaidLink>
      )}
      <Toast
        type={TOAST_TYPES.ERROR}
        content={strings.linkAccount.fetchPlaidTokenError.text}
        header={strings.linkAccount.fetchPlaidTokenError.title}
        onClose={handleCloseToast}
        paddingHorizontal={0}
        show={isVisibleToast}
        testID="FetchPlaidTokenErrorToast"
      />
    </>
  );
};

Plaid.defaultProps = {
  disabled: false,
};

Plaid.propTypes = {
  disabled: PropTypes.bool,
  onExit: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default Plaid;
