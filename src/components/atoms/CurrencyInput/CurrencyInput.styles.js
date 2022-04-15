import styled from '@emotion/native';
import { StyleSheet } from 'react-native';

export const InputContainer = styled.View(({ theme }) => ({
  alignItems: 'center',
  marginTop: theme.spacing.s,
  marginBottom: theme.spacing.m,
}));

export const HiddenInput = styled.TextInput(({ theme }) => ({
  ...StyleSheet.absoluteFillObject,
  fontSize: theme.fontSize.largeTitle,
  color: theme.colors.transparent,
}));
