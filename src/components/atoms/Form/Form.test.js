import React from 'react';
import { render } from '@testing-library/react-native';
import Theme from '_utilities/Theme';
import Form from './Form';

describe('From', () => {
  let props;

  const RenderForm = (innerProps) => (
    <Theme>
      <Form {...innerProps} />
    </Theme>
  );

  beforeEach(() => {
    props = {};
  });

  describe('structure', () => {
    it('should match the snapshot', () => {
      const { toJSON } = render(<RenderForm {...props} />);
      expect(toJSON()).toMatchSnapshot();
    });
  });
});
