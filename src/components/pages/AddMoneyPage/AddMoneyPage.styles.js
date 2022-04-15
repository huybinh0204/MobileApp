import styled from '@emotion/native';
import { BaseText, MainButton } from '_components/atoms';

export const AddMoneyContainer = styled.View(({ theme }) => ({
  alignItems: 'center',
  flex: 1,
  padding: theme.spacing.m,
}));

export const AddMoneyLegend = styled(BaseText)(({ theme }) => ({
  ...theme.typography.subContentRegular,
  color: theme.colors.beta500,
  textAlign: 'center',
}));

export const InfoContainer = styled.View({
  flex: 1,
  alignItems: 'center',
  justifyContent: 'flex-start',
});

export const ConfirmAmountButton = styled(MainButton)({
  marginTop: 'auto',
});

export const AddMoneyLimitMessage = styled(BaseText)(({ theme }) => ({
  ...theme.typography.legal,
  color: theme.colors.beta500,
  textAlign: 'center',
  marginBottom: theme.spacing.s,
}));
