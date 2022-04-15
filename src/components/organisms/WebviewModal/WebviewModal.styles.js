import styled from '@emotion/native';
import { BaseText } from '_components/atoms';
import { normalize } from '_utilities/screen';

export const Container = styled.SafeAreaView(({ backgroundColor, theme }) => ({
  flex: 1,
  backgroundColor: backgroundColor ?? theme.colors.background,
}));

export const Header = styled.View({
  height: normalize(70),
  flexDirection: 'row',
  justifyContent: 'flex-end',
});

export const HeaderButton = styled.TouchableOpacity(({ theme }) => ({
  height: normalize(70),
  justifyContent: 'center',
  alignItems: 'center',
  paddingHorizontal: theme.spacing.m,
  alignSelf: 'flex-end',
  flex: 1,
}));

export const DoneText = styled(BaseText)(({ theme }) => ({
  ...theme.typography.subContentSemiBold,
  color: theme.colors.blue100,
}));

export const Content = styled.KeyboardAvoidingView({
  flex: 1,
});

export const LoadingIndicator = styled.ActivityIndicator(({ theme }) => ({
  backgroundColor: theme.colors.white,
  position: 'absolute',
  height: '100%',
  width: '100%',
}));
