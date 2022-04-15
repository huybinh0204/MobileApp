import styled from '@emotion/native';
import { BaseText } from '_components/atoms';

export const Container = styled.View(({ theme }) => ({
  flex: 1,
  padding: theme.spacing.m,
  justifyContent: 'space-between',
}));

export const ConfirmPhoneTitle = styled(BaseText)(({ theme }) => ({
  ...theme.typography.heading5,
  color: theme.colors.beta900,
  marginBottom: theme.spacing.l,
  textAlign: 'left',
}));
