import styled from '@emotion/native';
import { BaseText, Card } from '_components/atoms';

export const ListContainer = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing.s,
}));

export const ListTitle = styled(BaseText)(({ theme }) => ({
  ...theme.typography.heading5,
  flex: 1,
  color: theme.colors.beta900,
  marginBottom: theme.spacing.s,
}));
