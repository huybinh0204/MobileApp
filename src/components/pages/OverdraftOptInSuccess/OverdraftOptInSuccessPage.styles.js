import styled from '@emotion/native';
import { BaseText, IconSvg } from '_components/atoms';

export const OverdraftOptInSuccessContainer = styled.View(({ theme }) => ({
  flex: 1,
  alignItems: 'center',
  padding: theme.spacing.m,
}));

export const Icon = styled(IconSvg)(({ theme }) => ({
  marginBottom: theme.spacing.m,
}));

export const SuccessTitle = styled(BaseText)(({ theme }) => ({
  ...theme.typography.heading4,
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
