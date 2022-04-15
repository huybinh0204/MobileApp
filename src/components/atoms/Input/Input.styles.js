import styled from '@emotion/native';
import Animated from 'react-native-reanimated';
import BaseText from '_components/atoms/BaseText/BaseText';
import IconSvg from '_components/atoms/IconSvg/IconSvg';
import { normalize } from '_utilities/screen';
import AnimatedLinearGradient from './AnimatedLinearGradient';

export const Container = styled(Animated.View)({
  borderRadius: 6,
  borderWidth: 2,
  width: '100%',
  zIndex: 0,
  alignItems: 'center',
  flexDirection: 'row',
});

export const AnimatedBackground = styled(AnimatedLinearGradient)({
  borderRadius: 6,
  position: 'absolute',
  width: '100%',
  height: '100%',
  zIndex: 1,
});

export const Placeholder = styled(BaseText)(({ theme }) => ({
  ...theme.typography.mainContentRegular,
  position: 'absolute',
  bottom: 0,
  left: normalize(14),
  zIndex: 2,
}));

export const TextInput = styled.TextInput(({ theme }) => ({
  ...theme.typography.mainContentSemiBold,
  color: theme.colors.beta900,
  paddingBottom: normalize(10),
  paddingTop: normalize(24),
  paddingHorizontal: normalize(14),
  flex: 1,
  zIndex: 3,
}));

export const Icon = styled(IconSvg)(({ theme }) => ({
  marginHorizontal: normalize(14),
  zIndex: 3,
}));
