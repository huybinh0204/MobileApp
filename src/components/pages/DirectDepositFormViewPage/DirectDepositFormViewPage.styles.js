import styled from '@emotion/native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const Container = styled.View({
  flex: 1,
});

export const HeaderContainer = styled(SafeAreaView)(({ theme }) => ({
  backgroundColor: theme.colors.white,
}));
