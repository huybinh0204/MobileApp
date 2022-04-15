import PropTypes from 'prop-types';
import React, { memo } from 'react';
import { FlatList } from 'react-native';
import { PressableListItem } from '_components/atoms/index';
import { Separator } from './PressableList.styles';

const PressableList = ({ items, ...rest }) => (
  <FlatList
    {...rest}
    data={items}
    ItemSeparatorComponent={({ leadingItem }) => (leadingItem.hide ? null : <Separator />)}
    keyExtractor={(item) => item.title}
    renderItem={({ item }) => {
      return item.hide ? null : (
        <PressableListItem
          title={item.title}
          leftItem={item.leftItem}
          rightItem={item.rightItem}
          onPress={item.onPress}
          testID={item.testID}
        />
      );
    }}
  />
);

PressableList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      hide: PropTypes.bool,
      title: PropTypes.string.isRequired,
      leftItem: PropTypes.func,
      rightItem: PropTypes.func,
      onPress: PropTypes.func,
    })
  ).isRequired,
};

export default memo(PressableList);
