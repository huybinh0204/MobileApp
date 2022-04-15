import styled from '@emotion/native';
import { BaseText, IconSvg, Link, MainButton } from '_components/atoms';
import { normalize } from '_utilities/screen';

export const Container = styled.View(({ theme }) => ({
  flex: 1,
  padding: theme.spacing.m,
}));

export const StatusIcon = styled(IconSvg)({
  alignSelf: 'center',
});

export const ContentTitle = styled(BaseText)(({ theme }) => ({
  ...theme.typography.heading4,
  color: theme.colors.beta900,
  marginTop: theme.spacing.l,
  marginBottom: theme.spacing.s,
  textAlign: 'center',
}));

export const Content = styled(BaseText)(({ theme }) => ({
  ...theme.typography.subContentRegular,
  color: theme.colors.beta500,
  textAlign: 'center',
}));

export const Button = styled(MainButton)({
  marginTop: 'auto',
});

export const CardTitle = styled(BaseText)(({ theme }) => ({
  ...theme.typography.subContentSemiBold,
  color: theme.colors.beta900,
  marginBottom: theme.spacing.xss,
}));

export const CardBody = styled(BaseText)(({ theme }) => ({
  ...theme.typography.subContentRegular,
  color: theme.colors.beta900,
}));

export const Card = styled.View(({ theme }) => ({
  backgroundColor: theme.colors.white,
  borderRadius: 10,
  borderColor: theme.colors.beta100,
  borderWidth: 1,
  marginVertical: theme.spacing.xs,
  padding: theme.spacing.s,
  flexDirection: 'row',
  height: normalize(140),
}));

export const TextLink = styled(BaseText)(({ theme }) => ({
  ...theme.typography.subContentRegular,
  color: theme.colors.alpha500,
}));

export const CardContainer = styled.View(({ theme }) => ({
  paddingLeft: theme.spacing.s,
  flex: 1,
}));

export const SheetContainer = styled.View(({ theme }) => ({
  flex: 1,
  padding: theme.spacing.m,
}));

export const BottomTitle = styled(BaseText)(({ theme }) => ({
  ...theme.typography.heading5,
  color: theme.colors.beta900,
  marginBottom: theme.spacing.xs,
}));

export const Description = styled(BaseText)(({ theme }) => ({
  ...theme.typography.mainContentRegular,
  color: theme.colors.beta400,
  marginBottom: theme.spacing.s,
}));

export const DescriptionLink = styled(Link)(({ theme }) => ({
  ...theme.typography.mainContentRegular,
  color: theme.colors.alpha500,
}));

export const BottomSheetButton = styled(MainButton)(({ theme }) => ({
  marginTop: theme.spacing.m,
}));
