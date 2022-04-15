import styled from '@emotion/native';
import { BaseText } from '_components/atoms';

export const HeaderRow = styled.View(({ theme }) => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: theme.spacing.xss,
}));

export const BoldText = styled(BaseText)(({ theme, color }) => ({
  ...theme.typography.subContentSemiBold,
  color: color ?? theme.colors.beta900,
}));

export const Status = styled.View({
  flexDirection: 'row',
});

export const TinyText = styled(BaseText)(({ theme, color }) => ({
  ...theme.typography.tinyContentRegular,
  color: color ?? theme.colors.beta500,
}));

export const TermsLink = styled(BaseText)(({ theme }) => ({
  ...theme.typography.tinyContentRegular,
  color: theme.colors.alpha500,
}));

export const Body = styled(BaseText)(({ theme }) => ({
  ...theme.typography.tinyContentRegular,
  color: theme.colors.beta500,
  marginBottom: theme.spacing.s,
}));
