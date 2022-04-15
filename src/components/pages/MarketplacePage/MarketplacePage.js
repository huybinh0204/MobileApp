import React, { useCallback, useRef } from 'react';
import BottomSheet from 'react-native-raw-bottom-sheet';
import { useWindowDimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { MarketplaceItem } from '_components/molecules';
import { SecondaryScreenLayout } from '_components/organisms';
import strings from '_localization';
import {
  Container,
  MarketplaceBanner,
  VirtualizedList,
  Title,
  ModalContainer,
  TitleModal,
  DescriptionModal,
  ButtonModalContainer,
} from './MarketplacePage.styles';
import { MarketplaceStaticData } from './MarketplaceStaticData';
import { normalize } from '_utilities/screen';
import { SPACING } from '_constants';
import { MainButton } from '_components/atoms';

export default function MarketplacePage() {
  const { width } = useWindowDimensions();
  const modalRef = useRef(null);
  const carouselRef = useRef(null);
  const getItemCount = useCallback((data) => data.length, []);

  const getItem = useCallback(
    (data, index) => ({
      ...data[index],
      id: `${index}_${Math.random().toString(12).substring(0)}`,
    }),
    []
  );

  const renderMarketplaceItem = useCallback(({ item }) => <MarketplaceItem data={item} />, []);

  const renderMarketplaceBanner = useCallback(
    () => (
      <>
        <MarketplaceBanner source={require('_assets/Banners/market_place_banner.jpg')} />
        <Title onPress={() => modalRef.current?.open()}>
          {strings.advertiserDisclosure.modal.title}
        </Title>
      </>
    ),
    []
  );

  const keyExtractor = useCallback((item, index) => `${item.name}_${index}`, []);

  return (
    <SecondaryScreenLayout testID="MarketplacePage" title={strings.settings.marketplace}>
      <Container>
        <VirtualizedList
          data={MarketplaceStaticData}
          initialNumToRender={5}
          maxToRenderPerBatch={5}
          getItemCount={getItemCount}
          getItem={getItem}
          keyExtractor={keyExtractor}
          ListHeaderComponent={renderMarketplaceBanner}
          renderItem={renderMarketplaceItem}
        />
      </Container>
      <BottomSheet
        ref={modalRef}
        height={normalize(566)}
        customStyles={{
          container: { backgroundColor: 'transparent', paddingHorizontal: SPACING.s },
        }}
      >
        <Carousel
          ref={carouselRef}
          data={[1, 2]}
          itemWidth={width - SPACING.m}
          renderItem={({ item }) => (
            <ModalContainer>
              <TitleModal>
                {item === 1
                  ? strings.advertiserDisclosure.modal.title
                  : strings.thirdPartyDisclosure.modal.title}
              </TitleModal>
              <DescriptionModal>
                {item === 1
                  ? strings.advertiserDisclosure.modal.description
                  : strings.thirdPartyDisclosure.modal.description}
                {item === 1 && (
                  <DescriptionModal onPress={() => carouselRef.current?.snapToNext()} isLink={true}>
                    {strings.advertiserDisclosure.modal.linkDescription}
                  </DescriptionModal>
                )}
              </DescriptionModal>
              <ButtonModalContainer>
                {item === 1 ? (
                  <MainButton onPress={() => modalRef.current?.close()}>{strings.gotIt}</MainButton>
                ) : (
                  <MainButton variant="secondary" onPress={() => carouselRef.current?.snapToPrev()}>
                    {strings.back}
                  </MainButton>
                )}
              </ButtonModalContainer>
            </ModalContainer>
          )}
          sliderWidth={width - SPACING.m}
          scrollEnabled={false}
        />
      </BottomSheet>
    </SecondaryScreenLayout>
  );
}
