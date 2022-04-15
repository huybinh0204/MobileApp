import styled from '@emotion/native';
import { BaseText, PressableListItem } from '_components/atoms';

export const Content = styled.View(({ theme }) => ({
  flex: 1,
  padding: theme.spacing.m,
}));

export const Title = styled(BaseText)(({ theme }) => ({
  ...theme.typography.heading5,
  color: theme.colors.beta900,
  marginBottom: theme.spacing.xs,
}));

export const Description = styled(BaseText)(({ theme }) => ({
  ...theme.typography.subContentRegular,
  color: theme.colors.beta500,
  marginBottom: theme.spacing.m,
}));

export const FundingOption = styled(PressableListItem)(({ theme }) => ({
  backgroundColor: theme.colors.white,
  borderRadius: 10,
  borderColor: theme.colors.beta100,
  borderWidth: 1,
  marginBottom: theme.spacing.s,
  padding: theme.spacing.s,
}));

export const FundSkipNote = styled(BaseText)(({ theme }) => ({
  ...theme.typography.tinyContentRegular,
  color: theme.colors.beta500,
  marginBottom: theme.spacing.s,
  marginTop: 'auto',
  textAlign: 'center',
}));
