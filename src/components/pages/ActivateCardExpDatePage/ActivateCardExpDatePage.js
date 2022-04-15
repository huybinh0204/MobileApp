import { useNavigation } from '@react-navigation/native';
import React, { Fragment, useEffect, useState } from 'react';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { useDispatch, useSelector } from 'react-redux';
import { MainButton, Toast } from '_components/atoms';
import { NotifyModal } from '_components/molecules';
import { SecondaryScreenLayout } from '_components/organisms';
import { NAVIGATION, TOAST_TYPES } from '_constants';
import strings from '_localization';
import { AccountActions, AccountSelectors } from '_store/account';
import { isValidExpirationDate, parseExpirationDate } from '_utilities/date';
import {
  ButtonContainer,
  Cell,
  CellContainer,
  CodeFieldContainer,
  Content,
  Placeholder,
  Separator,
  Text,
} from './ActivateCardExpDatePage.styles';

const CELL_COUNT = 4;
const PLACEHOLDER = 'MMYY';

const CellContent = ({ isFocused, index, symbol }) => {
  if (symbol) {
    return <Cell>{symbol}</Cell>;
  }

  return <Cell>{isFocused ? <Cursor /> : <Placeholder>{PLACEHOLDER[index]}</Placeholder>}</Cell>;
};

const ActivateCardExpDatePage = () => {
  const dispatch = useDispatch();
  const { navigate } = useNavigation();

  const [value, setValue] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [showInputError, setShowInputError] = useState(false);
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({ value, setValue });
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });

  const externalId = useSelector(AccountSelectors.getExternalId);
  const activationSuccess = useSelector(AccountSelectors.getActivateKinlyCardSuccess);
  const activationError = useSelector(AccountSelectors.getActivateKinlyCardError);
  const cardToActivate = useSelector(AccountSelectors.getCardForActivation);
  const isLoading = useSelector(AccountSelectors.getIsLoading);

  useEffect(() => {
    if (activationSuccess) {
      navigate(NAVIGATION.card.setDebitCardPinInfo, { isChangePinVariant: false });
    } else if (activationError) {
      setShowModal(true);
    }
  }, [activationSuccess, activationError, navigate]);

  useEffect(() => {
    if (value === '') {
      setShowInputError(false);
    }
  }, [value]);

  const handleSubmit = () => {
    if (isValidExpirationDate(value) && cardToActivate?.cardId) {
      const expirationDate = parseExpirationDate(value);
      dispatch(AccountActions.activateCard(externalId, cardToActivate.cardId, expirationDate));
    } else {
      setShowInputError(true);
      setIsToastVisible(true);
    }
  };

  const closeToast = () => {
    setShowInputError(false);
    setIsToastVisible(false);
  };

  const handleModalDissmis = () => {
    dispatch(AccountActions.setActivateKinlyCardError(false));
    setShowModal(false);
  };

  return (
    <SecondaryScreenLayout testID="ActivateCardExpDate" title={strings.card.securityCheck}>
      <Content>
        <Text>{strings.card.expDateMessage}</Text>
        <CodeFieldContainer>
          <CodeField
            {...props}
            ref={ref}
            cellCount={CELL_COUNT}
            keyboardType="number-pad"
            onChangeText={setValue}
            value={value}
            testID="cardExpirationDate"
            renderCell={({ index, symbol, isFocused }) => (
              <Fragment key={index}>
                <CellContainer
                  key={`value-${index}`}
                  symbol={symbol}
                  isFocused={isFocused}
                  onLayout={getCellOnLayoutHandler(index)}
                  isError={showInputError}
                >
                  <CellContent isFocused={isFocused} index={index} symbol={symbol} />
                </CellContainer>
                {index === 1 ? <Separator key={`separator-${index}`} /> : null}
              </Fragment>
            )}
          />
        </CodeFieldContainer>
        <ButtonContainer>
          <MainButton onPress={handleSubmit} disabled={value.length !== 4} isLoading={isLoading}>
            {strings.common.continue}
          </MainButton>
        </ButtonContainer>
      </Content>
      <Toast
        type={TOAST_TYPES.ERROR}
        content={strings.card.expDateErrorMessage}
        header={strings.card.expDateError}
        onClose={closeToast}
        show={isToastVisible}
        testID="expDateToast"
      />
      <NotifyModal
        buttonText={strings.card.setPinForm.modalErrorButtonText}
        description={strings.card.setPinForm.modalErrorDescription}
        onDismiss={handleModalDissmis}
        title={strings.card.setPinForm.modalErrorTitle}
        visible={showModal}
      />
    </SecondaryScreenLayout>
  );
};

export default ActivateCardExpDatePage;
