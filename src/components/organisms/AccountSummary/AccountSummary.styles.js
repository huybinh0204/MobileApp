import styled from '@emotion/native';
import { BaseText, IconSvg, MainButton } from '_components/atoms';

export const Container = styled.View(({ theme }) => ({
  marginBottom: theme.spacing.s,
  paddingHorizontal: theme.spacing.s,
  paddingBottom: theme.spacing.s,
}));

export const Greeting = styled(BaseText)(({ theme }) => ({
  ...theme.typography.heading5,
  color: theme.colors.beta900,
  fontWeight: 'normal',
  marginBottom: theme.spacing.m,
}));

export const UserName = styled(BaseText)({
  fontWeight: 'bold',
});

export const Content = styled.View({
  flexDirection: 'row',
});

export const Column = styled.View({
  flex: 1,
  justifyContent: 'flex-end',
});

export const Illustration = styled(IconSvg)({
  alignSelf: 'flex-end',
});

export const BankAccountLabel = styled(BaseText)(({ theme }) => ({
  ...theme.typography.tinyContentRegular,
  color: theme.colors.beta500,
}));

export const ViewAccountButton = styled(MainButton)(({ theme }) => ({
  marginTop: theme.spacing.s,
}));
