import styled, { css } from '@emotion/native';
import { BaseText, IconSvg, Link, MainButton } from '_components/atoms';

export const Content = styled.View(({ theme }) => ({
  flex: 1,
  paddingHorizontal: theme.spacing.m,
  paddingVertical: theme.spacing.s,
}));

export const Header = styled(BaseText)(({ theme }) => ({
  ...theme.typography.heading3,
  color: theme.colors.beta900,
  marginBottom: theme.spacing.s,
  textAlign: 'center',
}));

export const Icon = styled(IconSvg)(({ theme }) => ({
  marginBottom: theme.spacing.s,
  alignSelf: 'center',
}));

export const Description = styled(BaseText)(({ theme }) => ({
  ...theme.typography.subContentRegular,
  color: theme.colors.beta500,
  marginBottom: theme.spacing.s,
  textAlign: 'center',
}));

export const ButtonContainer = styled.View({
  marginTop: 'auto',
});

export const OverdraftSellDisclaimerText = styled(BaseText)(({ theme }) => ({
  ...theme.typography.legal,
  color: theme.colors.beta500,
  marginBottom: theme.spacing.s,
  textAlign: 'center',
}));

export const scrollViewStyles = css({
  flexGrow: 1,
});

export const LearnMoreLink = styled(BaseText)({
  textDecorationLine: 'underline',
});

export const AtomicPrivacyPolicyLink = styled(Link)({
  textDecorationLine: 'underline',
});

export const ExternalLink = styled(Link)(({ theme }) => ({
  color: theme.colors.alpha500,
}));

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

export const SetUpDirectDepositBottomSheetContainer = styled.View(({ theme }) => ({
  flex: 1,
  padding: theme.spacing.m,
}));

export const SetUpDirectDepositBottomSheetTitle = styled(BaseText)(({ theme }) => ({
  ...theme.typography.heading5,
  color: theme.colors.beta900,
  marginBottom: theme.spacing.xs,
}));

export const SetUpDirectDepositBottomSheetDescription = styled(BaseText)(({ theme }) => ({
  ...theme.typography.mainContentRegular,
  color: theme.colors.beta400,
  marginBottom: theme.spacing.m,
}));

export const SetUpDirectDepositBottomSheetButton = styled(MainButton)(({ theme }) => ({
  marginVertical: theme.spacing.m,
}));
