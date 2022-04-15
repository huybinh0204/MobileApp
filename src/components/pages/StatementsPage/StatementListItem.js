import { useTheme } from '@emotion/react';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { ActivityIndicator, Pressable } from 'react-native';
import ENV from 'react-native-config';
import { useSelector } from 'react-redux';
import { IconSvg } from '_components/atoms';
import { ICONS, NAVIGATION } from '_constants';
import apiClient from '_services/apiClient';
import { AccountSelectors } from '_store/account';
import { normalize } from '_utilities/screen';
import { ListRow, Title } from './StatementsPage.styles';

const StatementListItem = ({ date, title }) => {
  const { colors } = useTheme();
  const { navigate } = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const externalId = useSelector(AccountSelectors.getExternalId);

  const year = date.substring(0, 4);
  const month = date.substring(4, 6);

  const getStatementUrl = `${ENV.EXPERIENCE_LAYER_URIS_ACCOUNTS}/${externalId}/statement/${year}/${month}`;

  const handlePress = async () => {
    try {
      setIsLoading(true);
      const { data } = await apiClient.get(getStatementUrl);
      setIsLoading(false);
      navigate(NAVIGATION.settings.statementDetails, { url: data.url, title });
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <Pressable disabled={isLoading} onPress={handlePress}>
      {({ pressed }) => (
        <ListRow isPressed={pressed}>
          <Title>{title}</Title>
          {isLoading ? (
            <ActivityIndicator size="small" color={colors.beta900} />
          ) : (
            <IconSvg icon={ICONS.arrowRight} height={normalize(25)} width={normalize(25)} />
          )}
        </ListRow>
      )}
    </Pressable>
  );
};

StatementListItem.propTypes = {
  date: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default StatementListItem;
