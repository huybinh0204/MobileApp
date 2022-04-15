import styled from '@emotion/native';
import { BaseText, MainButton } from '_components/atoms';

export const DetailsSheetContainer = styled.View(({ theme }) => ({
  padding: theme.spacing.m,
}));

export const DetailsSheetTitle = styled(BaseText)(({ theme }) => ({
  ...theme.typography.heading5,
  color: theme.colors.beta900,
  marginBottom: theme.spacing.s,
  textAlign: 'center',
}));

export const DetailsSheetSubmitButton = styled(MainButton)(({ theme }) => ({
  marginBottom: theme.spacing.s,
}));

export const DetailsSheetDisclaimer = styled(BaseText)(({ theme }) => ({
  ...theme.typography.legal,
  color: theme.colors.beta500,
  marginBottom: theme.spacing.s,
  textAlign: 'center',
}));
