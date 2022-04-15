import styled from '@emotion/native';
import { BaseText } from '_components/atoms';

export const Content = styled.View(({ theme }) => ({
  flex: 1,
  padding: theme.spacing.m,
}));

export const Text = styled(BaseText)(({ theme }) => ({
  ...theme.typography.subContentRegular,
  color: theme.colors.beta500,
  textAlign: 'center',
  marginBottom: theme.spacing.m,
  paddingHorizontal: theme.spacing.xl,
}));

export const Cell = styled(BaseText)(({ theme }) => ({
  ...theme.typography.mainContentRegular,
  color: theme.colors.beta900,
  lineHeight: theme.spacing.l,
  textAlign: 'center',
  width: theme.spacing.m,
  height: theme.spacing.l,
}));

export const CellContainer = styled.View(({ isFocused, symbol, theme, isError }) => ({
  backgroundColor: isFocused || symbol ? theme.colors.white : theme.colors.beta50,
  borderColor: isFocused
    ? theme.colors.beta100
    : isError
    ? theme.colors.epsilon500
    : theme.colors.transparent,
  borderRadius: 8,
  borderWidth: 1,
  marginLeft: theme.spacing.xs,
}));

export const Placeholder = styled(BaseText)(({ theme }) => ({
  color: theme.colors.beta200,
}));

export const Separator = styled.View(({ theme }) => ({
  alignSelf: 'center',
  backgroundColor: theme.colors.beta200,
  marginLeft: theme.spacing.xs,
  height: 2,
  width: 6,
}));

export const ButtonContainer = styled.View({
  flex: 1,
  justifyContent: 'flex-end',
});

export const CodeFieldContainer = styled.View({
  alignItems: 'center',
});
