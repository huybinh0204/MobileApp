import styled from '@emotion/native';

export const Container = styled.SafeAreaView(({ theme }) => ({
  flex: 1,
  backgroundColor: theme.colors.background,
}));

export const Content = styled.KeyboardAvoidingView({
  flex: 1,
});
