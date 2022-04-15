import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Keyboard, LayoutAnimation } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { number, object } from 'yup';
import { Form, FormInput, MainButton, Toast } from '_components/atoms';
import { OnboardingScreenLayout } from '_components/organisms';
import { NAVIGATION, PHONE_CODES, REGEX, TOAST_TYPES } from '_constants';
import strings from '_localization/index';
import { CustomerActions, CustomerSelectors } from '_store/customer';
import { cleanPhoneNumber, formatPhoneNumber } from '_utilities/Account';
import {
  Container,
  Disclosure,
  DisclosureContainer,
  ErrorMessage,
  Hyperlink,
  InputRow,
  PhoneNumberTitle,
  Row,
} from './SignUpPhonePage.styles';

const schema = object().shape({
  phoneNumber: number().min(10).max(10),
});

const defaultValues = {
  phoneNumber: '',
};

const SignUpPhonePage = () => {
  const { params } = useRoute();
  const { navigate } = useNavigation();
  const dispatch = useDispatch();

  const customerExternalId = useSelector(CustomerSelectors.getExternalId);
  const codeSuccess = useSelector(CustomerSelectors.getPhoneVerificationSuccess);
  const codeError = useSelector(CustomerSelectors.getPhoneVerificationError);
  const isLoading = useSelector(CustomerSelectors.getIsLoading);

  const [error, setError] = useState(null);
  const [isDisclosureVisible, setIsDisclosureVisible] = useState(true);

  const formMethods = useForm({ defaultValues, resolver: yupResolver(schema) });

  const { watch } = formMethods;
  const phoneNumberValue = watch('phoneNumber');

  useEffect(() => {
    if (codeSuccess) {
      dispatch(CustomerActions.setPhoneVerificationError(null));
      dispatch(CustomerActions.setPhoneVerificationSuccess(false));
      navigate(NAVIGATION.auth.signUpPhoneConfirmation, {
        ...params,
        phoneNumber: phoneNumberValue,
      });
    }
  }, [codeSuccess, navigate, params, phoneNumberValue, dispatch]);

  const setDisclosureVisibility = (value) => {
    LayoutAnimation.easeInEaseOut();
    setIsDisclosureVisible(value);
  };

  const handleSubmit = () => {
    if (phoneNumberValue.match(REGEX.phoneNumber)) {
      setError(null);
      dispatch(
        CustomerActions.startPhoneVerification(
          customerExternalId,
          cleanPhoneNumber(PHONE_CODES.US, phoneNumberValue)
        )
      );
      Keyboard.dismiss();
    } else {
      setError(strings.signUp.phoneNumber.invalid);
    }
  };

  const handleCloseToast = () => {
    dispatch(CustomerActions.setPhoneVerificationError(null));
    dispatch(CustomerActions.setPhoneVerificationSuccess(false));
  };

  return (
    <OnboardingScreenLayout step={4} testID="SignUpPhonePage" showBackButton={false}>
      <Container>
        <PhoneNumberTitle>{strings.signUp.phoneNumber.title}</PhoneNumberTitle>
        <Form formMethods={formMethods}>
          <Row>
            <InputRow flex={1} marginRight>
              <FormInput
                autoCapitalize="none"
                keyboardType="phone-pad"
                name="phone_code"
                value={PHONE_CODES.US}
                placeholder={'Code'}
                testID="phoneCode"
                editable={false}
              />
            </InputRow>
            <InputRow flex={4}>
              <FormInput
                autoCapitalize="none"
                keyboardType="phone-pad"
                name="phoneNumber"
                placeholder={strings.signUp.phoneNumber.placeholder}
                testID="phoneNumber"
                textContentType="telephoneNumber"
                maxLength={14}
                value={formatPhoneNumber(phoneNumberValue)}
                onFocus={() => setDisclosureVisibility(false)}
                onBlur={() => setDisclosureVisibility(true)}
              />
            </InputRow>
          </Row>
          <ErrorMessage>{error}</ErrorMessage>
          <DisclosureContainer>
            {isDisclosureVisible && (
              <Disclosure>
                {strings.formatString(strings.signUp.phoneNumber.disclosure, {
                  privacyPolicy: (
                    <Hyperlink href={strings.settings.policyTerms.kinlyUser}>
                      {strings.signUp.phoneNumber.privacyPolicy}
                    </Hyperlink>
                  ),
                })}
              </Disclosure>
            )}
          </DisclosureContainer>
          <MainButton
            disabled={phoneNumberValue === ''}
            isLoading={isLoading}
            onPress={handleSubmit}
            testID="signUpPhoneSubmitButton"
          >
            {strings.signUp.continue}
          </MainButton>
        </Form>
      </Container>
      <Toast
        type={TOAST_TYPES.ERROR}
        header={codeError?.title}
        content={codeError?.description}
        onClose={handleCloseToast}
        show={codeError !== null}
        testID="codeErrorToast"
      />
    </OnboardingScreenLayout>
  );
};

export default SignUpPhonePage;
