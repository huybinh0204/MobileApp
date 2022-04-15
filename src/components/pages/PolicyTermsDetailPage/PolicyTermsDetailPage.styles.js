import styled from '@emotion/native';

export const Container = styled.SafeAreaView(({ theme }) => ({
  flex: 1,
  alignContent: 'center',
  backgroundColor: theme.colors.white,
}));

export const ActivityIndicator = styled.ActivityIndicator(({ theme }) => ({
  flex: 1,
  justifyContent: 'flex-start',
  backgroundColor: theme.colors.white,
}));
