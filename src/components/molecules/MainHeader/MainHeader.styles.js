import styled from '@emotion/native';
import { BaseText } from '_components/atoms';
import { normalize } from '_utilities/screen';

export const Container = styled.View({
  alignItems: 'center',
  justifyContent: 'center',
  height: normalize(60),
});

export const ActionButton = styled.TouchableOpacity(({ theme }) => ({
  position: 'absolute',
  left: theme.spacing.general,
  zIndex: 10,
}));

export const HeaderTitle = styled(BaseText)(({ theme }) => ({
  ...theme.typography.mainContentSemiBold,
  color: theme.colors.beta900,
}));
