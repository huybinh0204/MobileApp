import styled from '@emotion/native';
import { BaseText, IconSvg, Link, MainButton } from '_components/atoms';

export const Container = styled.View(({ theme }) => ({
  padding: theme.spacing.m,
  flex: 1,
}));

export const Icon = styled(IconSvg)(({ theme }) => ({
  alignSelf: 'center',
  marginTop: theme.spacing.m,
}));

export const EarlyPaycheckTitle = styled(BaseText)(({ theme }) => ({
  ...theme.typography.heading3,
  color: theme.colors.beta900,
  marginBottom: theme.spacing.xs,
  marginTop: theme.spacing.m,
  textAlign: 'center',
}));

export const EarlyPaycheckContent = styled(BaseText)(({ theme }) => ({
  ...theme.typography.subContentRegular,
  color: theme.colors.beta500,
  textAlign: 'center',
  paddingHorizontal: theme.spacing.s,
}));

export const FooterContent = styled.View({
  marginTop: 'auto',
});

export const DisclaimerNote = styled(BaseText)(({ theme }) => ({
  ...theme.typography.legal,
  color: theme.colors.beta500,
  marginBottom: theme.spacing.s,
  textAlign: 'center',
}));

export const LearnMoreLink = styled(BaseText)({
  textDecorationLine: 'underline',
});

export const DisclosureSheetContainer = styled.View(({ theme }) => ({
  padding: theme.spacing.m,
}));

export const DisclosureSheetTitle = styled(BaseText)(({ theme }) => ({
  ...theme.typography.heading6,
  color: theme.colors.beta900,
  marginBottom: theme.spacing.xs,
}));

export const DisclosureSheetContent = styled(BaseText)(({ theme }) => ({
  ...theme.typography.mainContentRegular,
  color: theme.colors.beta500,
  marginBottom: theme.spacing.m,
}));

export const SubLink = styled(Link)({
  textDecorationLine: 'underline',
});

export const BottomSheetTitle = styled(BaseText)(({ theme }) => ({
  ...theme.typography.heading5,
  color: theme.colors.beta900,
  marginBottom: theme.spacing.xs,
}));

export const BottomSheetDescription = styled(BaseText)(({ theme }) => ({
  ...theme.typography.mainContentRegular,
  color: theme.colors.beta400,
  marginBottom: theme.spacing.m,
}));

export const DirectDepositBottomSheetContainer = styled.View(({ theme }) => ({
  flex: 1,
  padding: theme.spacing.m,
}));

export const BottomSheetButton = styled(MainButton)(({ theme }) => ({
  marginVertical: theme.spacing.m,
}));
