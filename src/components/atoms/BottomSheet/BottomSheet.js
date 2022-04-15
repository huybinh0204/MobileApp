import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';
import RNBottomSheet from 'react-native-raw-bottom-sheet';

const BottomSheet = ({ isVisible, children, onClose, styles, height, onOpen, ...rest }) => {
  const sheetRef = useRef(null);

  useEffect(() => {
    isVisible ? sheetRef.current?.open() : sheetRef.current?.close();
  }, [isVisible]);

  return (
    <RNBottomSheet
      ref={sheetRef}
      height={height}
      onOpen={onOpen}
      onClose={onClose}
      customStyles={styles}
      {...rest}
    >
      {children}
    </RNBottomSheet>
  );
};

BottomSheet.defaultProps = {
  isVisible: false,
  styles: {},
  height: 400,
};

BottomSheet.propTypes = {
  isVisible: PropTypes.bool,
  children: PropTypes.element.isRequired,
  height: PropTypes.number,
  onClose: PropTypes.func,
  onOpen: PropTypes.func,
  styles: PropTypes.shape({
    wrapper: PropTypes.object,
    container: PropTypes.object,
    draggableIcon: PropTypes.object,
  }),
};

export default BottomSheet;
