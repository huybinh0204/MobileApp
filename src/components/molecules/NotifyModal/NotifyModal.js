import { useTheme } from '@emotion/react';
import PropTypes from 'prop-types';
import React from 'react';
import { Modal } from 'react-native';
import { Card, MainButton } from '_components/atoms';
import { Container, Description, Title } from './NotifyModal.styles';

const NotifyModal = ({
  title,
  description,
  buttonText,
  onDismiss,
  visible,
  backgroundColor,
  transparent,
}) => {
  const theme = useTheme();

  return (
    <Modal animationType="slide" transparent={transparent} visible={visible}>
      <Container backgroundColor={backgroundColor ?? theme.colors.opacitybeta900}>
        <Card>
          <Title>{title}</Title>
          <Description>{description}</Description>
          <MainButton onPress={onDismiss}>{buttonText}</MainButton>
        </Card>
      </Container>
    </Modal>
  );
};

NotifyModal.defaultProps = {
  visible: false,
  backgroundColor: null,
  transparent: true,
};

NotifyModal.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  onDismiss: PropTypes.func.isRequired,
  visible: PropTypes.bool,
  transparent: PropTypes.bool,
  backgroundColor: PropTypes.string,
};

export default NotifyModal;
