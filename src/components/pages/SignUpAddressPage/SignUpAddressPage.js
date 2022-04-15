import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { LayoutAnimation } from 'react-native';
import { object, string } from 'yup';
import { Form, FormInput, FormSubmitButton } from '_components/atoms';
import { OnboardingScreenLayout } from '_components/organisms';
import { NAVIGATION, REGEX } from '_constants';
import strings from '_localization/index';
import {
  AddressLegend,
  AddressTitle,
  ButtonContainer,
  Container,
  InputContainer,
  Row,
} from './SignUpAddressPage.styles';

const schema = object().shape({
  addressLine1: string()
    .required(strings.signUp.requiredField)
    .matches(REGEX.address, strings.signUp.mainAddressError),
  addressLine2: string().matches(REGEX.alphanumeric, strings.signUp.alphanumericError),
  city: string()
    .required(strings.signUp.requiredField)
    .matches(REGEX.onlyLettersAndSpaces, strings.signUp.onlyLettersError),
  state: string()
    .required(strings.signUp.requiredField)
    .matches(REGEX.onlyLetters, strings.signUp.onlyLettersError)
    .max(2)
    .matches(REGEX.states, strings.signUp.stateError),
  zipCode: string()
    .required(strings.signUp.requiredField)
    .matches(REGEX.zipCode, strings.signUp.zipError)
    .length(5),
});

const defaultValues = {
  addressLine1: '',
  addressLine2: '',
  city: '',
  state: '',
  zipCode: '',
};

const SignUpAddressPage = () => {
  const { params } = useRoute();
  const { navigate } = useNavigation();

  const [isContentVisible, setIsContentVisible] = useState(true);
  const formMethods = useForm({
    defaultValues: { ...defaultValues, ...params },
    resolver: yupResolver(schema),
  });

  const addressLine1Value = formMethods.watch('addressLine1');
  const cityValue = formMethods.watch('city');
  const stateValue = formMethods.watch('state');
  const zipCodeValue = formMethods.watch('zipCode');

  const hasEmptyValues =
    addressLine1Value === '' || cityValue === '' || stateValue === '' || zipCodeValue === '';

  const showContent = () => {
    LayoutAnimation.easeInEaseOut();
    setIsContentVisible(true);
  };

  const hideContent = () => {
    LayoutAnimation.easeInEaseOut();
    setIsContentVisible(false);
  };

  const handleSubmit = ({ addressLine1, addressLine2, city, state, zipCode }) => {
    navigate(NAVIGATION.auth.signUpSSN, {
      ...params,
      addressLine1,
      addressLine2,
      city,
      zipCode,
      state: state.toUpperCase(),
    });
  };

  return (
    <OnboardingScreenLayout step={9} testID="SignUpAddressPage">
      <Container>
        {isContentVisible && (
          <>
            <AddressTitle>{strings.signUp.address.title}</AddressTitle>
            <AddressLegend>{strings.signUp.address.legend}</AddressLegend>
          </>
        )}
        <Form formMethods={formMethods}>
          <FormInput
            autoComplete="street-address"
            name="addressLine1"
            onFocus={hideContent}
            onSubmitEditing={showContent}
            placeholder={strings.signUp.address.line1PlaceHolder}
            testID="addressLine1"
            textContentType="streetAddressLine1"
          />
          <Row>
            <InputContainer flex={2} marginRight>
              <FormInput
                name="city"
                onFocus={hideContent}
                onSubmitEditing={showContent}
                placeholder={strings.signUp.address.cityPlaceholder}
                testID="city"
                textContentType="addressCity"
              />
            </InputContainer>
            <InputContainer flex={1}>
              <FormInput
                autoCapitalize="characters"
                maxLength={2}
                name="state"
                onFocus={hideContent}
                onSubmitEditing={showContent}
                placeholder={strings.signUp.address.statePlaceholder}
                testID="state"
                textContentType="addressState"
              />
            </InputContainer>
          </Row>
          <Row>
            <InputContainer flex={2} marginRight>
              <FormInput
                name="addressLine2"
                onFocus={hideContent}
                onSubmitEditing={showContent}
                placeholder={strings.signUp.address.line2PlaceHolder}
                testID="addressLine2"
                textContentType="streetAddressLine2"
                autoFocus={true}
              />
            </InputContainer>
            <InputContainer flex={1}>
              <FormInput
                autoComplete="postal-code"
                maxLength={5}
                name="zipCode"
                keyboardType="number-pad"
                onFocus={hideContent}
                onSubmitEditing={showContent}
                placeholder={strings.signUp.address.zipCodePlaceholder}
                testID="zipCode"
                textContentType="postalCode"
              />
            </InputContainer>
          </Row>
          <ButtonContainer>
            <FormSubmitButton
              disabled={hasEmptyValues}
              onSubmit={handleSubmit}
              testID="signUpAddressSubmitButton"
            >
              {strings.signUp.continue}
            </FormSubmitButton>
          </ButtonContainer>
        </Form>
      </Container>
    </OnboardingScreenLayout>
  );
};

export default SignUpAddressPage;
