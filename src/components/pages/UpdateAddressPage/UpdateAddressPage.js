import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { useForm } from 'react-hook-form';
import { object, string } from 'yup';
import { Form, FormInput, FormSubmitButton } from '_components/atoms';
import { SecondaryScreenLayout } from '_components/organisms';
import { NAVIGATION, REGEX } from '_constants';
import strings from '_localization/index';
import { ButtonContainer, Container } from './UpdateAddressPage.styles';

const schema = object().shape({
  addressLine1: string()
    .required(strings.signUp.requiredField)
    .matches(REGEX.address, strings.signUp.mainAddressError),
  addressLine2: string().matches(REGEX.alphanumeric, strings.signUp.alphanumericError),
});

const UpdateAddressPage = () => {
  const { params } = useRoute();
  const { navigate } = useNavigation();

  const defaultValues = {
    addressLine1: params?.addressLine1 ?? '',
    addressLine2: params?.addressLine2 ?? '',
  };

  const formMethods = useForm({ defaultValues, resolver: yupResolver(schema) });
  const line1 = formMethods.watch('addressLine1');
  const line2 = formMethods.watch('addressLine2');
  const isButtonDisabled = line1 === '';

  const handleSubmit = ({ addressLine1, addressLine2 }) => {
    navigate(NAVIGATION.settings.updateCity, {
      ...params,
      addressLine1,
      addressLine2,
      changed: line1 !== defaultValues.addressLine1 || line2 !== defaultValues.addressLine2,
    });
  };

  return (
    <SecondaryScreenLayout testID="UpdateAddressPage" title={strings.signUp.address.header}>
      <Container>
        <Form formMethods={formMethods}>
          <FormInput
            autoComplete="street-address"
            name="addressLine1"
            placeholder={strings.signUp.address.line1PlaceHolder}
            testID="addressLine1"
            textContentType="streetAddressLine1"
          />
          <FormInput
            name="addressLine2"
            placeholder={strings.signUp.address.line2PlaceHolder}
            testID="addressLine2"
            textContentType="streetAddressLine2"
          />
          <ButtonContainer>
            <FormSubmitButton
              disabled={isButtonDisabled}
              onSubmit={handleSubmit}
              testID="signUpNameSubmitButton"
            >
              {strings.signUp.continue}
            </FormSubmitButton>
          </ButtonContainer>
        </Form>
      </Container>
    </SecondaryScreenLayout>
  );
};

export default UpdateAddressPage;
