import styled from '@emotion/native';
import { BaseText, Card } from '_components/atoms';
import { normalize } from '_utilities/screen';

export const Container = styled.SafeAreaView(({ theme }) => ({
  flex: 1,
  backgroundColor: theme.colors.white,
}));

export const Illustration = styled.Image({
  width: '100%',
  position: 'absolute',
});

export const Content = styled.View(({ theme }) => ({
  flex: 1,
  paddingTop: theme.spacing.m,
}));

export const Title = styled(BaseText)(({ theme }) => ({
  ...theme.typography.heading4,
  color: theme.colors.white,
  marginBottom: theme.spacing.xs,
  textAlign: 'left',
  paddingHorizontal: theme.spacing.m,
}));

export const Description = styled(BaseText)(({ theme }) => ({
  ...theme.typography.subContentRegular,
  color: theme.colors.beta200,
  marginBottom: 'auto',
  textAlign: 'left',
  paddingHorizontal: theme.spacing.m,
}));

export const PlaylistFlatList = styled.FlatList(({ theme }) => ({
  flex: 1,
  padding: theme.spacing.s,
}));

export const PlaylistItemWrap = styled(Card)(({ theme }) => ({
  height: normalize(126),
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.colors.white,
}));

export const PlaylistItemButton = styled.TouchableOpacity(() => ({
  flexDirection: 'row',
  alignItems: 'center',
}));

export const PlaylistTextWrap = styled.View(({ theme }) => ({
  flex: 1,
  paddingHorizontal: theme.spacing.xs,
}));

export const ItemPlaylistTitle = styled(BaseText)(({ theme }) => ({
  ...theme.typography.heading6,
  color: theme.colors.beta900,
  textAlign: 'left',
}));

export const ItemPlaylistDesc = styled(BaseText)(({ theme }) => ({
  ...theme.typography.tinyContentRegular,
  color: theme.colors.beta200,
  textAlign: 'left',
}));

export const Separator = styled.View(({ theme }) => ({
  alignSelf: 'stretch',
  height: normalize(10),
}));

export const FooterFlatlist = styled.View(({ theme }) => ({
  alignSelf: 'stretch',
  height: normalize(20),
}));
