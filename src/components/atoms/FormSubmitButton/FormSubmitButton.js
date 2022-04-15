import React from 'react';
import { useFormContext } from 'react-hook-form';
import MainButton from '_components/atoms/MainButton/MainButton';
import PropTypes from 'prop-types';

const FormSubmitButton = ({ onSubmit, ...rest }) => {
  const { handleSubmit } = useFormContext();

  return <MainButton onPress={handleSubmit(onSubmit)} {...rest} />;
};

FormSubmitButton.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default FormSubmitButton;
