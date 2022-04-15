import { formatPhoneNumber, groupTransactionsByMonth } from './Account';

describe('Account utilities', () => {
  const transactions = [
    {
      type: 'DEBIT',
      details: 'test credit',
      amount: 99.99,
      createdDateTime: '2020-10-28T15:43:18Z',
    },
    {
      type: 'CREDIT',
      details: 'test credit',
      amount: 200,
      createdDateTime: '2020-09-28T15:43:18Z',
    },
  ];
  it('group an array of transactions by month', () => {
    expect(groupTransactionsByMonth(transactions)).toEqual([
      {
        data: [
          {
            amount: 99.99,
            createdDateTime: '2020-10-28T15:43:18Z',
            details: 'test credit',
            type: 'DEBIT',
          },
        ],
        date: '2020-10-28T15:43:18Z',
        title: 'October',
      },
      {
        data: [
          {
            amount: 200,
            createdDateTime: '2020-09-28T15:43:18Z',
            details: 'test credit',
            type: 'CREDIT',
          },
        ],
        date: '2020-09-28T15:43:18Z',
        title: 'September',
      },
    ]);
  });
  it('should display the phone number in US format', () => {
    expect(formatPhoneNumber('1238484890')).toEqual('(123) 848-4890');
    expect(formatPhoneNumber('123848489')).toEqual('(123) 848-489');
  });
});
