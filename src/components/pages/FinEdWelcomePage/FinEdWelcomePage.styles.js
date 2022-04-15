import styled from '@emotion/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BaseText } from '_components/atoms';
import { normalize } from '_utilities/screen';

export const Container = styled(SafeAreaView)(({ theme }) => ({
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
}));

export const Content = styled.View(({ theme }) => ({
  flex: 1,
  padding: theme.spacing.s,
  paddingTop: theme.spacing.xxl,
  alignItems: 'center',
}));

export const Avatar = styled.View(({ theme }) => ({
  width: normalize(160),
  height: normalize(160),
  borderRadius: normalize(80),
  backgroundColor: theme.colors.alpha200,
  marginBottom: theme.spacing.s,
}));

export const Title = styled(BaseText)(({ theme }) => ({
  ...theme.typography.heading3,
  color: theme.colors.black,
  marginBottom: theme.spacing.s,
  textAlign: 'center',
  paddingHorizontal: theme.spacing.s,
  width: normalize(300),
}));

export const Description = styled(BaseText)(({ theme }) => ({
  ...theme.typography.subContentRegular,
  color: theme.colors.beta500,
  marginBottom: 'auto',
  textAlign: 'center',
  paddingHorizontal: theme.spacing.s,
}));

export const CloseButton = styled.TouchableOpacity(({ theme }) => ({
  position: 'absolute',
  right: theme.spacing.xs,
  padding: theme.spacing.s,
}));
