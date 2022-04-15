import styled from '@emotion/native';
import { BaseText } from '_components/atoms';

export const SuccesPageContainer = styled.View(({ theme }) => ({
  flex: 1,
  alignItems: 'center',
  padding: theme.spacing.m,
}));

export const SuccesPageTitle = styled(BaseText)(({ theme }) => ({
  ...theme.typography.heading4,
  color: theme.colors.beta900,
  marginTop: theme.spacing.m,
  marginBottom: 'auto',
  paddingHorizontal: theme.spacing.m,
  textAlign: 'center',
}));
