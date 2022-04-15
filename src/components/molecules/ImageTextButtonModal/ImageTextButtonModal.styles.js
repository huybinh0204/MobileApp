import styled from '@emotion/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BaseText } from '_components/atoms';

export const Inner = styled(SafeAreaView)(({ theme }) => ({
  flex: 1,
  backgroundColor: theme.colors.background,
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing.m,
  paddingTop: theme.spacing.xl,
}));

export const MainTitle = styled(BaseText)(({ theme }) => ({
  ...theme.typography.heading5,
  textAlign: 'center',
}));
