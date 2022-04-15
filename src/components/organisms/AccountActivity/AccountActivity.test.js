import { render } from '@testing-library/react-native';
import React from 'react';
import ComponentWithProviders from '_test/mocks/ComponentWithProviders';
import AccountActivity from './AccountActivity';

describe('AccountActivity', () => {
  it('should match the snapshot', () => {
    const { toJSON } = render(<ComponentWithProviders component={AccountActivity} />);

    expect(toJSON()).toMatchSnapshot();
  });
});
