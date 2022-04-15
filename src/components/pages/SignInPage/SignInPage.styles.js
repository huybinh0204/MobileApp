import styled from '@emotion/native';
import { MainButton } from '_components/atoms';

export const FormContainer = styled.View(({ theme }) => ({
  flex: 1,
  padding: theme.spacing.m,
}));

export const ButtonContainer = styled.View({
  marginTop: 'auto',
});

export const StyledMainButton = styled(MainButton)(({ theme }) => ({
  marginBottom: theme.spacing.s,
}));
