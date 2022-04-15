import styled from '@emotion/native';
import { BaseText, IconSvg } from '_components/atoms';

export const Content = styled.View(({ theme }) => ({
  flex: 1,
  alignItems: 'center',
  padding: theme.spacing.m,
}));

export const Title = styled(BaseText)(({ theme }) => ({
  ...theme.typography.heading4,
  color: theme.colors.beta900,
  marginBottom: theme.spacing.s,
  textAlign: 'center',
}));

export const Description = styled(BaseText)(({ theme }) => ({
  ...theme.typography.subContentRegular,
  color: theme.colors.beta500,
  marginBottom: 'auto',
  paddingHorizontal: theme.spacing.s,
  textAlign: 'center',
}));

export const Logo = styled(IconSvg)(({ theme }) => ({
  marginVertical: theme.spacing.m,
}));
