import PropTypes from 'prop-types';
import React from 'react';
import { BottomSheet } from '_components/atoms';
import {
  ActionButton,
  BottomSheetContainer,
  BottomSheetDescription,
  BottomSheetTitle,
} from './ConfirmationBottomSheet.styles';

const ConfirmationBottomSheet = ({
  bottomSheetProps,
  title,
  description,
  confirmationButtonText,
  confirmationButtonProps,
  cancelButtonText,
  cancelButtonProps,
}) => {
  return (
    <BottomSheet {...bottomSheetProps}>
      <BottomSheetContainer>
        <BottomSheetTitle>{title}</BottomSheetTitle>
        <BottomSheetDescription>{description}</BottomSheetDescription>
        <ActionButton {...confirmationButtonProps}>{confirmationButtonText}</ActionButton>
        <ActionButton {...cancelButtonProps}>{cancelButtonText}</ActionButton>
      </BottomSheetContainer>
    </BottomSheet>
  );
};

ConfirmationBottomSheet.propTypes = {
  bottomSheetProps: PropTypes.object.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  confirmationButtonText: PropTypes.string.isRequired,
  confirmationButtonProps: PropTypes.object,
  cancelButtonText: PropTypes.string.isRequired,
  cancelButtonProps: PropTypes.object,
};

export default ConfirmationBottomSheet;
