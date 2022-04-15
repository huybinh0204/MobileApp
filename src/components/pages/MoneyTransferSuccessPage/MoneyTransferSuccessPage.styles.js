import styled from '@emotion/native';
import { BaseText, IconSvg } from '_components/atoms';

export const MoneyTransferSuccessContainer = styled.View(({ theme }) => ({
  flex: 1,
  alignItems: 'center',
  padding: theme.spacing.m,
}));

export const Icon = styled(IconSvg)(({ theme }) => ({
  marginBottom: theme.spacing.m,
}));

export const Title = styled(BaseText)(({ theme }) => ({
  ...theme.typography.heading5,
  color: theme.colors.beta900,
  marginBottom: theme.spacing.m,
  textAlign: 'center',
}));

export const ButtonContainer = styled.View({
  alignSelf: 'stretch',
  marginTop: 'auto',
});

export const InstantTransferDisclaimer = styled(BaseText)(({ theme }) => ({
  ...theme.typography.legal,
  color: theme.colors.beta500,
  marginBottom: theme.spacing.s,
  textAlign: 'center',
}));
