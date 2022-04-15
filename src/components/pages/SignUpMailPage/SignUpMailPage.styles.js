import styled from '@emotion/native';
import { BaseText } from '_components/atoms';

export const SignUpMailContainer = styled.View(({ theme }) => ({
  flex: 1,
  justifyContent: 'space-between',
  padding: theme.spacing.m,
}));

export const SignUpMailTitle = styled(BaseText)(({ theme }) => ({
  ...theme.typography.heading5,
  color: theme.colors.beta900,
  marginBottom: theme.spacing.m,
}));

export const SignUpMailOptionsContainer = styled.View({
  flex: 1,
  justifyContent: 'flex-end',
  width: '100%',
});

export const SignUpMailDisclaimerText = styled(BaseText)(({ theme }) => ({
  ...theme.typography.legal,
  color: theme.colors.beta500,
  marginBottom: theme.spacing.s,
  textAlign: 'center',
}));

export const SignUpMailDisclaimerLink = styled(BaseText)(({ theme }) => ({
  color: theme.colors.alpha500,
}));
