import styled from '@emotion/native';
import { StatusBar } from 'react-native';

export const StatusBarContainer = styled.View(({ backgroundColor }) => ({
  backgroundColor,
  height: StatusBar.currentHeight,
}));
