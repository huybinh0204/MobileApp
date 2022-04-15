import { render, waitFor } from '@testing-library/react-native';
import React from 'react';
import ComponentWithProviders from '_test/mocks/ComponentWithProviders';
import Balance from './Balance';

describe('Balance', () => {
  it('should match the snapshot', async () => {
    const { toJSON } = render(
      <ComponentWithProviders component={Balance} componentProps={{ amount: 200 }} />
    );

    await waitFor(() => {
      expect(toJSON()).toMatchSnapshot();
    });
  });
  it('should negative balance match the snapshot', async () => {
    const amount = -20;
    const { toJSON } = render(
      <ComponentWithProviders component={Balance} componentProps={{ amount }} />
    );
    await waitFor(() => {
      expect(toJSON()).toMatchSnapshot();
    });
  });

  it('should render a negative balance', async () => {
    const amount = -20;
    const { getByText } = render(
      <ComponentWithProviders component={Balance} componentProps={{ amount }} />
    );
    const negativeBalance = getByText('-$20.00');
    expect(negativeBalance).toBeTruthy();
  });
});
