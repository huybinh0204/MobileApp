import styled from '@emotion/native';
import { BaseText } from '_components/atoms';

export const SignUpMailVerificationContainer = styled.View(({ theme }) => ({
  flex: 1,
  justifyContent: 'space-between',
  padding: theme.spacing.m,
}));

export const SignUpMailVerificationTextContainer = styled.View(() => ({
  flex: 1,
}));

export const SignUpMailVerificationTitle = styled(BaseText)(({ theme }) => ({
  ...theme.typography.heading5,
  color: theme.colors.beta900,
  marginBottom: theme.spacing.m,
}));

export const SignUpMailVerificationMessage = styled(BaseText)(({ theme }) => ({
  ...theme.typography.subContentRegular,
  color: theme.colors.beta500,
  marginBottom: theme.spacing.m,
}));
