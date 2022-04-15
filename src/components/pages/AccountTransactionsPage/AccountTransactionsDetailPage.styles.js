import styled from '@emotion/native';
import { SectionList as RNSectionList } from 'react-native';
import { BaseText } from '_components/atoms';

export const SectionList = styled(RNSectionList)(({ theme }) => ({
  flex: 1,
  paddingHorizontal: theme.spacing.m,
}));

export const SectionHeader = styled(BaseText)(({ theme }) => ({
  ...theme.typography.heading5,
  color: theme.colors.beta900,
  backgroundColor: theme.colors.background,
}));

export const FullPageSpinner = styled.ActivityIndicator({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
});

export const NextPageSpinner = styled.ActivityIndicator(({ theme }) => ({
  paddingVertical: theme.spacing.s,
}));
