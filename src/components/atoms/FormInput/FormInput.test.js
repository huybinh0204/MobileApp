import { render } from '@testing-library/react-native';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Form } from '_components/atoms';
import Theme from '_utilities/Theme';
import FormInput from './FormInput';

const RenderFormInput = (innerProps) => {
  const formMethods = useForm({ defaultValues: { test: '' } });

  return (
    <Theme>
      <Form formMethods={formMethods}>
        <FormInput {...innerProps} />
      </Form>
    </Theme>
  );
};

describe('FromInput', () => {
  it('should match the snapshot', () => {
    const { toJSON } = render(<RenderFormInput name="test" placeholder="test" />);
    expect(toJSON()).toMatchSnapshot();
  });
});
