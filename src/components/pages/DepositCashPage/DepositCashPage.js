import React, { useRef } from 'react';
import ENV from 'react-native-config';
import BottomSheet from 'react-native-raw-bottom-sheet';
import { Link, MainButton } from '_components/atoms';
import { SecondaryScreenLayout } from '_components/organisms';
import { ICONS } from '_constants';
import strings from '_localization/index';
import { openExternalLink } from '_utilities/ExternalLinks';
import { normalize } from '_utilities/screen';
import {
  ContentContainer,
  Description,
  FooterContainer,
  FooterNote,
  FooterNoteLink,
  Illustration,
  SheetContainer,
  SheetContent,
  SheetTitle,
  SheetTnC,
  Title,
} from './DepositCashPage.styles';

const DepositCashPage = () => {
  const infoSheet = useRef(null);

  const openInfoSheet = () => {
    infoSheet.current?.open();
  };

  const closeInfoSheet = () => {
    infoSheet.current?.close();
  };

  const openDepositLocaltions = async () => {
    await openExternalLink(ENV.FIND_PLACE_TO_DEPOSIT_CASH_URI);
  };

  return (
    <SecondaryScreenLayout>
      <ContentContainer>
        <Title>{strings.depositCash.contentTitle}</Title>
        <Illustration
          icon={ICONS.getPaidEarlyIllustration}
          width={normalize(300)}
          height={normalize(300)}
        />
        <Description>{strings.depositCash.contentDescription}</Description>
        <FooterContainer>
          <FooterNote>
            {strings.depositCash.footerNote}
            <FooterNoteLink onPress={openInfoSheet}>
              {strings.depositCash.footerNoteLink}
            </FooterNoteLink>
          </FooterNote>
          <MainButton onPress={openDepositLocaltions}>{strings.depositCash.button}</MainButton>
        </FooterContainer>
      </ContentContainer>
      <BottomSheet height={normalize(420)} ref={infoSheet}>
        <SheetContainer>
          <SheetTitle>{strings.depositCash.infoSheetTitle}</SheetTitle>
          <SheetContent>{strings.depositCash.infoSheetContent}</SheetContent>
          <Link href={ENV.DEPOSIT_CASH_AGREEMENT_URL} wrapperComponent={SheetTnC}>
            {strings.depositCash.infoSheetTermsAndConditions}
          </Link>
          <MainButton onPress={closeInfoSheet}>
            {strings.depositCash.infoSheetButtonLabel}
          </MainButton>
        </SheetContainer>
      </BottomSheet>
    </SecondaryScreenLayout>
  );
};

export default DepositCashPage;
