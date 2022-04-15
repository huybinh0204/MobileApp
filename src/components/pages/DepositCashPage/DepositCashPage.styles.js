import styled from '@emotion/native';
import { BaseText, IconSvg } from '_components/atoms';

export const ContentContainer = styled.View(({ theme }) => ({
  flex: 1,
  padding: theme.spacing.m,
}));

export const Title = styled(BaseText)(({ theme }) => ({
  ...theme.typography.heading4,
  color: theme.colors.beta900,
  textAlign: 'center',
}));

export const Illustration = styled(IconSvg)(({ theme }) => ({
  alignSelf: 'center',
  marginVertical: theme.spacing.s,
}));

export const Description = styled(BaseText)(({ theme }) => ({
  ...theme.typography.subContentRegular,
  color: theme.colors.beta500,
  textAlign: 'center',
}));

export const FooterContainer = styled.View({
  marginTop: 'auto',
});

export const FooterNote = styled(BaseText)(({ theme }) => ({
  ...theme.typography.legal,
  color: theme.colors.beta500,
  marginBottom: theme.spacing.s,
  textAlign: 'center',
}));

export const FooterNoteLink = styled(BaseText)(({ theme }) => ({
  color: theme.colors.alpha500,
}));

export const SheetContainer = styled.View(({ theme }) => ({
  padding: theme.spacing.m,
}));

export const SheetTitle = styled(BaseText)(({ theme }) => ({
  ...theme.typography.heading6,
  color: theme.colors.beta900,
  marginBottom: theme.spacing.xs,
}));

export const SheetContent = styled(BaseText)(({ theme }) => ({
  ...theme.typography.mainContentRegular,
  color: theme.colors.beta500,
  marginBottom: theme.spacing.m,
}));

export const SheetTnC = styled(BaseText)(({ theme }) => ({
  ...theme.typography.mainContentRegular,
  color: theme.colors.alpha500,
  marginBottom: theme.spacing.m,
}));
