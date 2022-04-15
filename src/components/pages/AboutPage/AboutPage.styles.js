import styled, { css } from '@emotion/native';
import { BaseText } from '_components/atoms';

export const Content = styled.View(({ theme }) => ({
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  paddingHorizontal: theme.spacing.m,
}));

export const logoStyles = css({
  marginBottom: 30,
});

export const Text = styled(BaseText)(({ theme }) => ({
  ...theme.typography.mainContentRegular,
  color: theme.colors.beta400,
  textAlign: 'center',
  marginBottom: theme.spacing.xs,
}));
