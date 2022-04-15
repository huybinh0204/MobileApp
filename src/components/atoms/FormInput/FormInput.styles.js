import styled from '@emotion/native';
import BaseText from '_components/atoms/BaseText/BaseText';

export const Container = styled.View(({ theme }) => ({
  marginBottom: theme.spacing.l,
}));

export const ErrorText = styled(BaseText)(({ theme }) => ({
  ...theme.typography.tinyContentRegular,
  color: theme.colors.epsilon500,
  marginVertical: theme.spacing.xs,
}));
