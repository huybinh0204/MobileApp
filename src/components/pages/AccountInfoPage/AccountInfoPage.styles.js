import styled from '@emotion/native';
import { BaseText, IconSvg } from '_components/atoms';

export const Content = styled.View(({ theme }) => ({
  flex: 1,
  alignItems: 'center',
  paddingHorizontal: theme.spacing.m,
}));

export const Logo = styled(IconSvg)(({ theme }) => ({
  marginVertical: theme.spacing.m,
}));

export const DataRow = styled.TouchableOpacity(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderBottomWidth: 1,
  borderColor: theme.colors.beta50,
  paddingVertical: theme.spacing.s,
}));

export const DataLabel = styled(BaseText)(({ theme }) => ({
  ...theme.typography.subContentSemiBold,
  color: theme.colors.black,
  flex: 1,
}));

export const DataValue = styled(BaseText)(({ theme }) => ({
  ...theme.typography.subContentSemiBold,
  color: theme.colors.alpha500,
}));
