import styled from '@emotion/native';
import BaseText from '_components/atoms/BaseText/BaseText';
import { transactionTypes } from '_utilities/currency';

export const BottomActionText = styled(BaseText)(({ theme }) => ({
  ...theme.typography.subContentSemiBold,
  color: theme.colors.alpha500,
}));

// Transaction render Item.
export const TransactionTitle = styled(BaseText)(({ theme }) => ({
  ...theme.typography.subContentSemiBold,
  color: theme.colors.beta900,
  marginVertical: theme.spacing.xs,
}));

export const TransactionSub = styled(BaseText)(({ theme }) => ({
  ...theme.typography.tinyContentRegular,
  color: theme.colors.beta400,
}));

export const TransactionAmount = styled(BaseText)(({ theme, type }) => {
  const isCredit = type === transactionTypes.CREDIT;
  const fontStyles = isCredit
    ? theme.typography.subContentSemiBold
    : theme.typography.subContentRegular;
  return {
    ...fontStyles,
    color: isCredit ? theme.colors.alpha500 : theme.colors.beta900,
    marginTop: theme.spacing.xs,
  };
});

export const Container = styled.View(({ theme, isLastItem }) => ({
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginVertical: theme.spacing.xs,
  borderBottomColor: isLastItem ? theme.colors.transparent : theme.colors.beta50,
  borderBottomWidth: 1,
  paddingBottom: theme.spacing.s,
}));

export const BoderItem = styled.View(({ theme }) => ({
  marginVertical: theme.spacing.s,
  borderBottomColor: theme.colors.beta50,
  borderBottomWidth: 1,
}));

export const TitleContainer = styled.View(({ theme }) => ({
  flex: 1,
  paddingRight: theme.spacing.s,
}));
