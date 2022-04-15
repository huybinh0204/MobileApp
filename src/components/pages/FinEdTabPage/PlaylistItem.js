import { Dynatrace } from '@dynatrace/react-native-plugin';
import PropTypes from 'prop-types';
import React from 'react';
import { IconSvg } from '_components/atoms';
import { normalize } from '_utilities/screen';
import {
  ItemPlaylistDesc,
  ItemPlaylistTitle,
  PlaylistItemButton,
  PlaylistItemWrap,
  PlaylistTextWrap,
} from './FinEdTabPage.styles';

const PlaylistItem = ({ title, description, url, asset, onPress }) => {
  const handlePress = () => {
    try {
      onPress(url);
    } catch (error) {
      Dynatrace.reportError(`Open playlist webview Error: ${JSON.stringify(error)}`, 0);
    }
  };

  return (
    <PlaylistItemWrap>
      <PlaylistItemButton onPress={handlePress}>
        <IconSvg icon={asset} height={normalize(105)} width={normalize(95)} />
        <PlaylistTextWrap>
          <ItemPlaylistTitle>{title}</ItemPlaylistTitle>
          <ItemPlaylistDesc>{description}</ItemPlaylistDesc>
        </PlaylistTextWrap>
      </PlaylistItemButton>
    </PlaylistItemWrap>
  );
};

PlaylistItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  asset: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  testID: PropTypes.string,
};

export default PlaylistItem;
