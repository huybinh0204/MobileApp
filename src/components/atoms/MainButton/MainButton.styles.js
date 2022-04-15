import styled from '@emotion/native';
import BaseText from '_components/atoms/BaseText/BaseText';
import { COLORS } from '_constants';

export const colors = (disabled) => ({
  primary: {
    background: disabled ? COLORS.beta100 : COLORS.alpha500,
    content: COLORS.white,
  },
  secondary: {
    background: disabled ? COLORS.beta100 : COLORS.alpha100,
    content: disabled ? COLORS.white : COLORS.alpha500,
  },
  critical: {
    background: disabled ? COLORS.beta100 : COLORS.epsilon500,
    content: COLORS.white,
  },
  link: {
    background: COLORS.transparent,
    content: disabled ? COLORS.beta100 : COLORS.alpha500,
  },
});

export const Button = styled.TouchableOpacity(({ disabled, theme, variant }) => ({
  alignSelf: 'stretch',
  backgroundColor: colors(disabled)[variant].background,
  borderRadius: 10,
  paddingHorizontal: theme.spacing.buttonHorizontalPadding,
  paddingVertical: theme.spacing.buttonVerticalPadding,
}));

export const Label = styled(BaseText)(({ disabled, theme, variant }) => ({
  ...theme.typography.subContentSemiBold,
  color: colors(disabled)[variant].content,
  textAlign: 'center',
}));
