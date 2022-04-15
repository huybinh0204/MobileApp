import Clipboard from '@react-native-community/clipboard';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { ScrollView } from 'react-native';
import ENV from 'react-native-config';
import BottomSheet from 'react-native-raw-bottom-sheet';
import { useDispatch, useSelector } from 'react-redux';
import { AccountNumber, MainButton, Toast } from '_components/atoms';
import { SecondaryScreenLayout } from '_components/organisms';
import { ICONS, NAVIGATION, TOAST_TYPES } from '_constants';
import strings from '_localization';
import { AccountActions, AccountSelectors } from '_store/account';
import {
  FundDirectDepositStoreActions,
  FundDirectDepositStoreSelectors,
} from '_store/pageStore/fundDirectDepositStore';
import { normalize } from '_utilities/screen';
import {
  AccountNumberContainer,
  ActionTitle,
  ButtonContainer,
  Content,
  Description,
  DisclosureSheetContainer,
  DisclosureSheetContent,
  DisclosureSheetTitle,
  ExternalLink,
  Icon,
  OverdraftSellDisclaimerText,
  scrollViewStyles,
  TextLink,
} from './OverdraftSellPage.styles';

const OverdraftSellPage = () => {
  const dispatch = useDispatch();
  const { navigate } = useNavigation();
  const disclosureBottomSheet = useRef(null);

  const [toastText, setToastText] = useState(null);
  const externalId = useSelector(AccountSelectors.getExternalId);
  const directDepositFormError = useSelector(AccountSelectors.getDirectDepositFormError);
  const { accountNumber, routingNumber } = useSelector(
    FundDirectDepositStoreSelectors.getRenderData
  );

  useEffect(() => {
    if (externalId && (!accountNumber || !routingNumber)) {
      dispatch(FundDirectDepositStoreActions.fetchRenderData(externalId));
    }
  }, [dispatch, accountNumber, routingNumber, externalId]);

  const navigateToScreen = () => {
    navigate(NAVIGATION.shared.directDepositFormView);
  };

  const copyToClipboard = ({ accountNumber: account, routingNumber: routing }) => {
    Clipboard.setString(account || routing);
    setToastText(
      account ? strings.accountInfo.accountNumberCopied : strings.accountInfo.routingNumberCopied
    );
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

  return (
    <SecondaryScreenLayout testID="OverdraftSellPage" title={strings.overdraft.sell.title}>
      <ScrollView contentContainerStyle={scrollViewStyles}>
        <Content>
          <Icon icon={ICONS.overdraftProtection} width={normalize(128)} height={normalize(128)} />
          <ActionTitle>{strings.overdraft.sell.header}</ActionTitle>
          <Description>{strings.overdraft.sell.description}</Description>

          <AccountNumberContainer>
            <AccountNumber onPressAccount={copyToClipboard} onPressRouting={copyToClipboard} />
          </AccountNumberContainer>

          <ButtonContainer>
            <OverdraftSellDisclaimerText>
              {strings.formatString(strings.overdraft.sell.disclaimer, {
                learnMoreLink: (
                  <TextLink onPress={openDisclosure}>{strings.overdraft.sell.learnMore}</TextLink>
                ),
              })}
            </OverdraftSellDisclaimerText>
            <MainButton onPress={navigateToScreen} testID="continue">
              {strings.overdraft.sell.buttonText}
            </MainButton>
          </ButtonContainer>
        </Content>
      </ScrollView>
      <Toast
        onClose={closeToast}
        testID="overdraftSellPageToast"
        header={strings.accountInfo.copied}
        content={toastText}
        show={toastText !== null}
        type={TOAST_TYPES.INFO}
      />
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
                  {ENV.OVERDRAFT_LEGAL_AGREEMENT_URL}
                </ExternalLink>
              ),
            })}
          </DisclosureSheetContent>
          <MainButton onPress={closeDisclosure}>
            {strings.overdraft.sell.disclosureButton}
          </MainButton>
        </DisclosureSheetContainer>
      </BottomSheet>
    </SecondaryScreenLayout>
  );
};

export default OverdraftSellPage;
