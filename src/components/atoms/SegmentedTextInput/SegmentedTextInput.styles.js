import styled from '@emotion/native';
import BaseText from '_components/atoms/BaseText/BaseText';
import { normalize } from '_utilities/screen';

export const Cell = styled(BaseText)(({ theme }) => ({
  ...theme.typography.mainContentRegular,
  color: theme.colors.beta900,
  lineHeight: theme.spacing.l,
  fontSize: theme.fontSize.title,
  paddingTop: theme.spacing.s,
  textAlign: 'center',
  width: theme.spacing.l,
  height: normalize(75),
}));

export const CellContainer = styled.View(({ theme }) => ({
  borderColor: theme.colors.beta100,
  borderRadius: 6,
  borderWidth: 2,
  zIndex: 0,
}));

export const Placeholder = styled(BaseText)(({ theme }) => ({
  color: theme.colors.beta200,
}));

export const Separator = styled.View(({ theme }) => ({
  alignSelf: 'center',
  backgroundColor: theme.colors.beta200,
  height: 2,
  width: 6,
}));
