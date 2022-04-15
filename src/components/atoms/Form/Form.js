import PropTypes from 'prop-types';
import React from 'react';
import { FormProvider } from 'react-hook-form';

const Form = ({ children, formMethods }) => {
  return <FormProvider {...formMethods}>{children}</FormProvider>;
};

Form.propTypes = {
  onSubmit: PropTypes.func,
};

export default Form;
