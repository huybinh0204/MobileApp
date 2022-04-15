import styled from '@emotion/native';
import { Platform } from 'react-native';

const Card = styled.View(({ theme }) => ({
  alignSelf: 'stretch',
  backgroundColor: theme.colors.white,
  borderColor: theme.colors.beta50,
  borderRadius: 10,
  borderWidth: Platform.OS === 'android' ? 1 : 0,
  padding: theme.spacing.s,
  shadowColor: theme.colors.shadow,
  shadowOffset: {
    width: 0,
    height: 7,
  },
  shadowOpacity: 0.1,
  shadowRadius: 10,
}));

export default Card;
