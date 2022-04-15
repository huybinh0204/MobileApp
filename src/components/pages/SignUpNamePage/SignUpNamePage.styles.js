import styled from '@emotion/native';
import { BaseText } from '_components/atoms';

export const Container = styled.View(({ theme }) => ({
  flex: 1,
  padding: theme.spacing.m,
}));

export const Title = styled(BaseText)(({ theme }) => ({
  ...theme.typography.heading5,
  color: theme.colors.beta900,
  marginBottom: theme.spacing.xs,
}));

export const Legend = styled(BaseText)(({ theme }) => ({
  ...theme.typography.subContentRegular,
  color: theme.colors.beta500,
  marginBottom: theme.spacing.m,
}));

export const ButtonContainer = styled.View({
  marginTop: 'auto',
});
