import styled from '@emotion/native';
import { BaseText } from '_components/atoms';
import { normalize } from '_utilities/screen';

export const Container = styled.View(({ theme }) => ({
  marginHorizontal: theme.spacing.general,
}));

export const HeaderTitle = styled(BaseText)(({ theme }) => ({
  color: theme.colors.gay200,
  fontSize: normalize(18),
  lineHeight: normalize(23.4),
  fontWeight: 'bold',
  marginBottom: normalize(5),
}));

export const HeaderDescription = styled(BaseText)(({ theme }) => ({
  color: theme.colors.gray100,
  lineHeight: normalize(23.4),
  fontSize: normalize(16),
}));
