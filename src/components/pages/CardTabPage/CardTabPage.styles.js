import styled, { css } from '@emotion/native';
import { BaseText, IconSvg, Link, MainButton } from '_components/atoms';
import Spacing from '_constants/Spacing';

export const DebitCardBanner = styled(IconSvg)(({ theme }) => ({
  alignSelf: 'center',
  marginVertical: theme.spacing.s,
}));

export const DebitCardDisclaimer = styled(BaseText)(({ theme }) => ({
  ...theme.typography.legal,
  color: theme.colors.beta500,
  marginBottom: theme.spacing.s,
  marginHorizontal: theme.spacing.m,
  textAlign: 'center',
}));

export const BottomSheetContainer = styled.View(({ theme }) => ({
  paddingHorizontal: theme.spacing.m,
}));

export const BottomSheetTitle = styled(BaseText)(({ theme }) => ({
  ...theme.typography.heading5,
  color: theme.colors.beta900,
  marginBottom: theme.spacing.xs,
}));

export const BottomSheetContent = styled(BaseText)(({ theme }) => ({
  ...theme.typography.mainContentRegular,
  color: theme.colors.beta500,
  marginBottom: theme.spacing.s,
}));

export const SupportNumberLink = styled(Link)(({ theme }) => ({
  color: theme.colors.delta500,
  marginBottom: theme.spacing.s,
}));

export const BottomSheetButton = styled(MainButton)(({ theme }) => ({
  marginTop: theme.spacing.s,
}));

export const listStyles = css({
  paddingHorizontal: Spacing.m,
});
