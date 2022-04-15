import styled from '@emotion/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Card } from '_components/atoms';
import { normalize } from '_utilities/screen';

export const Container = styled.View(({ theme }) => ({
  flex: 1,
  backgroundColor: theme.colors.grayBackground,
}));

export const ImageHeader = styled.Image(() => ({
  width: '100%',
  height: '30%',
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
}));

export const Logo = styled.Image(({ theme }) => ({
  width: normalize(100),
  height: normalize(100),
  marginTop: normalize(40),
  marginHorizontal: theme.spacing.general,
  resizeMode: 'contain',
}));

export const Top = styled.View(() => ({
  marginTop: useSafeAreaInsets().top,
}));

export const WrappContent = styled.View(({ theme }) => ({
  flex: 1,
  marginVertical: theme.spacing.general,
}));

export const ScrollView = styled.ScrollView(() => ({}));

export const NamePartner = styled.Text(({ theme }) => ({
  ...theme.typography.mainContentSemiBold,
  color: theme.colors.gray300,
  lineHeight: theme.spacing.l,
  fontSize: normalize(24),
  marginHorizontal: theme.spacing.general,
}));

export const WrapInfo = styled(Card)(({ theme }) => ({
  backgroundColor: theme.colors.white,
  borderRadius: 10,
  paddingHorizontal: theme.spacing.general,
  paddingVertical: theme.spacing.general,
  marginBottom: normalize(20),
  marginHorizontal: theme.spacing.general,
  marginTop: normalize(10),
}));

export const TitleInfo = styled.Text(({ theme }) => ({
  ...theme.typography.mainContentSemiBold,
  color: theme.colors.gray300,
  lineHeight: theme.spacing.l,
  fontSize: normalize(16),
}));

export const DescriptionInfo = styled.Text(({ theme }) => ({
  ...theme.typography.mainContentRegular,
  color: theme.colors.gray100,
  lineHeight: theme.spacing.buttonHorizontalPadding,
}));

export const WrapButton = styled.View(({ theme }) => ({
  marginHorizontal: theme.spacing.general,
}));

export const LogoContainer = styled.View(({ theme }) => ({
  marginLeft: theme.spacing.general,
  marginTop: theme.spacing.l,
}));
