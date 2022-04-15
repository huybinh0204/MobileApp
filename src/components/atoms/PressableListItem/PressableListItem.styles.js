import styled from '@emotion/native';
import BaseText from '_components/atoms/BaseText/BaseText';

export const PressableItem = styled.TouchableOpacity({
  alignSelf: 'stretch',
  alignItems: 'center',
  flexDirection: 'row',
  minHeight: 50,
});

export const Title = styled(BaseText)(({ theme, marginLeft }) => ({
  ...theme.typography.subContentSemiBold,
  flex: 1,
  marginLeft: marginLeft ? theme.spacing.s : 0,
}));
