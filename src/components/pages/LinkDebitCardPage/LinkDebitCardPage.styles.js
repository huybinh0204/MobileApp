import styled from '@emotion/native';
import { BaseText, IconSvg } from '_components/atoms';

export const MainContainer = styled.View(({ theme }) => ({
  alignItems: 'center',
  flex: 1,
  padding: theme.spacing.m,
}));

export const Title = styled(BaseText)(({ theme }) => ({
  ...theme.typography.heading4,
  color: theme.colors.beta900,
  marginBottom: theme.spacing.s,
  textAlign: 'center',
}));

export const Illustration = styled(IconSvg)(({ theme }) => ({
  marginVertical: theme.spacing.l,
}));

export const Subtitle = styled(BaseText)(({ theme }) => ({
  ...theme.typography.subContentRegular,
  color: theme.colors.beta500,
  textAlign: 'center',
}));

export const BottomContent = styled.View({
  marginTop: 'auto',
  width: '100%',
});
