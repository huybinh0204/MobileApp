import React from 'react';
import { render } from '@testing-library/react-native';
import { useForm } from 'react-hook-form';
import { Form } from '_components/atoms';
import Theme from '_utilities/Theme';
import FormSubmitButton from './FormSubmitButton';

describe('FormSubmitButton', () => {
  let props;

  const RenderFormSubmit = (innerProps) => {
    const formMethods = useForm({});

    return (
      <Theme>
        <Form formMethods={formMethods}>
          <FormSubmitButton {...innerProps} />
        </Form>
      </Theme>
    );
  };

  beforeEach(() => {
    props = {
      children: 'test',
      onSubmit: jest.fn(),
    };
  });

  describe('structure', () => {
    it('should match the snapshot', () => {
      const { toJSON } = render(<RenderFormSubmit {...props} />);
      expect(toJSON()).toMatchSnapshot();
    });
  });
});
