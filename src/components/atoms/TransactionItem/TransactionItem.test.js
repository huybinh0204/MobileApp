import { render } from '@testing-library/react-native';
import React from 'react';
import ComponentWithProviders from '_test/mocks/ComponentWithProviders';
import { formatCurrency } from '_utilities/currency';
import TransactionItem from './TransactionItem';

describe('TransactionItem', () => {
  it('should match the snapshot', () => {
    const props = {
      transaction: {
        type: 'CREDIT',
        details: 'test credit',
        amount: 200,
        createdDateTime: '2020-10-28T15:43:18Z',
      },
    };

    const { toJSON } = render(
      <ComponentWithProviders component={TransactionItem} componentProps={props} />
    );

    expect(toJSON()).toMatchSnapshot();
  });

  it('should match the snapshot being the last item', () => {
    const props = {
      isLastItem: true,
      transaction: {
        type: 'CREDIT',
        details: 'test credit',
        amount: 200,
        createdDateTime: '2020-10-28T15:43:18Z',
      },
    };

    const { toJSON } = render(
      <ComponentWithProviders component={TransactionItem} componentProps={props} />
    );

    expect(toJSON()).toMatchSnapshot();
  });

  it('should display a credit transaction item', () => {
    const props = {
      isLastItem: false,
      transaction: {
        type: 'CREDIT',
        details: 'test credit',
        amount: 200,
        createdDateTime: '2020-10-28T15:43:18Z',
      },
    };

    const { getByText } = render(
      <ComponentWithProviders component={TransactionItem} componentProps={props} />
    );

    const amount = getByText(`+${formatCurrency(props.transaction.amount)}`);

    expect(amount).toBeTruthy();
  });

  it('should display a debit transaction item', () => {
    const props = {
      transaction: {
        type: 'DEBIT',
        details: 'test credit',
        amount: 99,
        createdDateTime: '2020-10-28T15:43:18Z',
      },
      isLastItem: false,
    };
    const { getByText } = render(
      <ComponentWithProviders component={TransactionItem} componentProps={props} />
    );

    const amount = getByText(`-${formatCurrency(props.transaction.amount)}`);

    expect(amount).toBeTruthy();
  });

  it('should have the correct created date', async () => {
    const props = {
      isLastItem: false,
      transaction: {
        type: 'DEBIT',
        details: 'test credit',
        amount: 99,
        createdDateTime: '2020-10-28T15:43:18Z',
      },
    };

    const { getByText } = render(
      <ComponentWithProviders component={TransactionItem} componentProps={props} />
    );
    const date = getByText('October 28');

    expect(date).toBeTruthy();
  });

  it('should have the correct amount format', async () => {
    const props = {
      isLastItem: false,
      transaction: {
        type: 'DEBIT',
        details: 'test credit',
        amount: 99.99,
        createdDateTime: '2020-10-28T15:43:18Z',
      },
    };

    const { getByText } = render(
      <ComponentWithProviders component={TransactionItem} componentProps={props} />
    );

    const amount = getByText('-$99.99');

    expect(amount).toBeTruthy();
  });

  it('should show a processing transaction label', async () => {
    const props = {
      isLastItem: false,
      transaction: {
        type: 'DEBIT',
        details: 'test credit',
        amount: 99.99,
        createdDateTime: '2020-10-28T15:43:18Z',
        accountTransactionState: 'UNSETTLED',
      },
    };

    const { getByText } = render(
      <ComponentWithProviders component={TransactionItem} componentProps={props} />
    );

    const date = getByText('October 28 - Processing');

    expect(date).toBeTruthy();
  });
});
