import { useTheme } from '@emotion/react';
import PropTypes from 'prop-types';
import React from 'react';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
import PlaidLink from 'react-native-plaid-link-sdk';
import { IconSvg } from '_components/atoms';
import { ListItem } from '_components/molecules';
import { ICONS } from '_constants';
import strings from '_localization';
import { normalize } from '_utilities/screen';

const AddBankAccount = ({
  linkedAccount,
  token,
  showAccountInfo,
  onLinkAccountExit,
  onLinkAccountSuccess,
  loading,
}) => {
  const { colors } = useTheme();

  if (linkedAccount && !loading) {
    return (
      <TouchableOpacity onPress={showAccountInfo} testID="linkedAccountButton">
        <ListItem color={colors.beta900} icon={ICONS.addBankAccount} title={linkedAccount?.name}>
          <IconSvg icon={ICONS.arrowRight} height={normalize(25)} width={normalize(25)} />
        </ListItem>
      </TouchableOpacity>
    );
  }

  if (token && !loading) {
    return (
      <View testID="plaidLinkAccountButton">
        <PlaidLink
          onExit={onLinkAccountExit}
          onSuccess={onLinkAccountSuccess}
          tokenConfig={{ token }}
        >
          <ListItem title={strings.accounts.add} icon={ICONS.addBankAccount}>
            <IconSvg icon={ICONS.arrowRightActive} height={normalize(25)} width={normalize(25)} />
          </ListItem>
        </PlaidLink>
      </View>
    );
  }

  return <ActivityIndicator color={colors.alpha500} size="small" testID="addAccountLoading" />;
};

AddBankAccount.propTypes = {
  linkedAccount: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  token: PropTypes.string,
  showAccountInfo: PropTypes.func,
  onLinkAccountExit: PropTypes.func,
  onLinkAccountSuccess: PropTypes.func,
  loading: PropTypes.bool,
};

AddBankAccount.defaultProps = {
  linkedAccount: false,
  token: null,
  showAccountInfo: () => {},
  onLinkAccountExit: () => {},
  onLinkAccountSuccess: () => {},
  loading: false,
};

export default AddBankAccount;
