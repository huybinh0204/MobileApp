import styled, { css } from '@emotion/native';
import Spacing from '_constants/Spacing';

export const Container = styled.SafeAreaView(({ theme }) => ({
  flex: 1,
  backgroundColor: theme.colors.white,
}));

export const listStyles = css({
  paddingHorizontal: Spacing.m,
});
