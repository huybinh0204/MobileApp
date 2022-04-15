import styled from '@emotion/native';
import BaseText from '_components/atoms/BaseText/BaseText';

export const PlaidButtonContainer = styled.View(({ disabled, theme }) => ({
  minWidth: '100%',
  backgroundColor: disabled ? theme.colors.beta100 : theme.colors.alpha500,
  borderRadius: 10,
  paddingHorizontal: theme.spacing.buttonHorizontalPadding,
  paddingVertical: theme.spacing.buttonVerticalPadding,
}));

export const Label = styled(BaseText)(({ theme }) => ({
  ...theme.typography.subContentSemiBold,
  color: theme.colors.white,
  textAlign: 'center',
}));
