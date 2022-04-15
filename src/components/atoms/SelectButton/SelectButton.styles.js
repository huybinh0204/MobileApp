import styled from '@emotion/native';
import BaseText from '_components/atoms/BaseText/BaseText';
import IconSvg from '_components/atoms/IconSvg/IconSvg';

export const Button = styled.TouchableOpacity(({ theme, disabled, selected }) => ({
  backgroundColor: disabled ? theme.colors.beta100 : theme.colors.white,
  borderColor: selected ? theme.colors.alpha500 : theme.colors.beta100,
  borderRadius: 10,
  borderWidth: 1,
  alignItems: 'center',
  flex: 1,
  flexDirection: 'row',
  padding: theme.spacing.buttonVerticalPadding,
}));

export const Icon = styled(IconSvg)(({ theme }) => ({
  marginRight: theme.spacing.xs,
}));

export const Text = styled(BaseText)(({ theme }) => ({
  ...theme.typography.tinyContentRegular,
  flex: 1,
  color: theme.colors.beta500,
  textAlign: 'center',
}));
