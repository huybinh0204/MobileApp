import React from 'react';
import PropTypes from 'prop-types';
import { View, ViewPropTypes } from 'react-native';
import { defaultStyles, getDashStyle, isStyleRow } from './Dash.styles';
import { useComponentSize } from '_hooks';
import { COLORS } from '_constants';

const Dash = (props) => {
  const [size, layout] = useComponentSize();
  const isRow = isStyleRow(props.style);
  const length = isRow ? size.width : size.height;
  const n = Math.ceil(length / (props.dashGap + props.dashLength));
  const calculatedDashStyles = getDashStyle(props);

  let dash = [];
  for (let i = 0; i < n; i++) {
    dash.push(<View key={i} style={[calculatedDashStyles, props.dashStyle]} />);
  }

  return (
    <View onLayout={layout} style={[props.style, isRow ? defaultStyles.row : defaultStyles.column]}>
      {dash}
    </View>
  );
};

Dash.propTypes = {
  style: ViewPropTypes.style,
  dashGap: PropTypes.number.isRequired,
  dashLength: PropTypes.number.isRequired,
  dashThickness: PropTypes.number.isRequired,
  dashColor: PropTypes.string,
  dashStyle: ViewPropTypes.style,
};

Dash.defaultProps = {
  dashGap: 2,
  dashLength: 4,
  dashThickness: 2,
  dashColor: COLORS.black,
};

export default Dash;
