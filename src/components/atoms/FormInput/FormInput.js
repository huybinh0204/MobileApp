import { ErrorMessage } from '@hookform/error-message';
import PropTypes from 'prop-types';
import React from 'react';
import { useController, useFormContext } from 'react-hook-form';
import Input from '_components/atoms/Input/Input';
import { Container, ErrorText } from './FormInput.styles';

const FormInput = ({ name, variant, ...rest }) => {
  const { control, formState } = useFormContext();
  const { field } = useController({ name, control });
  const error = formState.errors?.[name];

  return (
    <Container>
      <Input error={error} onChangeText={field.onChange} value={field.value} {...rest} />
      <ErrorMessage as={<ErrorText />} errors={formState.errors} name={name} />
    </Container>
  );
};

FormInput.propTypes = {
  name: PropTypes.string.isRequired,
};

export default FormInput;
