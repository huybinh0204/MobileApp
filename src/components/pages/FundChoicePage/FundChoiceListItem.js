import { useTheme } from '@emotion/react';
import PropTypes from 'prop-types';
import React from 'react';
import { IconSvg } from '_components/atoms';
import { FundingOption } from './FundChoicePage.styles';

const FundChoiceListItem = ({ item }) => {
  const { colors, typography } = useTheme();

  return (
    <FundingOption
      title={item.title}
      leftItem={(props) => <IconSvg icon={item.leftItem} {...props} />}
      rightItem={(props) => <IconSvg icon={item.rightItem} {...props} />}
      onPress={item.onPress}
      testID={item.testID}
      titleStyles={{ ...typography.subContentRegular, color: colors.beta900 }}
    />
  );
};

FundChoiceListItem.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string.isRequired,
    leftItem: PropTypes.string,
    rightItem: PropTypes.string,
    onPress: PropTypes.func,
    testID: PropTypes.string,
  }),
};

export default FundChoiceListItem;
