import { INITIAL_STATE, RegisterActions, RegisterReducer } from './register_reducer';

describe('Register Reducer', () => {
  describe('Actions', () => {
    const originalWarn = console.warn;
    const originalInfo = console.info;

    beforeEach(() => {
      console.warn = jest.fn();
      console.info = jest.fn();
    });

    afterEach(() => {
      console.warn = originalWarn;
      console.info = originalInfo;
    });

    it('should call console.info on success', () => {
      RegisterReducer(INITIAL_STATE, RegisterActions.trackEventSuccess('Success message'));
      expect(console.info).toBeCalled();
    });

    it('should call console.error on fail', () => {
      RegisterReducer(INITIAL_STATE, RegisterActions.trackEventFails('Failure message'));
      expect(console.warn).toBeCalled();
    });
  });
});
