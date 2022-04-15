import { css } from '@emotion/native';
import { StyleSheet } from 'react-native';

export const isStyleRow = (style) => {
  const flatStyle = StyleSheet.flatten(style || {});

  return flatStyle.flexDirection !== 'column';
};

const getDashStyleId = ({ dashGap, dashLength, dashThickness, dashColor }, isRow) =>
  `${dashGap}-${dashLength}-${dashThickness}-${dashColor}-${isRow ? 'row' : 'column'}`;

const createDashStyle = ({ dashGap, dashLength, dashThickness, dashColor }, isRow) => {
  return css({
    width: isRow ? dashLength : dashThickness,
    height: isRow ? dashThickness : dashLength,
    marginRight: isRow ? dashGap : 0,
    marginBottom: isRow ? 0 : dashGap,
    backgroundColor: dashColor,
  });
};

export const defaultStyles = {
  row: css({ flexDirection: 'row' }),
  column: css({ flexDirection: 'column' }),
};

let stylesStore = {};
export const getDashStyle = (props) => {
  const isRow = isStyleRow(props.style);
  const id = getDashStyleId(props, isRow);

  if (!stylesStore[id]) {
    stylesStore = {
      ...stylesStore,
      [id]: createDashStyle(props, isRow),
    };
  }

  return stylesStore[id];
};
