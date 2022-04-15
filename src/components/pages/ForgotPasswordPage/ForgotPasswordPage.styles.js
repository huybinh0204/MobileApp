import styled from '@emotion/native';
import { BaseText, FormSubmitButton } from '_components/atoms';

export const Container = styled.View(({ theme }) => ({
  flex: 1,
  alignItems: 'center',
  padding: theme.spacing.m,
}));

export const Legend = styled(BaseText)(({ theme }) => ({
  ...theme.typography.subContentRegular,
  color: theme.colors.beta500,
  textAlign: 'center',
  marginHorizontal: theme.spacing.l,
  marginBottom: theme.spacing.m,
}));

export const SubmitButton = styled(FormSubmitButton)({
  marginTop: 'auto',
});

export const FormInputContainer = styled.View(() => ({
  width: '100%',
}));
