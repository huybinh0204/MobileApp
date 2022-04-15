import styled from '@emotion/native';
import { BaseText, Card, MainButton } from '_components/atoms';

export const NudgeCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing.s,
}));

export const Row = styled.View(({ theme }) => ({
  flexDirection: 'row',
  marginBottom: theme.spacing.xs,
}));

export const Column = styled.View({
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
});

export const Title = styled(BaseText)(({ theme }) => ({
  ...theme.typography.tinyContentRegular,
  color: theme.colors.beta500,
}));

export const Value = styled(BaseText)(({ theme }) => ({
  ...theme.typography.heading6,
  color: theme.colors.beta900,
}));

export const MoveMoneyBottomSheetContainer = styled.View(({ theme }) => ({
  flex: 1,
  padding: theme.spacing.m,
}));

export const MoveMoneyBottomSheetTitle = styled(BaseText)(({ theme }) => ({
  ...theme.typography.heading5,
  color: theme.colors.beta900,
  marginBottom: theme.spacing.xs,
}));

export const SecondaryText = styled(BaseText)(({ theme }) => ({
  ...theme.typography.mainContentRegular,
  color: theme.colors.beta400,
  marginBottom: theme.spacing.m,
}));

export const ListItemDivider = styled.View(({ theme }) => ({
  marginVertical: theme.spacing.s,
  borderBottomColor: theme.colors.beta50,
  borderBottomWidth: 1,
}));

export const BottomSheetButton = styled(MainButton)(({ theme }) => ({
  marginTop: theme.spacing.m,
}));
