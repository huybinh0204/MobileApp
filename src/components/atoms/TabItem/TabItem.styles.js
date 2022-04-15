import styled from '@emotion/native';
import BaseText from '_components/atoms/BaseText/BaseText';

export const TabItemContainer = styled.View({
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
});

export const TabItemLabel = styled(BaseText)(({ theme, isActive }) => ({
  ...theme.typography.tinyContentBold,
  color: isActive ? theme.colors.alpha500 : theme.colors.beta100,
  marginTop: 5,
  textAlign: 'center',
}));
