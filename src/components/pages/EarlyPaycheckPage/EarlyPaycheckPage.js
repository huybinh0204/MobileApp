import { Dynatrace } from '@dynatrace/react-native-plugin';
import { useTheme } from '@emotion/react';
import Clipboard from '@react-native-community/clipboard';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import ENV from 'react-native-config';
import BottomSheet from 'react-native-raw-bottom-sheet';
import { useDispatch, useSelector } from 'react-redux';
import { AccountNumber, MainButton, Toast } from '_components/atoms';
import { SecondaryScreenLayout } from '_components/organisms';
import { ATOMIC_TYPES, ICONS, NAVIGATION, TOAST_TYPES } from '_constants';
import strings from '_localization';
import AtomicService from '_services/AtomicService';
import { AccountActions, AccountSelectors } from '_store/account';
import {
  FundDirectDepositStoreActions,
  FundDirectDepositStoreSelectors,
} from '_store/pageStore/fundDirectDepositStore';
import { normalize } from '_utilities/screen';
import {
  BottomSheetButton,
  BottomSheetDescription,
  BottomSheetTitle,
  Container,
  DirectDepositBottomSheetContainer,
  DisclaimerNote,
  DisclosureSheetContainer,
  DisclosureSheetContent,
  DisclosureSheetTitle,
  EarlyPaycheckContent,
  EarlyPaycheckTitle,
  FooterContent,
  Icon,
  LearnMoreLink,
  SubLink,
} from './EarlyPaycheckPage.styles';

const EarlyPaycheckPage = () => {
  const dispatch = useDispatch();
  const { navigate } = useNavigation();
  const { colors } = useTheme();

  const bottomSheetRef = useRef(null);
  const disclosureBottomSheet = useRef(null);
  const [toastText, setToastText] = useState(null);

  const externalId = useSelector(AccountSelectors.getExternalId);
  const directDepositFormError = useSelector(AccountSelectors.getDirectDepositFormError);
  const accountInfo = useSelector(FundDirectDepositStoreSelectors.getRenderData);
  const isLoading = useSelector(AccountSelectors.getIsLoadingAtomicFiToken);
  const token = useSelector(AccountSelectors.getAtomicFiToken);

  const { accountNumber, routingNumber } = accountInfo;

  useEffect(() => {
    if (externalId && (!accountNumber || !routingNumber)) {
      dispatch(FundDirectDepositStoreActions.fetchRenderData(externalId));
    }
  }, [dispatch, accountNumber, routingNumber, externalId]);

  useEffect(() => {
    if (externalId) {
      dispatch(AccountActions.fetchAtomicFiToken(externalId));
    }
  }, [externalId, dispatch]);

  const handleDirectDeposit = () => {
    bottomSheetRef.current?.open();
  };

  const handleGetForm = () => {
    bottomSheetRef.current?.close();
    navigate(NAVIGATION.shared.directDepositFormView);
  };

  const closeToast = () => {
    setToastText(null);
    dispatch(AccountActions.setDirectDepositFormError(false));
  };

  const handleContinue = () => {
    AtomicService.transact({
      token,
      brandColor: colors.alpha500,
      onInteraction(interaction) {
        if (interaction.name === ATOMIC_TYPES.COMPLETE_PAYCHECK) {
          navigate(NAVIGATION.shared.earlyPaycheckSuccess);
        } else if (interaction.name === ATOMIC_TYPES.AUTHENTICATION_ERROR) {
          Dynatrace.reportError(`AtomicFi Authentication Error: ${interaction.name}`, 0);
        }
      },
    });
  };

  const closeDisclosure = () => {
    disclosureBottomSheet.current?.close();
  };

  const openDisclosure = () => {
    disclosureBottomSheet.current?.open();
  };

  const copyToClipboard = ({ accountNumber: account, routingNumber: routing }) => {
    Clipboard.setString(account || routing);
    setToastText(
      account ? strings.accountInfo.accountNumberCopied : strings.accountInfo.routingNumberCopied
    );
  };

  return (
    <SecondaryScreenLayout>
      <Container>
        <Icon icon={ICONS.earlyPaycheck} width={normalize(128)} height={normalize(128)} />
        <EarlyPaycheckTitle>{strings.earlyPaycheck.title}</EarlyPaycheckTitle>
        <EarlyPaycheckContent>{strings.earlyPaycheck.description}</EarlyPaycheckContent>
        <FooterContent>
          <DisclaimerNote>
            {strings.formatString(strings.earlyPaycheck.disclaimer, {
              earlyDepositLink: (
                <LearnMoreLink onPress={openDisclosure}>
                  {strings.earlyPaycheck.earlyDepositText}
                </LearnMoreLink>
              ),
              atomicPrivacyLink: (
                <SubLink href={ENV.ATOMIC_FI_PRIVACY_POLICY}>
                  {strings.earlyPaycheck.atomicPrivacyText}
                </SubLink>
              ),
            })}
          </DisclaimerNote>
          <MainButton onPress={handleContinue} isLoading={isLoading}>
            {strings.earlyPaycheck.buttonText}
          </MainButton>
          <MainButton variant="link" onPress={handleDirectDeposit}>
            {strings.earlyPaycheck.setUpDirectDeposit}
          </MainButton>
        </FooterContent>
      </Container>
      <BottomSheet height={normalize(350)} ref={disclosureBottomSheet}>
        <DisclosureSheetContainer>
          <DisclosureSheetTitle>{strings.earlyPaycheck.disclosureTitle}</DisclosureSheetTitle>
          <DisclosureSheetContent>{strings.earlyPaycheck.disclosureBody}</DisclosureSheetContent>
          <MainButton onPress={closeDisclosure}>
            {strings.earlyPaycheck.disclosureButtonText}
          </MainButton>
        </DisclosureSheetContainer>
      </BottomSheet>
      <BottomSheet closeOnPressMask height={normalize(350)} ref={bottomSheetRef}>
        <DirectDepositBottomSheetContainer>
          <BottomSheetTitle>{strings.earlyPaycheck.bottomSheet.title}</BottomSheetTitle>
          <BottomSheetDescription>{strings.earlyPaycheck.bottomSheet.body}</BottomSheetDescription>
          <AccountNumber onPressAccount={copyToClipboard} onPressRouting={copyToClipboard} />
          <BottomSheetButton onPress={handleGetForm} testID="earlyPaycheckGetFormButton">
            {strings.earlyPaycheck.bottomSheet.buttonText}
          </BottomSheetButton>
        </DirectDepositBottomSheetContainer>
        <Toast
          onClose={closeToast}
          testID="earlyPaycheckPageToast"
          header={strings.accountInfo.copied}
          content={toastText}
          show={toastText !== null}
          type={TOAST_TYPES.INFO}
        />
      </BottomSheet>
      <Toast
        onClose={closeToast}
        testID="earlyPaycheckPageToastError"
        header={strings.overdraft.sell.directDepositFormError.title}
        content={strings.overdraft.sell.directDepositFormError.description}
        show={directDepositFormError}
        type={TOAST_TYPES.ERROR}
      />
    </SecondaryScreenLayout>
  );
};

export default EarlyPaycheckPage;
