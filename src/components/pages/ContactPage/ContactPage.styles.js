import styled from '@emotion/native';
import { BaseText, MainButton } from '_components/atoms';

export const Content = styled.View(({ theme }) => ({
  flex: 1,
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing.m,
}));

export const MainTitle = styled(BaseText)(({ theme }) => ({
  ...theme.typography.heading4,
  color: theme.colors.beta900,
  marginBottom: theme.spacing.s,
  textAlign: 'center',
}));

export const RegularText = styled(BaseText)(({ theme }) => ({
  ...theme.typography.subContentRegular,
  color: theme.colors.beta900,
  textAlign: 'center',
}));

export const ContactButton = styled(MainButton)(({ theme }) => ({
  marginTop: theme.spacing.s,
}));

export const LinkText = styled(BaseText)(({ theme }) => ({
  ...theme.typography.subContentRegular,
  color: theme.colors.alpha500,
}));

export const SupportTitle = styled(BaseText)(({ theme }) => ({
  ...theme.typography.subContentSemiBold,
  color: theme.colors.beta500,
}));

export const Note = styled(BaseText)(({ theme }) => ({
  ...theme.typography.legal,
  color: theme.colors.beta500,
}));

export const SupportContainer = styled.View(({ theme }) => ({
  marginBottom: theme.spacing.s,
}));

export const BottomContainer = styled.View({
  flex: 1,
  width: '100%',
  alignItems: 'center',
  justifyContent: 'flex-end',
});
