import styled from '@emotion/native';
import { BaseText, MainButton } from '_components/atoms';

export const MainContainer = styled.View(({ theme }) => ({
  alignItems: 'center',
  flex: 1,
  padding: theme.spacing.m,
}));

export const Legend = styled(BaseText)(({ theme }) => ({
  ...theme.typography.subContentRegular,
  color: theme.colors.beta500,
  textAlign: 'center',
}));

export const ConfirmAmountButton = styled(MainButton)({
  marginTop: 'auto',
});

export const TransferLimit = styled(BaseText)(({ theme }) => ({
  ...theme.typography.legal,
  color: theme.colors.beta500,
  textAlign: 'center',
  marginBottom: theme.spacing.s,
}));
