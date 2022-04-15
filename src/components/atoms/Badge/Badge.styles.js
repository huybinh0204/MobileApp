import styled from '@emotion/native';
import { normalize } from '_utilities/screen';

export const BadgeIndicator = styled.View(({ theme, backgroundColor, size = 12 }) => ({
  backgroundColor: backgroundColor ?? theme.colors.alpha500,
  borderRadius: size / 2,
  minWidth: normalize(size),
  height: normalize(size),
  alignSelf: 'center',
  marginRight: 6,
}));
