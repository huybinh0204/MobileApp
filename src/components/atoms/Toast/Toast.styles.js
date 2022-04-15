import styled from '@emotion/native';
import Animated from 'react-native-reanimated';
import BaseText from '_components/atoms/BaseText/BaseText';
import Card from '_components/atoms/Card/Card';
import { COLORS, ICONS } from '_constants';
import { normalize } from '_utilities/screen';
import IconSvg from '../IconSvg/IconSvg';

export const Container = styled(Animated.View)(({ paddingHorizontal, theme }) => ({
  position: 'absolute',
  bottom: 0,
  width: '100%',
  alignItems: 'center',
  paddingHorizontal: paddingHorizontal ?? theme.spacing.m,
}));

export const toastVariants = {
  error: {
    background: COLORS.epsilon500,
    color: COLORS.epsilon500,
    closeIcon: ICONS.closeError,
    icon: ICONS.circledExclamation,
  },
  success: {
    background: COLORS.successGreen1,
    color: COLORS.successGreen1,
    closeIcon: ICONS.closeSuccess,
    icon: ICONS.circledCheckmark,
  },
  alert: {
    background: COLORS.zeta800,
    color: COLORS.zeta800,
    closeIcon: ICONS.closeAlert,
    icon: ICONS.toastAlert,
  },
  info: {
    background: COLORS.alpha500,
    color: COLORS.alpha500,
    closeIcon: ICONS.closeInfo,
    icon: ICONS.toastInfo,
  },
};

export const ToastCard = styled(Card)(({ type }) => ({
  width: '100%',
  borderWidth: 1,
  borderColor: toastVariants[type].color,
  backgroundColor: toastVariants[type].background,
}));

export const Header = styled.View({
  flexDirection: 'row',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
});

export const Title = styled(BaseText)(({ theme, type }) => ({
  ...theme.typography.tinyContentBold,
  color: theme.colors.white,
  flex: 1,
  paddingHorizontal: normalize(10),
  paddingTop: 2,
}));

export const Body = styled(BaseText)(({ theme, type }) => ({
  ...theme.typography.tinyContentRegular,
  color: theme.colors.white,
  paddingHorizontal: normalize(30),
  paddingTop: 3,
}));

export const CloseIcon = styled(IconSvg)(({ theme, type }) => ({
  width: normalize(theme.spacing.general),
  height: normalize(theme.spacing.general),
}));
