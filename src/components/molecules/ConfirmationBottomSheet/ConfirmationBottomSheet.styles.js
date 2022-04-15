import styled from '@emotion/native';
import { BaseText, MainButton } from '_components/atoms';

export const BottomSheetContainer = styled.View(({ theme }) => ({
  backgroundColor: theme.colors.white,
  padding: theme.spacing.m,
}));

export const BottomSheetTitle = styled(BaseText)(({ theme }) => ({
  ...theme.typography.heading6,
  color: theme.colors.beta900,
  marginBottom: theme.spacing.s,
}));

export const BottomSheetDescription = styled(BaseText)(({ theme }) => ({
  ...theme.typography.mainContentRegular,
  color: theme.colors.beta500,
  marginBottom: theme.spacing.m,
}));

export const ButtonsContainer = styled.View({
  flex: 1,
  justifyContent: 'flex-end',
});

export const ActionButton = styled(MainButton)(({ theme }) => ({
  marginBottom: theme.spacing.s,
}));
