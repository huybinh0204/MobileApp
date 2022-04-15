import { render } from '@testing-library/react-native';
import React from 'react';
import Theme from '_utilities/Theme';
import Input from './Input';

describe('Input', () => {
  it('should match the snapshot', () => {
    const { toJSON } = render(
      <Theme>
        <Input error={null} placeholder="placeholder" value="value" />
      </Theme>
    );

    expect(toJSON()).toMatchSnapshot();
  });
});
