import styled from '@emotion/native';
import { Animated, StyleSheet } from 'react-native';
import { normalize } from '_utilities/screen';

export const Bar = styled.View(({ theme }) => ({
  alignSelf: 'center',
  backgroundColor: theme.colors.beta50,
  borderColor: theme.colors.black,
  borderRadius: 10,
  height: normalize(5),
  width: '100%',
}));

export const Progress = styled(Animated.View)(({ theme }) => ({
  ...StyleSheet.absoluteFillObject,
  backgroundColor: theme.colors.alpha500,
  borderRadius: 10,
}));
