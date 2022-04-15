import { yupResolver } from '@hookform/resolvers/yup';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { LayoutAnimation } from 'react-native';
import { object, string } from 'yup';
import { Form, FormInput, FormSubmitButton } from '_components/atoms';
import { OnboardingScreenLayout } from '_components/organisms';
import { NAVIGATION, REGEX } from '_constants';
import strings from '_localization/index';
import { ButtonContainer, Container, Legend, Title } from './SignUpNamePage.styles';

const validationSchema = object().shape({
  firstName: string()
    .trim()
    .required(strings.signUp.requiredField)
    .matches(REGEX.name, strings.signUp.nameError)
    .min(1, strings.signUp.minError)
    .max(23, strings.signUp.maxError),
  lastName: string()
    .trim()
    .required(strings.signUp.requiredField)
    .matches(REGEX.name, strings.signUp.nameError)
    .min(2, strings.signUp.minError)
    .when('firstName', (firstName, schema) => {
      return schema.max(25 - firstName.length, strings.signUp.maxCombinedError);
    }),
});

const defaultValues = {
  firstName: '',
  lastName: '',
};

const SignUpNamePage = () => {
  const { params } = useRoute();
  const { navigate, addListener } = useNavigation();

  const [isContentVisible, setIsContentVisible] = useState(true);
  const formMethods = useForm({ defaultValues, resolver: yupResolver(validationSchema) });

  const firstNameValue = formMethods.watch('firstName');
  const lastNameValue = formMethods.watch('lastName');

  useFocusEffect(
    useCallback(() => {
      return addListener('beforeRemove', (event) => {
        event.preventDefault();
      });
    }, [addListener])
  );

  const showContent = () => {
    LayoutAnimation.easeInEaseOut();
    setIsContentVisible(true);
  };

  const hideContent = () => {
    LayoutAnimation.easeInEaseOut();
    setIsContentVisible(false);
  };

  const handleSubmit = ({ firstName, lastName }) => {
    navigate(NAVIGATION.auth.signUpBirthDate, { ...params, firstName, lastName });
  };

  return (
    <OnboardingScreenLayout step={6} showBackButton={false} testID="SignUpNamePage">
      <Container>
        {isContentVisible && (
          <>
            <Title>{strings.signUp.name.title}</Title>
            <Legend>{strings.signUp.name.legend}</Legend>
          </>
        )}
        <Form formMethods={formMethods}>
          <FormInput
            name="firstName"
            onFocus={hideContent}
            onSubmitEditing={showContent}
            placeholder={strings.signUp.name.firstNamePlaceholder}
            testID="firstName"
            textContentType="givenName"
          />
          <FormInput
            name="lastName"
            onFocus={hideContent}
            onSubmitEditing={showContent}
            placeholder={strings.signUp.name.lastNamePlaceholder}
            testID="lastName"
            textContentType="familyName"
          />
          <ButtonContainer>
            <FormSubmitButton
              disabled={firstNameValue === '' || lastNameValue === ''}
              onSubmit={handleSubmit}
              testID="signUpNameSubmitButton"
            >
              {strings.signUp.continue}
            </FormSubmitButton>
          </ButtonContainer>
        </Form>
      </Container>
    </OnboardingScreenLayout>
  );
};

export default SignUpNamePage;
