import PropTypes from 'prop-types';
import React from 'react';
import { Modal, View } from 'react-native';
import { IconSvg, MainButton } from '_components/atoms';
import { ICONS } from '_constants';
import { normalize } from '_utilities/screen';
import { Inner, MainTitle } from './ImageTextButtonModal.styles';

const ImageTextButtonModal = ({ image, text, buttonText, onClose, visible }) => (
  <Modal visible={visible} animationType="slide">
    <Inner>
      <View>
        <IconSvg icon={image} width={normalize(300)} height={normalize(300)} />
        <MainTitle>{text}</MainTitle>
      </View>
      <MainButton onPress={onClose}>{buttonText}</MainButton>
    </Inner>
  </Modal>
);

ImageTextButtonModal.defaultProps = {
  image: ICONS.errorIllustration,
  text: '',
  buttonText: '',
};

ImageTextButtonModal.propTypes = {
  image: PropTypes.oneOf(Object.keys(ICONS)),
  text: PropTypes.string,
  buttonText: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
};

export default ImageTextButtonModal;
