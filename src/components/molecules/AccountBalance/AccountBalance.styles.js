import styled from '@emotion/native';
import { BaseText } from '_components/atoms';

export const BalanceContainer = styled.View(({ theme }) => ({
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing.s,
}));

export const Description = styled(BaseText)(({ theme }) => ({
  ...theme.typography.subContentRegular,
  color: theme.colors.beta500,
}));

export const Balance = styled(BaseText)(({ theme, isNegative }) => ({
  ...theme.typography.heading1,
  color: isNegative ? theme.colors.epsilon500 : theme.colors.beta900,
}));
