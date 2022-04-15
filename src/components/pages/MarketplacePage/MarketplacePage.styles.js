import styled from '@emotion/native';
import { VirtualizedList as RNVirtualizedList } from 'react-native';
import { normalize } from '_utilities/screen';
import { BaseText } from '_components/atoms';

export const Container = styled.View(({ theme }) => ({
  flex: 1,
  backgroundColor: theme.colors.background,
}));

export const VirtualizedList = styled(RNVirtualizedList)(({ theme }) => ({
  flex: 1,
}));

export const MarketplaceBanner = styled.Image(({ theme }) => ({
  width: 'auto',
  height: normalize(135),
  marginBottom: theme.spacing.s,
}));

export const Title = styled(BaseText)(({ theme }) => ({
  ...theme.typography.subContentRegular,
  color: theme.colors.blue200,
  marginBottom: theme.spacing.s,
  marginLeft: theme.spacing.general,
}));

export const ModalContainer = styled.View(({ theme }) => ({
  flex: 1,
  backgroundColor: theme.colors.white,
  borderRadius: 10,
  padding: theme.spacing.buttonHorizontalPadding,
}));

export const TitleModal = styled(BaseText)(({ theme }) => ({
  ...theme.typography.heading4,
  color: theme.colors.gray300,
  marginBottom: theme.spacing.s,
}));

export const DescriptionModal = styled(BaseText)(({ theme, isLink }) => ({
  ...theme.typography.subContentRegular,
  color: isLink ? theme.colors.blue200 : theme.colors.gray100,
  lineHeight: normalize(22.4),
}));

export const ButtonModalContainer = styled.View(({ theme }) => ({
  flex: 1,
  justifyContent: 'flex-end',
  paddingBottom: theme.spacing.s,
}));
