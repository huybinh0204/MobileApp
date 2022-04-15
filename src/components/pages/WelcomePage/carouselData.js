import React from 'react';
import strings from '_localization';
import { BoldText } from './WelcomePage.styles';

export default [
  {
    id: 'bank-account',
    title: strings.welcome.carousel.bankAccount.title,
    legals: strings.welcome.carousel.bankAccount.legals,
    asset: require('_assets/illustrations/welcome-slide-1.jpg'),
    testID: 'slide-1',
  },
  {
    id: 'early-paycheck',
    title: strings.welcome.carousel.getPaidEarly.title,
    description: strings.formatString(strings.welcome.carousel.getPaidEarly.description, {
      earlier: <BoldText>{strings.welcome.carousel.getPaidEarly.earlier}</BoldText>,
    }),
    legals: strings.welcome.carousel.getPaidEarly.legals,
    legalsLink: strings.welcome.carousel.getPaidEarly.legalsLink,
    infoSheetTitle: strings.welcome.carousel.getPaidEarly.infoSheetTitle,
    infoSheetContent: strings.welcome.carousel.getPaidEarly.infoSheetContent,
    infoSheetButtonLabel: strings.welcome.carousel.getPaidEarly.infoSheetButton,
    asset: require('_assets/illustrations/welcome-slide-2.jpg'),
    testID: 'slide-2',
  },
  {
    id: 'overdraft-protection',
    title: strings.welcome.carousel.noOverDraftFee.title,
    description: strings.welcome.carousel.noOverDraftFee.description,
    legals: strings.welcome.carousel.noOverDraftFee.legals,
    legalsLink: strings.welcome.carousel.noOverDraftFee.legalsLink,
    infoSheetTitle: strings.welcome.carousel.noOverDraftFee.infoSheetTitle,
    infoSheetContent: strings.welcome.carousel.noOverDraftFee.infoSheetContent,
    infoSheetExternalLink: strings.welcome.carousel.noOverDraftFee.infoSheetTermsAndConditions,
    infoSheetButtonLabel: strings.welcome.carousel.noOverDraftFee.infoSheetButton,
    asset: require('_assets/illustrations/welcome-slide-3.jpg'),
    testID: 'slide-3',
  },
];
