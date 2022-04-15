import { TRANSFER_TYPES } from '_constants';
import { isValidTransferAmount } from './transfers';

describe('isValidTransferAmount', () => {
  it('should return false if the amount is not valid', () => {
    expect(isValidTransferAmount(0, TRANSFER_TYPES.ACH_IN).valid).toBe(false);
    expect(isValidTransferAmount(5001, TRANSFER_TYPES.ACH_IN).valid).toBe(false);
    expect(isValidTransferAmount(0, TRANSFER_TYPES.ACH_OUT).valid).toBe(false);
    expect(isValidTransferAmount(1000000, TRANSFER_TYPES.ACH_OUT).valid).toBe(false);
    expect(isValidTransferAmount(1.24, TRANSFER_TYPES.INSTANT_OUT).valid).toBe(false);
    expect(isValidTransferAmount(250.1, TRANSFER_TYPES.INSTANT_OUT).valid).toBe(false);
  });

  it('should return a message if the amount limit is not met', () => {
    expect(isValidTransferAmount(5001, TRANSFER_TYPES.ACH_IN).message).toEqual(
      'Transfer maximum is $5,000.00'
    );
    expect(isValidTransferAmount(1.24, TRANSFER_TYPES.INSTANT_OUT).message).toEqual(
      'Instant Transfer minimum is $1.25'
    );
    expect(isValidTransferAmount(250.1, TRANSFER_TYPES.INSTANT_OUT).message).toEqual(
      'Instant Transfer maximum is $250.00'
    );
  });

  it('should return true if the amount is valid', () => {
    expect(isValidTransferAmount(5, TRANSFER_TYPES.ACH_IN).valid).toBe(true);
    expect(isValidTransferAmount(1000, TRANSFER_TYPES.ACH_OUT).valid).toBe(true);
    expect(isValidTransferAmount(230, TRANSFER_TYPES.INSTANT_OUT).valid).toBe(true);
  });
});
