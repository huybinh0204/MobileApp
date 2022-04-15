import styled from '@emotion/native';
import BaseText from '_components/atoms/BaseText/BaseText';

export const BalanceText = styled(BaseText)(({ theme, isNegative, typography }) => ({
  ...theme.typography[typography],
  color: isNegative ? theme.colors.epsilon500 : theme.colors.beta900,
}));
