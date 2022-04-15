import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { object, string } from 'yup';
import { Form, FormInput, FormSubmitButton, Toast } from '_components/atoms';
import { SecondaryScreenLayout } from '_components/organisms';
import { NAVIGATION, REGEX, TOAST_TYPES } from '_constants';
import strings from '_localization/index';
import { CustomerActions, CustomerSelectors } from '_store/customer';
import { ButtonContainer, Container, InputContainer, Row } from './UpdateCityPage.styles';

const schema = object().shape({
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

const UpdateCityPage = () => {
  const { params } = useRoute();
  const { navigate } = useNavigation();
  const dispatch = useDispatch();

  const customerExternalId = useSelector(CustomerSelectors.getExternalId);
  const isLoading = useSelector(CustomerSelectors.getIsLoading);
  const updateError = useSelector(CustomerSelectors.getUpdateAddressError);
  const updateSuccess = useSelector(CustomerSelectors.getUpdateAddressSuccess);

  const defaultValues = {
    city: params?.city ?? '',
    state: params?.state ?? '',
    zipCode: params?.zipCode ?? '',
  };

  const formMethods = useForm({ defaultValues, resolver: yupResolver(schema) });

  const cityValue = formMethods.watch('city');
  const stateValue = formMethods.watch('state');
  const zipCodeValue = formMethods.watch('zipCode');

  const hasEmptyValues = cityValue === '' || stateValue === '' || zipCodeValue === '';
  const unchangedValues =
    !params.changed &&
    cityValue === defaultValues.city &&
    stateValue === defaultValues.state &&
    zipCodeValue === defaultValues.zipCode;

  const handleSubmit = ({ city, state, zipCode }) => {
    const address = {
      city,
      zipCode,
      addressLine1: params?.addressLine1,
      addressLine2: params?.addressLine2,
      state: state.toUpperCase(),
    };

    dispatch(CustomerActions.updateAddress(customerExternalId, address));
  };

  const handleCloseToast = () => {
    dispatch(CustomerActions.setUpdateAddressError(null));
  };

  useEffect(() => {
    if (updateSuccess) {
      navigate(NAVIGATION.settings.userInfo);
    }
  }, [navigate, updateSuccess]);

  return (
    <SecondaryScreenLayout testID="UpdateCityPage" title={strings.signUp.address.header}>
      <Container>
        <Form formMethods={formMethods}>
          <FormInput
            name="city"
            placeholder={strings.signUp.address.cityPlaceholder}
            testID="city"
            textContentType="addressCity"
          />
          <Row>
            <InputContainer marginRight>
              <FormInput
                autoCapitalize="characters"
                maxLength={2}
                name="state"
                placeholder={strings.signUp.address.statePlaceholder}
                testID="state"
                textContentType="addressState"
              />
            </InputContainer>
            <InputContainer>
              <FormInput
                autoComplete="postal-code"
                maxLength={5}
                name="zipCode"
                keyboardType="number-pad"
                placeholder={strings.signUp.address.zipCodePlaceholder}
                testID="zipCode"
                textContentType="postalCode"
              />
            </InputContainer>
          </Row>
          <ButtonContainer>
            <FormSubmitButton
              disabled={hasEmptyValues || unchangedValues}
              onSubmit={handleSubmit}
              testID="signUpNameSubmitButton"
              isLoading={isLoading}
            >
              {strings.signUp.continue}
            </FormSubmitButton>
          </ButtonContainer>
        </Form>
      </Container>
      <Toast
        type={TOAST_TYPES.ERROR}
        header={updateError?.title}
        content={updateError?.description}
        onClose={handleCloseToast}
        show={updateError !== null}
        testID="UpdateAddressErrorToast"
      />
    </SecondaryScreenLayout>
  );
};

export default UpdateCityPage;
