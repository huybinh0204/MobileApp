import { render } from '@testing-library/react-native';
import React from 'react';
import { Switch } from '_components/atoms';
import ComponentWithProviders from '_test/mocks/ComponentWithProviders';

describe('Switch', () => {
  it('matches the snapshot', () => {
    const { toJSON } = render(
      <ComponentWithProviders component={Switch} componentProps={{ value: true }} />
    );

    expect(toJSON()).toMatchSnapshot();
  });
});
