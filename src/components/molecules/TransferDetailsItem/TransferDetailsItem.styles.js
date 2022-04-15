import styled from '@emotion/native';
import { BaseText } from '_components/atoms';

export const TransferDetailsItemContainer = styled.View(({ theme, isLastItem }) => ({
  alignSelf: 'stretch',
  alignItems: 'center',
  flexDirection: 'row',
  justifyContent: 'space-between',
  borderBottomColor: isLastItem ? theme.colors.transparent : theme.colors.beta50,
  borderBottomWidth: 1,
  paddingVertical: theme.spacing.s,
  marginBottom: isLastItem ? theme.spacing.s : 0,
}));

export const TransferDetailsItemText = styled(BaseText)(({ theme }) => ({
  ...theme.typography.tinyContentRegular,
  color: theme.colors.beta900,
}));
