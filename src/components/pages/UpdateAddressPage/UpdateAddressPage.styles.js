import styled from '@emotion/native';

export const Container = styled.View(({ theme }) => ({
  flex: 1,
  padding: theme.spacing.m,
}));

export const ButtonContainer = styled.View({
  flex: 1,
  alignItems: 'center',
  justifyContent: 'flex-end',
});
