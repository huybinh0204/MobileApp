import ENV from 'react-native-config';
import { TRANSFER_TYPES } from '_constants';
import strings from '_localization';
import { formatCurrency } from './currency';

const { ACH_IN, ACH_OUT, INSTANT_OUT } = TRANSFER_TYPES;

export function calculateInstantTransferFee(amount) {
  const TRANSFER_FEE = parseFloat(ENV.TRANSFER_FEE);
  const MINIMUM_FEE = parseFloat(ENV.MINIMUM_FEE);

  const computedFee = (amount * TRANSFER_FEE).toFixed(2);
  const transferFee = Math.max(MINIMUM_FEE, computedFee);
  const transferAmount = amount - transferFee;

  return { transferFee, transferAmount };
}

export function isValidTransferAmount(amount, transferType) {
  if (transferType === null) {
    return {
      valid: false,
      message: null,
    };
  }

  let LOWER_BOUND;
  let UPPER_BOUND;
  let AMOUNT_LIMIT_OVERCOME = 0;
  let MESSAGE = '';

  if (transferType === ACH_IN) {
    LOWER_BOUND = ENV.ACH_IN_LOWER;
    UPPER_BOUND = ENV.ACH_IN_UPPER;
    MESSAGE = amount > parseFloat(UPPER_BOUND) && strings.moneyMovement.addMoneyTransferMax;
    AMOUNT_LIMIT_OVERCOME = UPPER_BOUND;
  } else if (transferType === ACH_OUT) {
    LOWER_BOUND = ENV.ACH_OUT_LOWER;
    UPPER_BOUND = ENV.ACH_OUT_UPPER;
    AMOUNT_LIMIT_OVERCOME = UPPER_BOUND;
    MESSAGE = amount > parseFloat(UPPER_BOUND) && strings.moneyMovement.standardTransferMax;
  } else if (transferType === INSTANT_OUT) {
    LOWER_BOUND = ENV.INSTANT_OUT_LOWER;
    UPPER_BOUND = ENV.INSTANT_OUT_UPPER;
    if (amount < parseFloat(LOWER_BOUND)) {
      AMOUNT_LIMIT_OVERCOME = LOWER_BOUND;
      MESSAGE = strings.moneyMovement.instantTransferMin;
    } else if (amount > parseFloat(UPPER_BOUND)) {
      MESSAGE = strings.moneyMovement.instantTransferMax;
      AMOUNT_LIMIT_OVERCOME = UPPER_BOUND;
    }
  }

  return {
    valid: amount >= parseFloat(LOWER_BOUND) && amount <= parseFloat(UPPER_BOUND),
    message: strings.formatString(MESSAGE || '', {
      amount: formatCurrency(parseFloat(AMOUNT_LIMIT_OVERCOME)),
    }),
  };
}
