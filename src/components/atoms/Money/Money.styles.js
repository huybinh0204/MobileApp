import styled from '@emotion/native';
import BaseText from '_components/atoms/BaseText/BaseText';

export const MoneyAmount = styled(BaseText)(({ theme, isZero }) => ({
  ...theme.typography.heading1,
  color: isZero ? theme.colors.beta500 : theme.colors.beta900,
}));
