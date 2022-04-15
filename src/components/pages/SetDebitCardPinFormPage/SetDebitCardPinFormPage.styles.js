import styled from '@emotion/native';

export const Container = styled.View(({ theme }) => ({
  flex: 1,
  padding: theme.spacing.m,
}));

export const LoadingIndicator = styled.ActivityIndicator(({ theme }) => ({
  backgroundColor: theme.colors.background,
  position: 'absolute',
  height: '100%',
  width: '100%',
}));

export const LoadingIndicatorContainer = styled.View(() => ({
  flex: 1,
}));
