import styled from '@emotion/native';

export const ButtonContainer = styled.View(({ theme, isTransactionsEmpty }) => ({
  marginTop: isTransactionsEmpty ? theme.spacing.s : 0,
}));
