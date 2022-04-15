import styled from '@emotion/native';

export const Container = styled.View(({ theme }) => ({
  flex: 1,
  padding: theme.spacing.m,
}));

export const Row = styled.View({
  flexDirection: 'row',
});

export const InputContainer = styled.View(({ marginRight, theme }) => ({
  flex: 1,
  marginRight: marginRight ? theme.spacing.general : 0,
}));

export const ButtonContainer = styled.View({
  flex: 1,
  alignItems: 'center',
  justifyContent: 'flex-end',
});
