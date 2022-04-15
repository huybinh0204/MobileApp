import styled, { css } from '@emotion/native';
import { BaseText, MainButton } from '_components/atoms';

export const Container = styled.View(({ theme }) => ({
  flex: 1,
  padding: theme.spacing.m,
}));

export const BirthTitle = styled(BaseText)(({ theme }) => ({
  ...theme.typography.heading5,
  color: theme.colors.beta900,
  marginBottom: theme.spacing.xs,
}));

export const BirthLegend = styled(BaseText)(({ theme }) => ({
  ...theme.typography.subContentRegular,
  color: theme.colors.beta500,
  marginBottom: theme.spacing.m,
}));

export const Row = styled.View({
  flexDirection: 'row',
});

export const InputContainer = styled.View(({ flex, marginRight, theme }) => ({
  flex,
  marginRight: marginRight ? theme.spacing.s : 0,
}));

export const ContinueButton = styled(MainButton)({
  marginTop: 'auto',
});

export const Error = styled(BaseText)(({ theme }) => ({
  ...theme.typography.subContentRegular,
  color: theme.colors.epsilon500,
  marginTop: theme.spacing.xs,
  textAlign: 'left',
}));

export const sheetContainerStyles = css({
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
});

export const SheetContainer = styled.View(({ theme }) => ({
  padding: theme.spacing.m,
  justifyContent: 'space-between',
}));

export const Paragraph = styled(BaseText)(({ theme }) => ({
  ...theme.typography.mainContentRegular,
  color: theme.colors.beta500,
  marginBottom: theme.spacing.m,
}));

export const ParagraphTitle = styled(BaseText)(({ theme }) => ({
  ...theme.typography.mainContentSemiBold,
  color: theme.colors.beta500,
}));

export const Link = styled(BaseText)(({ theme }) => ({
  ...theme.typography.link,
  color: theme.colors.alpha500,
}));
