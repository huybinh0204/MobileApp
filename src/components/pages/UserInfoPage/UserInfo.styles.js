import styled from '@emotion/native';
import { BaseText } from '_components/atoms';

export const LoadingContainer = styled.View({
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
});

export const Content = styled.View(({ theme }) => ({
  flex: 1,
  alignItems: 'center',
  justifyContent: 'flex-start',
  paddingVertical: theme.spacing.s,
  paddingHorizontal: theme.spacing.m,
}));

export const ItemContainer = styled.View(({ theme, separator = true }) => ({
  borderBottomWidth: separator ? 1 : 0,
  borderColor: theme.colors.beta50,
  alignItems: 'center',
  flexDirection: 'row',
  paddingVertical: theme.spacing.s,
  width: '100%',
}));

export const Text = styled(BaseText)(({ theme }) => ({
  ...theme.typography.subContentSemiBold,
  color: theme.colors.beta900,
  marginLeft: theme.spacing.s,
}));

export const EditButton = styled.TouchableOpacity({
  marginLeft: 'auto',
});
