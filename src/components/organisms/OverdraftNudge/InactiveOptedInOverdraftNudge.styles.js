import styled from '@emotion/native';
import { BaseText } from '_components/atoms';

export const HeaderTitle = styled(BaseText)(({ theme }) => ({
  ...theme.typography.subContentSemiBold,
  color: theme.colors.beta900,
  marginBottom: theme.spacing.xss,
}));

export const HeaderDescription = styled.View(({ theme }) => ({
  flexDirection: 'row',
}));

export const ActivationStatus = styled(BaseText)(({ theme }) => ({
  ...theme.typography.tinyContentRegular,
  color: theme.colors.beta500,
}));

export const BodyDescription = styled(BaseText)(({ theme }) => ({
  ...theme.typography.tinyContentRegular,
  color: theme.colors.beta500,
  marginBottom: theme.spacing.s,
}));
