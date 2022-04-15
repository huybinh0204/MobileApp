import styled from '@emotion/native';
import { BaseText } from '_components/atoms';

export const Container = styled.View({
  alignSelf: 'stretch',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
});

export const LeftContainer = styled.View({
  flex: 1,
  flexDirection: 'row',
  alignItems: 'center',
});

export const Icon = styled.View(({ theme }) => ({
  marginRight: theme.spacing.s,
}));

export const Title = styled(BaseText)(({ theme, color }) => ({
  ...theme.typography.subContentSemiBold,
  color: color,
  width: '80%',
}));

export const SubTitle = styled(BaseText)(({ theme, color }) => ({
  ...theme.typography.tinyContentRegular,
  color: color,
  width: '80%',
}));

export const TextContainer = styled.View(() => ({
  width: '100%',
}));
