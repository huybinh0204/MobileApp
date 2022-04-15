import styled from '@emotion/native';
import { BaseText } from '_components/atoms';

export const Container = styled.View(({ theme }) => ({
  flex: 1,
  padding: theme.spacing.m,
}));

export const PhoneNumberTitle = styled(BaseText)(({ theme }) => ({
  ...theme.typography.heading5,
  color: theme.colors.beta900,
  marginBottom: theme.spacing.m,
}));

export const ErrorMessage = styled(BaseText)(({ theme }) => ({
  ...theme.typography.subContentRegular,
  color: theme.colors.epsilon500,
  marginTop: theme.spacing.xs,
  textAlign: 'left',
}));

export const DisclosureContainer = styled.View({
  marginTop: 'auto',
});

export const Disclosure = styled(BaseText)(({ theme }) => ({
  ...theme.typography.legal,
  color: theme.colors.beta500,
  marginBottom: theme.spacing.s,
  textAlign: 'center',
}));

export const Hyperlink = styled(Disclosure)(({ theme }) => ({
  color: theme.colors.alpha500,
}));

export const PhoneInputContainer = styled.View(() => ({
  flexDirection: 'row',
  alignItems: 'center',
  width: '100%',
  justifyContent: 'space-between',
}));

export const Row = styled.View({
  flexDirection: 'row',
});

export const InputRow = styled.View(({ flex, theme, marginRight }) => ({
  flex,
  marginRight: marginRight ? theme.spacing.s : 0,
}));
