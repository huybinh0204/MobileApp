import styled from '@emotion/native';
import { BaseText } from '_components/atoms';

export const Container = styled.View(({ theme, backgroundColor }) => ({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  paddingHorizontal: theme.spacing.s,
  backgroundColor,
}));

export const Title = styled(BaseText)(({ theme }) => ({
  ...theme.typography.heading5,
  color: theme.colors.beta900,
  marginBottom: theme.spacing.xs,
  paddingHorizontal: theme.spacing.s,
  textAlign: 'center',
}));

export const Description = styled(BaseText)(({ theme }) => ({
  ...theme.typography.mainContentRegular,
  color: theme.colors.beta500,
  marginBottom: theme.spacing.m,
  textAlign: 'center',
}));
