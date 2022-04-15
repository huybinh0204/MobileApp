import styled from '@emotion/native';
import RNCheckBox from '@react-native-community/checkbox';
import { BaseText, MainButton } from '_components/atoms';
import { normalize } from '_utilities/screen';

export const WebViewContainer = styled.View({
  flex: 1,
});

export const OptionsContainer = styled.View(({ theme }) => ({
  padding: theme.spacing.m,
}));

export const CheckboxContainer = styled.View(({ theme }) => ({
  flexDirection: 'row',
  marginBottom: theme.spacing.m,
  alignItems: 'center',
}));

export const CheckBox = styled(RNCheckBox)(({ theme }) => ({
  marginRight: theme.spacing.xs,
  width: normalize(24),
  height: normalize(24),
}));

export const AgreementText = styled(BaseText)(({ theme }) => ({
  ...theme.typography.tinyContentRegular,
  color: theme.colors.beta500,
}));

export const SubmitButton = styled(MainButton)({
  marginTop: 'auto',
});

export const LoadingIndicator = styled.ActivityIndicator(({ theme }) => ({
  backgroundColor: theme.colors.background,
  position: 'absolute',
  height: '100%',
  width: '100%',
}));
