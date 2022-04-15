import React from 'react';
import PropTypes from 'prop-types';
import { BadgeIndicator } from '_components/atoms/Badge/Badge.styles';

const Badge = (props) => <BadgeIndicator {...props} />;

Badge.propTypes = {
  backgroundColor: PropTypes.string,
  size: PropTypes.number,
};

export default Badge;
