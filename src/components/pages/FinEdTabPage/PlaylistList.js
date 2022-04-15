import PropTypes from 'prop-types';
import React from 'react';
import { FooterFlatlist, PlaylistFlatList, Separator } from './FinEdTabPage.styles';
import PlaylistItem from './PlaylistItem';

const PlaylistList = ({ playlists, onPressItem }) => {
  return (
    <PlaylistFlatList
      ItemSeparatorComponent={Separator}
      data={playlists}
      renderItem={({ item }) => <PlaylistItem {...item} onPress={onPressItem} />}
      keyExtractor={(item) => item.id}
      ListFooterComponent={FooterFlatlist}
    />
  );
};

PlaylistList.propTypes = {
  playlists: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      asset: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      testID: PropTypes.string,
    })
  ).isRequired,
  onPressItem: PropTypes.func.isRequired,
};

export default PlaylistList;
