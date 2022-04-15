import styled from '@emotion/native';
import { BaseText } from '_components/atoms';
import { normalize } from '_utilities/screen';

export const HeaderContainer = styled.View({
  alignItems: 'center',
  justifyContent: 'center',
  height: normalize(60),
});

export const HeaderTitle = styled(BaseText)(({ theme }) => ({
  ...theme.typography.heading6,
  color: theme.colors.beta900,
}));

export const ActionButton = styled.TouchableOpacity(({ theme, side }) => ({
  position: 'absolute',
  [side]: theme.spacing.general,
  zIndex: 10,
}));
