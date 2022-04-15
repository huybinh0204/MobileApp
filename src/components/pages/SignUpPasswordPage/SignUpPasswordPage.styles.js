import styled from '@emotion/native';
import { BaseText } from '_components/atoms';

export const SignUpPasswordContainer = styled.View(({ theme }) => ({
  flex: 1,
  padding: theme.spacing.m,
}));

export const SignUpPasswordTitle = styled(BaseText)(({ theme }) => ({
  ...theme.typography.heading5,
  color: theme.colors.beta900,
  marginBottom: theme.spacing.m,
}));

export const SignUpPasswordOptionsContainer = styled.View({
  marginTop: 'auto',
});
