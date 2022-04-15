import PropTypes from 'prop-types';
import React from 'react';
import BaseText from '_components/atoms/BaseText/BaseText';
import icons from './iconList';

const IconSvg = ({ icon, width, height, style, testID, ...rest }) => {
  if (!icons[icon]) {
    return <BaseText testID={testID}>not Found</BaseText>;
  }

  return icons[icon]({ style, width, height, testID, ...rest });
};

IconSvg.defaultProps = {
  width: 20,
  height: 20,
};

IconSvg.propTypes = {
  icon: PropTypes.string.isRequired,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default IconSvg;
