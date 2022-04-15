import styled from '@emotion/native';

const GeneralContainer = styled.SafeAreaView(({ theme, bgColor }) => ({
  flex: 1,
  backgroundColor: bgColor ? bgColor : theme.colors.background,
}));

export default GeneralContainer;
