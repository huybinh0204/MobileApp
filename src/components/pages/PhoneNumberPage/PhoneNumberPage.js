import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { Keyboard, LayoutAnimation } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { MainButton, Toast } from '_components/atoms';
import Input from '_components/atoms/Input/Input';
import { SecondaryScreenLayout } from '_components/organisms';
import { NAVIGATION, PHONE_CODES, REGEX, TOAST_TYPES } from '_constants';
import strings from '_localization/index';
import { CustomerActions, CustomerSelectors } from '_store/customer';
import { cleanPhoneNumber, formatPhoneNumber } from '_utilities/Account';
import {
  ErrorMessage,
  FormInputRow,
  Hyperlink,
  PhoneDisclosure,
  PhoneDisclosureContainer,
  PhoneNumberContainer,
  PhoneNumberTitle,
  RowContainer,
} from './PhoneNumberPage.styles';

const PhoneNumberPage = () => {
  const { params } = useRoute();
  const { navigate } = useNavigation();
  const dispatch = useDispatch();

  const requestVerificationCodeSuccess = useSelector(CustomerSelectors.getPhoneVerificationSuccess);
  const requestVerificationCodeError = useSelector(CustomerSelectors.getPhoneVerificationError);
  const isLoading = useSelector(CustomerSelectors.getIsLoading);
  const customer = useSelector(CustomerSelectors.getCustomer);
  const customerExternalId = useSelector(CustomerSelectors.getExternalId);

  const [error, setError] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(customer.phoneNumber ?? '');
  const [isDisclosureVisible, setIsDisclosureVisible] = useState(true);

  const setDisclosureVisibility = (value) => {
    LayoutAnimation.easeInEaseOut();
    setIsDisclosureVisible(value);
  };

  const handleSubmit = () => {
    if (phoneNumber.match(REGEX.phoneNumber)) {
      setError(null);
      const localizedPhoneNumber = cleanPhoneNumber(PHONE_CODES.US, phoneNumber);
      dispatch(CustomerActions.startPhoneVerification(customerExternalId, localizedPhoneNumber));
      Keyboard.dismiss();
    } else {
      setError(strings.signUp.phoneNumber.invalid);
    }
  };

  const resetVerificationStatus = useCallback(() => {
    dispatch(CustomerActions.setPhoneVerificationError(null));
    dispatch(CustomerActions.setPhoneVerificationSuccess(false));
  }, [dispatch]);

  useEffect(() => {
    if (requestVerificationCodeSuccess) {
      navigate(NAVIGATION.shared.phoneNumberConfirmation, { ...params, phoneNumber });
      resetVerificationStatus();
    }
  }, [requestVerificationCodeSuccess, resetVerificationStatus, navigate, params, phoneNumber]);

  return (
    <SecondaryScreenLayout testID="PhoneNumberPage" showBackButton>
      <PhoneNumberContainer>
        <PhoneNumberTitle>{strings.signUp.phoneNumber.title}</PhoneNumberTitle>
        <RowContainer>
          <FormInputRow flex={1} marginRight>
            <Input
              editable={false}
              keyboardType="phone-pad"
              placeholder="Code"
              testID="phoneCode"
              value={PHONE_CODES.US}
            />
          </FormInputRow>
          <FormInputRow flex={4}>
            <Input
              autoComplete="tel"
              editable={!!params.edit}
              keyboardType="phone-pad"
              maxLength={14}
              onChangeText={setPhoneNumber}
              onBlur={() => setDisclosureVisibility(true)}
              onFocus={() => setDisclosureVisibility(false)}
              placeholder={strings.signUp.phoneNumber.placeholder}
              testID="phoneNumber"
              textContentType="telephoneNumber"
              value={formatPhoneNumber(phoneNumber)}
            />
          </FormInputRow>
        </RowContainer>
        <ErrorMessage>{error}</ErrorMessage>
        <PhoneDisclosureContainer>
          {isDisclosureVisible && (
            <PhoneDisclosure>
              {strings.formatString(strings.signUp.phoneNumber.disclosure, {
                privacyPolicy: (
                  <Hyperlink href={strings.settings.policyTerms.kinlyUser}>
                    {strings.signUp.phoneNumber.privacyPolicy}
                  </Hyperlink>
                ),
              })}
            </PhoneDisclosure>
          )}
        </PhoneDisclosureContainer>
        <MainButton
          disabled={phoneNumber === ''}
          isLoading={isLoading}
          onPress={handleSubmit}
          testID="phoneNumberRequestCodeButton"
        >
          {strings.signUp.continue}
        </MainButton>
      </PhoneNumberContainer>
      <Toast
        type={TOAST_TYPES.ERROR}
        header={requestVerificationCodeError?.title}
        content={requestVerificationCodeError?.description}
        onClose={resetVerificationStatus}
        show={requestVerificationCodeError !== null}
        testID="codeErrorToast"
      />
    </SecondaryScreenLayout>
  );
};

export default PhoneNumberPage;
