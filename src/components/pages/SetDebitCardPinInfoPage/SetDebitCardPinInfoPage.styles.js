import styled from '@emotion/native';
import { BaseText, MainButton } from '_components/atoms';

export const Container = styled.View(({ theme }) => ({
  flex: 1,
  alignItems: 'center',
  padding: theme.spacing.m,
}));

export const Title = styled(BaseText)(({ theme }) => ({
  ...theme.typography.heading4,
  color: theme.colors.beta900,
  marginVertical: theme.spacing.s,
  textAlign: 'center',
}));

export const Description = styled(BaseText)(({ theme }) => ({
  ...theme.typography.subContentRegular,
  color: theme.colors.beta500,
  paddingHorizontal: theme.spacing.m,
  textAlign: 'center',
}));

export const SetPinButton = styled(MainButton)({
  marginTop: 'auto',
});
