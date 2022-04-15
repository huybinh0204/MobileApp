import styled from '@emotion/native';
import { StyleSheet } from 'react-native';
import { BaseText } from '_components/atoms';

export const Separator = styled.View(({ theme }) => ({
  borderColor: theme.colors.beta50,
  borderWidth: StyleSheet.hairlineWidth,
  marginVertical: theme.spacing.s,
}));

export const BottomSheetContainer = styled.View(({ theme }) => ({
  backgroundColor: theme.colors.white,
  padding: theme.spacing.m,
}));

export const Header = styled.View(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: theme.spacing.m,
}));

export const BottomSheetTitle = styled(BaseText)(({ theme }) => ({
  ...theme.typography.heading6,
  color: theme.colors.beta900,
  width: '85%',
}));

export const Remove = styled(BaseText)(({ theme }) => ({
  ...theme.typography.subContentSemiBold,
  color: theme.colors.alpha500,
}));
