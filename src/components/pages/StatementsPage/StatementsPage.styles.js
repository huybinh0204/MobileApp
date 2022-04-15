import styled from '@emotion/native';
import { StyleSheet } from 'react-native';
import { BaseText, IconSvg, MainButton } from '_components/atoms';
import { normalize } from '_utilities/screen';

export const LoadingContainer = styled.View({
  flex: 1,
  justifyContent: 'center',
});

export const StatementsFlatList = styled.FlatList(({ theme }) => ({
  flex: 1,
  padding: theme.spacing.m,
}));

export const ListRow = styled.View(({ isPressed }) => ({
  opacity: isPressed ? 0.5 : 1,
  flexDirection: 'row',
  alignItems: 'center',
  height: normalize(60),
}));

export const Separator = styled.View(({ theme }) => ({
  alignSelf: 'stretch',
  borderColor: theme.colors.beta50,
  borderWidth: StyleSheet.hairlineWidth,
}));

export const Title = styled(BaseText)(({ theme }) => ({
  ...theme.typography.subContentSemiBold,
  color: theme.colors.beta900,
  flex: 1,
}));

export const EmptyStatementContainer = styled.View(({ theme }) => ({
  flex: 1,
  alignItems: 'center',
  padding: theme.spacing.m,
}));

export const Illustration = styled(IconSvg)(({ theme }) => ({
  marginVertical: theme.spacing.m,
}));

export const MainTitle = styled(BaseText)(({ theme }) => ({
  ...theme.typography.heading4,
  color: theme.colors.beta900,
  marginBottom: theme.spacing.s,
  textAlign: 'center',
}));

export const SecondaryTitle = styled(BaseText)(({ theme }) => ({
  ...theme.typography.subContentRegular,
  color: theme.colors.beta500,
  textAlign: 'center',
}));

export const GoToTransactionsButton = styled(MainButton)({
  marginTop: 'auto',
});
