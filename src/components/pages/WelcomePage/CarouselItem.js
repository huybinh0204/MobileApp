import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import ENV from 'react-native-config';
import BottomSheet from 'react-native-raw-bottom-sheet';
import { Link, MainButton } from '_components/atoms';
import { normalize } from '_utilities/screen';
import {
  bottomSheetContainerStyles,
  CarouselContentContainer,
  CarouselItemDescription,
  CarouselItemLegal,
  CarouselItemLink,
  CarouselItemTitle,
  Illustration,
  InfoSheetContainer,
  InfoSheetContent,
  InfoSheetTitle,
  InfoSheetTnC,
} from './WelcomePage.styles';

const CarouselItem = ({ item }) => {
  const infoSheet = useRef(null);

  const infoSheetHeight = item.id === 'early-paycheck' ? normalize(340) : normalize(450);

  const openInfoSheet = () => {
    infoSheet.current?.open();
  };

  const closeInfoSheet = () => {
    infoSheet.current?.close();
  };

  return (
    <>
      <Illustration source={item.asset} testID={item.testID} />
      <CarouselContentContainer>
        <CarouselItemTitle>{item.title}</CarouselItemTitle>
        {item.description && <CarouselItemDescription>{item.description}</CarouselItemDescription>}
        <CarouselItemLegal>
          {item.legals}
          {item.legalsLink && (
            <CarouselItemLink onPress={openInfoSheet}>{item.legalsLink}</CarouselItemLink>
          )}
        </CarouselItemLegal>
      </CarouselContentContainer>
      {item.legalsLink && (
        <BottomSheet
          ref={infoSheet}
          height={infoSheetHeight}
          customStyles={{ container: bottomSheetContainerStyles }}
        >
          <InfoSheetContainer>
            <InfoSheetTitle>{item.infoSheetTitle}</InfoSheetTitle>
            <InfoSheetContent>{item.infoSheetContent}</InfoSheetContent>
            {item.infoSheetExternalLink && (
              <Link href={ENV.OVERDRAFT_LEGAL_AGREEMENT_URL} wrapperComponent={InfoSheetTnC}>
                {item.infoSheetExternalLink}
              </Link>
            )}
            <MainButton onPress={closeInfoSheet}>{item.infoSheetButtonLabel}</MainButton>
          </InfoSheetContainer>
        </BottomSheet>
      )}
    </>
  );
};

CarouselItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    legals: PropTypes.string,
    legalsLink: PropTypes.string,
    infoSheetTitle: PropTypes.string,
    infoSheetContent: PropTypes.string,
    infoSheetExternalLink: PropTypes.string,
    infoSheetButtonLabel: PropTypes.string,
    icon: PropTypes.string,
    testID: PropTypes.string,
  }).isRequired,
};

export default CarouselItem;
