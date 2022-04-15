import PropTypes from 'prop-types';
import React from 'react';
import { normalize } from '_utilities/screen';
import { PressableItem, Title } from './PressableListItem.styles';

const PressableListItem = ({
  title,
  onPress,
  leftItem,
  rightItem,
  testID,
  titleStyles,
  ...rest
}) => (
  <PressableItem onPress={onPress} testID={testID} {...rest}>
    {leftItem && leftItem({ width: normalize(32), height: normalize(32), testID: 'LeftItem' })}
    <Title marginLeft={!!leftItem} testID="ItemTitle" style={titleStyles}>
      {title}
    </Title>
    {rightItem && rightItem({ width: normalize(25), height: normalize(25), testID: 'RightItem' })}
  </PressableItem>
);

PressableListItem.defaultProps = {
  leftItem: null,
  rightItem: null,
  testID: 'PressableListItemContainer',
  titleStyles: null,
};

PressableListItem.propTypes = {
  leftItem: PropTypes.func,
  rightItem: PropTypes.func,
  onPress: PropTypes.func,
  testID: PropTypes.string,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  titleStyles: PropTypes.object,
};

export default PressableListItem;
