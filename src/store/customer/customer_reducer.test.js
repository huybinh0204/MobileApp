import {
  CustomerActions as Actions,
  CustomerReducer as Reducer,
  CustomerSelectors as Selectors,
  INITIAL_STATE,
} from './customer_reducer';

describe('Customer Reducer', () => {
  describe('Actions', () => {
    it('should receive external id', () => {
      const externalId = '6012ac52-467d-4c1f-9ec7-9d8b35998a29';
      const state = Reducer(INITIAL_STATE, Actions.setExternalId(externalId));
      expect(state.externalId).toEqual(externalId);
    });

    it('should receive customer data', () => {
      const customer = {
        firstName: 'Jane',
        lastName: 'Doe',
        addressLine1: '534 Mission Street',
        addressLine2: 'Apt',
        city: 'San Francisco',
        state: 'CA',
        zipCode: '94706',
        phoneNumber: '6694561240',
        email: 'bar@121131168.com',
        dateOfBirth: '1990-12-12',
      };
      const state = Reducer(INITIAL_STATE, Actions.setFetchCustomerSuccess(customer));
      expect(state.data).toEqual(customer);
    });

    it('should receive loading state', () => {
      const state = Reducer(INITIAL_STATE, Actions.setIsLoading(true));
      expect(state.isLoading).toBeTruthy();
    });

    it('should reset state', () => {
      const state = Reducer(INITIAL_STATE, Actions.resetCustomer());
      expect(state).toEqual(INITIAL_STATE);
    });
  });

  describe('Selectors', () => {
    let mockState;

    beforeEach(() => {
      mockState = {
        customer: {
          externalId: '5d65f43a-6eda-4fc4-9d20-6c8faa912bd6',
          data: {
            firstName: 'Jane',
            lastName: 'Doe',
            addressLine1: '534 Mission Street',
            addressLine2: 'Apt',
            city: 'San Francisco',
            state: 'CA',
            zipCode: '94706',
            phoneNumber: '6694561240',
            email: 'bar@121131168.com',
            dateOfBirth: '1990-12-12',
          },
        },
      };
    });

    describe('getExternalId', () => {
      it('should return externalId if is setup', () => {
        const externalId = Selectors.getExternalId(mockState);
        expect(externalId).toEqual(mockState.customer.externalId);
      });

      it('should return null if externalId is not setup', () => {
        mockState.customer.externalId = null;
        const externalId = Selectors.getExternalId(mockState);
        expect(externalId).toBeNull();
      });
    });

    describe('getCustomer', () => {
      it("should return the customer's data if is setup", () => {
        const data = Selectors.getCustomer(mockState);
        expect(data).toEqual(mockState.customer.data);
      });

      it('should return null if the customer is not setup', () => {
        mockState.customer.data = null;
        const data = Selectors.getCustomer(mockState);
        expect(data).toBeNull();
      });
    });
  });
});
