import { Dynatrace } from '@dynatrace/react-native-plugin';
import { useTheme } from '@emotion/react';
import Clipboard from '@react-native-community/clipboard';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { ScrollView } from 'react-native';
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
  AtomicPrivacyPolicyLink,
  ButtonContainer,
  Content,
  Description,
  DisclosureSheetContainer,
  DisclosureSheetContent,
  DisclosureSheetTitle,
  ExternalLink,
  Header,
  Icon,
  LearnMoreLink,
  OverdraftSellDisclaimerText,
  scrollViewStyles,
  SetUpDirectDepositBottomSheetButton,
  SetUpDirectDepositBottomSheetContainer,
  SetUpDirectDepositBottomSheetDescription,
  SetUpDirectDepositBottomSheetTitle,
} from './AtomicFiOverdraftSellPage.styles';

const AtomicFiOverdraftSellPage = () => {
  const dispatch = useDispatch();
  const { navigate } = useNavigation();
  const { colors } = useTheme();

  const disclosureBottomSheet = useRef(null);
  const directDepositBottomSheetRef = useRef(null);
  const [toastText, setToastText] = useState(null);

  const externalId = useSelector(AccountSelectors.getExternalId);
  const directDepositFormError = useSelector(AccountSelectors.getDirectDepositFormError);
  const isLoadingAtomicFiToken = useSelector(AccountSelectors.getIsLoadingAtomicFiToken);
  const token = useSelector(AccountSelectors.getAtomicFiToken);

  const { accountNumber, routingNumber } = useSelector(
    FundDirectDepositStoreSelectors.getRenderData
  );

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
    directDepositBottomSheetRef.current?.open();
  };

  const handleGetForm = () => {
    directDepositBottomSheetRef.current?.close();
    navigate(NAVIGATION.shared.directDepositFormView);
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

  const closeToast = () => {
    setToastText(null);
    dispatch(AccountActions.setDirectDepositFormError(false));
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
    <SecondaryScreenLayout testID="AtomicFiOverdraftSellPage">
      <ScrollView contentContainerStyle={scrollViewStyles}>
        <Content>
          <Icon icon={ICONS.overdraftProtection} width={normalize(128)} height={normalize(128)} />
          <Header>{strings.overdraft.sell.header}</Header>
          <Description>{strings.overdraft.sell.atomicFiDescription}</Description>
          <ButtonContainer>
            <OverdraftSellDisclaimerText>
              {strings.formatString(strings.overdraft.sell.atomicFiDisclaimer, {
                learnMoreLink: (
                  <LearnMoreLink onPress={openDisclosure}>
                    {strings.overdraft.sell.learnMore}
                  </LearnMoreLink>
                ),
                atomicPrivacyPolicyLink: (
                  <AtomicPrivacyPolicyLink href={ENV.ATOMIC_FI_PRIVACY_POLICY}>
                    {strings.overdraft.sell.atomicFiPrivacyPolicy}
                  </AtomicPrivacyPolicyLink>
                ),
              })}
            </OverdraftSellDisclaimerText>
            <MainButton
              onPress={handleContinue}
              isLoading={isLoadingAtomicFiToken}
              testID="continue"
            >
              {strings.overdraft.sell.atomicFiButtonText}
            </MainButton>
            <MainButton variant="link" onPress={handleDirectDeposit}>
              {strings.overdraft.sell.setUpDirectDeposit}
            </MainButton>
          </ButtonContainer>
        </Content>
      </ScrollView>
      <Toast
        onClose={closeToast}
        testID="overdraftSellPageToastError"
        header={strings.overdraft.sell.directDepositFormError.title}
        content={strings.overdraft.sell.directDepositFormError.description}
        show={directDepositFormError}
        type={TOAST_TYPES.ERROR}
      />
      <BottomSheet height={500} ref={disclosureBottomSheet}>
        <DisclosureSheetContainer>
          <DisclosureSheetTitle>{strings.overdraft.sell.disclosureTitle}</DisclosureSheetTitle>
          <DisclosureSheetContent>{strings.overdraft.sell.disclosureBody}</DisclosureSheetContent>
          <DisclosureSheetContent>
            {strings.formatString(strings.overdraft.sell.disclosureBodyLink, {
              linkUrl: (
                <ExternalLink href={ENV.OVERDRAFT_LEGAL_AGREEMENT_URL}>
                  {strings.overdraft.sell.termsAndConditionsLinkText}
                </ExternalLink>
              ),
            })}
          </DisclosureSheetContent>
          <MainButton onPress={closeDisclosure}>
            {strings.overdraft.sell.disclosureButton}
          </MainButton>
        </DisclosureSheetContainer>
      </BottomSheet>
      <BottomSheet closeOnPressMask height={normalize(350)} ref={directDepositBottomSheetRef}>
        <SetUpDirectDepositBottomSheetContainer>
          <SetUpDirectDepositBottomSheetTitle>
            {strings.overdraft.sell.setUpDirectDepositBottomSheet.title}
          </SetUpDirectDepositBottomSheetTitle>
          <SetUpDirectDepositBottomSheetDescription>
            {strings.overdraft.sell.setUpDirectDepositBottomSheet.body}
          </SetUpDirectDepositBottomSheetDescription>
          <AccountNumber onPressAccount={copyToClipboard} onPressRouting={copyToClipboard} />
          <SetUpDirectDepositBottomSheetButton
            onPress={handleGetForm}
            testID="overdraftSellPageGetFormButton"
          >
            {strings.overdraft.sell.setUpDirectDepositBottomSheet.buttonText}
          </SetUpDirectDepositBottomSheetButton>
        </SetUpDirectDepositBottomSheetContainer>
        <Toast
          onClose={closeToast}
          testID="overdraftSellPageToast"
          header={strings.accountInfo.copied}
          content={toastText}
          show={toastText !== null}
          type={TOAST_TYPES.INFO}
        />
      </BottomSheet>
    </SecondaryScreenLayout>
  );
};

export default AtomicFiOverdraftSellPage;
