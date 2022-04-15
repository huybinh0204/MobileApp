import styled from '@emotion/native';
import { BaseText, IconSvg } from '_components/atoms';

export const Container = styled.View(({ theme }) => ({
  flex: 1,
  alignItems: 'center',
  padding: theme.spacing.m,
}));

export const Illustration = styled(IconSvg)(({ theme }) => ({
  marginTop: theme.spacing.m,
}));

export const ParagraphContainerStyled = styled.View({
  flex: 1,
  justifyContent: 'center',
});

export const TextStyled = styled(BaseText)(({ theme }) => ({
  ...theme.typography.subContentRegular,
  color: theme.colors.beta500,
  textAlign: 'center',
}));

export const SecondaryTitle = styled(BaseText)(({ theme }) => ({
  ...theme.typography.heading4,
  color: theme.colors.beta900,
  paddingVertical: theme.spacing.s,
  textAlign: 'center',
}));
