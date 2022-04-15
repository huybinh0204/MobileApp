import PropTypes from 'prop-types';
import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import IconSvg from '_components/atoms/IconSvg/IconSvg';
import { normalize } from '_utilities/screen';
import { TabItemContainer, TabItemLabel } from './TabItem.styles';

const TabItem = ({ onPress, title, icon, isActive, testID }) => {
  return (
    <TouchableWithoutFeedback
      accessibilityLabel={`${title} Tab Button`}
      testID={testID}
      onPress={onPress}
    >
      <TabItemContainer>
        <IconSvg testID="tabIcon" icon={icon} width={normalize(28)} height={normalize(28)} />
        <TabItemLabel isActive={isActive} testID="tabLabel">
          {title}
        </TabItemLabel>
      </TabItemContainer>
    </TouchableWithoutFeedback>
  );
};

TabItem.defaultProps = {
  testID: 'tabItem',
};

TabItem.protoTypes = PropTypes.shape({
  onPress: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  testID: PropTypes.string,
});

export default TabItem;
