import { AccountActions } from '_store/account';
import { AuthenticationActions } from '_store/authentication';
import { FundDirectDepositStoreActions } from '_store/pageStore/fundDirectDepositStore';
import { TransferActions } from '_store/transfer';
import { createVerifySessionMiddleware } from './verifySession';

const apiClientMock = {
  clearAuthorization: jest.fn(),
};

const create = (state = {}) => {
  const store = {
    getState: jest.fn(() => state),
    dispatch: jest.fn(),
  };

  const next = jest.fn();

  const invoke = (action) => createVerifySessionMiddleware(apiClientMock)(store)(next)(action);

  return { invoke, next, store };
};

describe('Verify session expiration', () => {
  const actualDateTime = Date.now;

  beforeAll(() => {
    Date.now = jest.fn(() => new Date('2021-01-01T00:00:00Z').getTime());
  });

  afterAll(() => {
    Date.now = actualDateTime;
  });

  it('passes through actions', () => {
    const { invoke, next, store } = create({
      auth: {
        credentials: null,
      },
    });

    const action = { type: 'TEST' };

    invoke(action);

    expect(store.getState).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(action);
  });

  it('Valid session', () => {
    const { invoke, next, store } = create({
      auth: {
        credentials: {
          expiration: '2021-01-01T00:00:00Z',
        },
      },
    });

    const action = { type: 'TEST' };

    invoke(action);

    expect(store.getState).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(action);
  });

  it('Expired session', () => {
    const { invoke, next, store } = create({
      auth: {
        credentials: {
          expiration: '2019-01-01T00:00:00Z',
        },
      },
    });

    const action = { type: 'TEST' };

    invoke(action);

    expect(store.getState).toHaveBeenCalledTimes(1);
    expect(apiClientMock.clearAuthorization).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(AccountActions.resetAccount());
    expect(next).toHaveBeenCalledWith(
      AuthenticationActions.resetAuthentication({ isSessionExpired: true })
    );
    expect(next).toHaveBeenCalledWith(AccountActions.resetAccount());
    expect(next).toHaveBeenCalledWith(TransferActions.resetTransfer());
    expect(next).toHaveBeenCalledWith(FundDirectDepositStoreActions.resetRenderData());
  });
});
