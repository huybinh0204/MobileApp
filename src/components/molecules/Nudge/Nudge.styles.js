import styled from '@emotion/native';
import { BaseText, Card } from '_components/atoms';

export const Container = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing.s,
}));

export const HeaderSection = styled.View(({ theme, alignItems }) => ({
  flexDirection: 'row',
  alignItems: alignItems || 'center',
  marginBottom: theme.spacing.s,
}));

export const HeaderBlock = styled.View(({ theme }) => ({
  flex: 1,
  paddingLeft: theme.spacing.s,
}));

export const BodyText = styled(BaseText)(({ theme }) => ({
  ...theme.typography.tinyContentRegular,
  color: theme.colors.beta500,
  marginBottom: theme.spacing.s,
}));
