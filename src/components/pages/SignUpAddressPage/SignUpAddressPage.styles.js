import styled, { css } from '@emotion/native';
import { BaseText, PressableListItem } from '_components/atoms';

export const Container = styled.View(({ theme }) => ({
  flex: 1,
  padding: theme.spacing.m,
}));

export const AddressTitle = styled(BaseText)(({ theme }) => ({
  ...theme.typography.heading5,
  color: theme.colors.beta900,
  marginBottom: theme.spacing.xs,
}));

export const AddressLegend = styled(BaseText)(({ theme }) => ({
  ...theme.typography.subContentRegular,
  color: theme.colors.beta500,
  marginBottom: theme.spacing.m,
}));

export const Row = styled.View({
  flexDirection: 'row',
});

export const InputContainer = styled.View(({ marginRight, theme }) => ({
  marginRight: marginRight ? theme.spacing.general : 0,
}));

export const ButtonContainer = styled.View({
  alignItems: 'center',
  justifyContent: 'flex-end',
});

export const Separator = styled.View(({ theme }) => ({
  alignSelf: 'stretch',
  borderColor: theme.colors.beta50,
  borderWidth: 1,
  height: 1,
}));

export const AddressItem = styled(PressableListItem)(({ theme }) => ({
  marginVertical: theme.spacing.xs,
  marginHorizontal: theme.spacing.xs,
}));

export const addressItemStyles = (theme) =>
  css({
    ...theme.typography.subContentRegular,
    flex: 1,
  });

export const LoadingIndicator = styled.ActivityIndicator({
  position: 'absolute',
  height: '100%',
  width: '100%',
});

export const LoadingIndicatorContainer = styled.View(() => ({
  flex: 1,
}));
