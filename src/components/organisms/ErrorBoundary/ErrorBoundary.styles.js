import styled from '@emotion/native';
import { BaseText } from '_components/atoms';
import { normalize } from '_utilities/screen';

export const Container = styled.View(({ theme }) => ({
  flex: 1,
  backgroundColor: theme.colors.opacitybeta900,
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing.m,
}));

export const MessageContainer = styled.View(({ theme }) => ({
  width: '100%',
  height: normalize(260),
  padding: theme.spacing.s,
  backgroundColor: theme.colors.white,
  borderRadius: theme.spacing.xs,
  justifyContent: 'space-between',
}));

export const TitleError = styled(BaseText)(({ theme }) => ({
  ...theme.typography.heading5,
  color: theme.colors.beta900,
  marginBottom: theme.spacing.xs,
  paddingHorizontal: theme.spacing.s,
  textAlign: 'center',
}));

export const DescriptionError = styled(BaseText)(({ theme }) => ({
  ...theme.typography.mainContentRegular,
  color: theme.colors.beta500,
  marginBottom: theme.spacing.m,
  textAlign: 'center',
}));

export const LinkEmail = styled(BaseText)(({ theme }) => ({
  ...theme.typography.mainContentRegular,
  color: theme.colors.alpha500,
  marginBottom: theme.spacing.m,
  textAlign: 'center',
}));
