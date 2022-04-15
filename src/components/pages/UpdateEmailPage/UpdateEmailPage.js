import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { object, string } from 'yup';
import { Form, FormInput, FormSubmitButton, Toast } from '_components/atoms';
import { SecondaryScreenLayout } from '_components/organisms';
import { EVENTS, EVENT_TYPES, NAVIGATION, REGEX, TOAST_TYPES } from '_constants';
import strings from '_localization';
import { CustomerActions, CustomerSelectors } from '_store/customer';
import { RegisterActions } from '_store/register';
import { FormContainer } from './UpdateEmailPage.styles';

const schema = object().shape({
  email: string().matches(REGEX.email, strings.signUp.invalidEmail).required(),
});

const UpdateEmailPage = () => {
  const { params } = useRoute();
  const { navigate } = useNavigation();
  const dispatch = useDispatch();

  const defaultValues = {
    email: params?.email ?? '',
  };

  const formMethods = useForm({ defaultValues, resolver: yupResolver(schema) });

  const isLoading = useSelector(CustomerSelectors.getIsLoading);
  const customerExternalId = useSelector(CustomerSelectors.getExternalId);
  const updateEmailError = useSelector(CustomerSelectors.getUpdateEmailError);
  const updateEmailSuccess = useSelector(CustomerSelectors.getUpdateEmailSuccess);

  const emailValue = formMethods.watch('email');

  useEffect(() => {
    if (updateEmailSuccess) {
      navigate(NAVIGATION.settings.userInfo);
    }
  }, [updateEmailSuccess, navigate]);

  const handleSubmit = ({ email }) => {
    dispatch(RegisterActions.trackEvent(EVENTS.UPDATE_EMAIL_REQUEST, EVENT_TYPES.TRACK));
    dispatch(CustomerActions.updateEmail(customerExternalId, email));
  };

  const handleCloseToast = () => {
    dispatch(CustomerActions.setUpdateEmailError(null));
    dispatch(CustomerActions.setUpdateEmailSuccess(false));
  };

  return (
    <SecondaryScreenLayout testID="UpdateEmailPage" title={strings.signUp.email.placeholder}>
      <Form formMethods={formMethods}>
        <FormContainer>
          <FormInput
            autoCapitalize="none"
            autoComplete="email"
            keyboardType="email-address"
            name="email"
            placeholder={strings.signUp.email.placeholder}
            testID="newAccountMail"
            textContentType="emailAddress"
          />
          <FormSubmitButton
            disabled={emailValue === ''}
            onSubmit={handleSubmit}
            testID="submit"
            isLoading={isLoading}
          >
            {strings.signUp.continue}
          </FormSubmitButton>
        </FormContainer>
      </Form>
      <Toast
        type={TOAST_TYPES.ERROR}
        header={updateEmailError?.title}
        content={updateEmailError?.description}
        onClose={handleCloseToast}
        show={updateEmailError !== null}
        testID="updateMailToastError"
      />
    </SecondaryScreenLayout>
  );
};

export default UpdateEmailPage;
