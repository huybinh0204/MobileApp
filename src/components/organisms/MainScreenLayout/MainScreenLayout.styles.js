import styled from '@emotion/native';

export const Container = styled.SafeAreaView(({ backgroundColor, theme }) => ({
  flex: 1,
  backgroundColor: backgroundColor ?? theme.colors.background,
}));

export const Content = styled.KeyboardAvoidingView({
  flex: 1,
});
