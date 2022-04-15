import { render } from '@testing-library/react-native';
import React from 'react';
import ComponentWithProviders from '_test/mocks/ComponentWithProviders';
import ActiveOverdraftNudge from './ActiveOverdraftNudge';

describe('ActiveOverdraftNudge', () => {
  it('should match the snapshot when state is opt in and status is active', () => {
    const { toJSON } = render(
      <ComponentWithProviders component={ActiveOverdraftNudge} componentProps={{ limit: 50 }} />
    );

    expect(toJSON()).toMatchSnapshot();
  });
});
