import styled from '@emotion/native';
import BaseText from '_components/atoms/BaseText/BaseText';

export const Container = styled.View(({ theme }) => ({
  flexDirection: 'row',
  marginBottom: theme.spacing.xs,
}));

export const Item = styled.View({
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
});

export const AccountTitle = styled(BaseText)(({ theme }) => ({
  ...theme.typography.tinyContentRegular,
  color: theme.colors.beta500,
}));

export const AccountValue = styled(BaseText)(({ theme }) => ({
  ...theme.typography.heading6,
  color: theme.colors.beta900,
}));
