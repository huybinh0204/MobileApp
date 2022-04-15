import styled, { css } from '@emotion/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BaseText, MainButton } from '_components/atoms';
import { normalize } from '_utilities/screen';

export const Container = styled(SafeAreaView)(({ theme }) => ({
  flex: 1,
  backgroundColor: theme.colors.white,
}));

export const Illustration = styled.Image({
  width: '100%',
});

export const CarouselContentContainer = styled.View(({ theme }) => ({
  flex: 1,
  justifyContent: 'center',
  paddingHorizontal: theme.spacing.m,
}));

export const CarouselItemTitle = styled(BaseText)(({ theme }) => ({
  ...theme.typography.heading3,
  color: theme.colors.beta900,
  marginVertical: theme.spacing.s,
  textAlign: 'left',
}));

export const CarouselItemDescription = styled(BaseText)(({ theme }) => ({
  ...theme.typography.subContentRegular,
  color: theme.colors.beta900,
  marginBottom: theme.spacing.s,
  textAlign: 'left',
}));

export const CarouselItemLegal = styled(BaseText)(({ theme }) => ({
  ...theme.typography.legal,
  color: theme.colors.beta500,
  textAlign: 'left',
}));

export const CarouselItemLink = styled(BaseText)(({ theme }) => ({
  color: theme.colors.alpha500,
}));

export const paginationDotStyles = css({
  width: normalize(10),
  height: normalize(10),
  borderRadius: 5,
});

export const paginationContainerStyles = css({
  paddingVertical: normalize(16),
});

export const bottomSheetContainerStyles = css({
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
});

export const ButtonsContainer = styled.View(({ theme }) => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  padding: theme.spacing.m,
}));

export const ActionButton = styled(MainButton)({
  width: '47.5%',
});

export const InfoSheetContainer = styled.View(({ theme }) => ({
  padding: theme.spacing.m,
}));

export const InfoSheetTitle = styled(BaseText)(({ theme }) => ({
  ...theme.typography.heading6,
  color: theme.colors.beta900,
  marginBottom: theme.spacing.xs,
}));

export const InfoSheetContent = styled(BaseText)(({ theme }) => ({
  ...theme.typography.mainContentRegular,
  color: theme.colors.beta500,
  marginBottom: theme.spacing.m,
}));

export const InfoSheetTnC = styled(BaseText)(({ theme }) => ({
  ...theme.typography.mainContentRegular,
  color: theme.colors.alpha500,
  marginBottom: theme.spacing.m,
}));

export const BoldText = styled(BaseText)(({ theme }) => ({
  ...theme.typography.subContentSemiBold,
  color: theme.colors.beta900,
}));
