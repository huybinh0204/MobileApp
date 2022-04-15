import styled from '@emotion/native';
import { SectionList as RNSectionList } from 'react-native';
import { BaseText, PressableListItem } from '_components/atoms';

export const Container = styled.SafeAreaView(({ theme }) => ({
  flex: 1,
  backgroundColor: theme.colors.background,
}));

export const UserBlock = styled.View(({ theme }) => ({
  paddingHorizontal: theme.spacing.m,
}));

export const UserTitle = styled(BaseText)(({ theme }) => ({
  ...theme.typography.heading4,
  paddingTop: theme.spacing.l,
  paddingBottom: theme.spacing.s,
}));

export const SectionList = styled(RNSectionList)(({ theme }) => ({
  paddingHorizontal: theme.spacing.m,
}));

export const SectionHeader = styled(BaseText)(({ theme, isFirstItem }) => ({
  ...theme.typography.tinyContentRegular,
  color: theme.colors.beta500,
  marginTop: isFirstItem ? 0 : theme.spacing.s,
  marginBottom: theme.spacing.xs,
}));

export const Separator = styled.View(({ theme }) => ({
  alignSelf: 'stretch',
  borderColor: theme.colors.beta50,
  borderWidth: 1,
  height: 1,
}));

export const CloseButton = styled.TouchableOpacity(({ theme }) => ({
  position: 'absolute',
  right: theme.spacing.xs,
  padding: theme.spacing.s,
  zIndex: 10,
}));

export const SettingsOption = styled(PressableListItem)(({ theme }) => ({
  marginVertical: theme.spacing.xs,
}));
