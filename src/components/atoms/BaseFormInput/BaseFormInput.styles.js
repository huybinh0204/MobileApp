import styled from '@emotion/native';

export const InputContainer = styled.View(({ theme }) => ({
  alignItems: 'center',
  flexDirection: 'row',
  width: '100%',
  borderBottomWidth: 1,
  borderBottomColor: theme.colors.alpha500,
}));

export const TextInput = styled.TextInput(({ theme, paddingLeft, paddingRight }) => ({
  ...theme.typography.mainContentRegular,
  flex: 1,
  paddingLeft: paddingLeft ? theme.spacing.s : theme.spacing.xs,
  paddingRight: paddingRight ? theme.spacing.s : theme.spacing.xs,
  paddingVertical: theme.spacing.s,
}));

export const IconLeftContainer = styled.View(({ theme }) => ({
  paddingLeft: theme.spacing.xs,
}));

export const IconRightContainer = styled.View(({ theme }) => ({
  paddingRight: theme.spacing.xs,
}));
