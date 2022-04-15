import styled from '@emotion/native';
import { normalize } from '_utilities/screen';

export const HeaderContainer = styled.View({
  alignItems: 'center',
  justifyContent: 'center',
  height: normalize(60),
});

export const ProgressBarContainer = styled.View({
  width: '50%',
});

export const ActionButton = styled.TouchableOpacity(({ theme, side }) => ({
  position: 'absolute',
  [side]: theme.spacing.general,
  zIndex: 10,
}));
