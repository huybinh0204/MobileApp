import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { object, string } from 'yup';
import { Form, FormInput, FormSubmitButton } from '_components/atoms';
import { OnboardingScreenLayout } from '_components/organisms';
import { NAVIGATION, REGEX } from '_constants';
import strings from '_localization';
import { CustomerSelectors } from '_store/customer';
import { openExternalLink } from '_utilities/ExternalLinks';
import {
  SignUpMailContainer,
  SignUpMailDisclaimerLink,
  SignUpMailDisclaimerText,
  SignUpMailOptionsContainer,
  SignUpMailTitle,
} from './SignUpMailPage.styles';

const schema = object().shape({
  email: string().matches(REGEX.email, strings.signUp.invalidEmail).required(),
});

const defaultValues = {
  email: '',
};

const SignUpMailPage = () => {
  const { navigate } = useNavigation();
  const isLoading = useSelector(CustomerSelectors.getIsLoading);
  const formMethods = useForm({ defaultValues, resolver: yupResolver(schema) });

  const emailValue = formMethods.watch('email');

  const handleDisclaimerLink = async () => {
    await openExternalLink(strings.signUp.disclaimerUrl);
  };

  const handleSubmit = ({ email }) => {
    navigate(NAVIGATION.auth.signUpPassword, { email });
  };

  return (
    <OnboardingScreenLayout step={1} testID="SignUpMailPage">
      <SignUpMailContainer>
        <SignUpMailTitle>{strings.signUp.email.title}</SignUpMailTitle>
        <Form formMethods={formMethods}>
          <FormInput
            allowFontScaling={false}
            autoCapitalize="none"
            autoComplete="email"
            keyboardType="email-address"
            name="email"
            placeholder={strings.signUp.email.placeholder}
            testID="newAccountMail"
            textContentType="emailAddress"
          />
          <SignUpMailOptionsContainer>
            <View>
              <SignUpMailDisclaimerText>
                {strings.signUp.disclaimer}
                <SignUpMailDisclaimerLink onPress={handleDisclaimerLink}>
                  {strings.signUp.disclaimerLink}
                </SignUpMailDisclaimerLink>
              </SignUpMailDisclaimerText>
              <FormSubmitButton
                disabled={emailValue === ''}
                onSubmit={handleSubmit}
                testID="submit"
                isLoading={isLoading}
              >
                {strings.signUp.continue}
              </FormSubmitButton>
            </View>
          </SignUpMailOptionsContainer>
        </Form>
      </SignUpMailContainer>
    </OnboardingScreenLayout>
  );
};

export default SignUpMailPage;
