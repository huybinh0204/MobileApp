import styled from '@emotion/native';
import RNCheckBox from '@react-native-community/checkbox';
import { BaseText, IconSvg, MainButton } from '_components/atoms';
import { normalize } from '_utilities/screen';

export const Content = styled.View(({ theme }) => ({
  flex: 1,
}));

export const Logo = styled(IconSvg)(({ theme }) => ({
  marginTop: theme.spacing.m,
  marginBottom: 'auto',
  alignSelf: 'center',
}));

export const CheckboxContainer = styled.View(({ theme }) => ({
  flexDirection: 'row',
  marginTop: theme.spacing.m,
}));

export const CheckBox = styled(RNCheckBox)(({ theme }) => ({
  marginRight: theme.spacing.xs,
  width: normalize(24),
  height: normalize(24),
}));

export const AgreementText = styled(BaseText)(({ theme }) => ({
  ...theme.typography.tinyContentRegular,
  color: theme.colors.beta500,
  flex: 1,
}));

export const Hyperlink = styled(AgreementText)(({ theme }) => ({
  color: theme.colors.alpha500,
}));

export const SubmitButton = styled(MainButton)(({ theme }) => ({
  marginTop: theme.spacing.l,
}));

export const LoadingIndicator = styled.ActivityIndicator(({ theme }) => ({
  backgroundColor: theme.colors.white,
  position: 'absolute',
  height: '100%',
  width: '100%',
}));

export const CheckboxSpacing = styled.View(({ theme }) => ({
  paddingVertical: theme.spacing.s,
  paddingHorizontal: theme.spacing.m,
}));
