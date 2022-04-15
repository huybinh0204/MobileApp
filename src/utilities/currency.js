/**
 * @param {number} amount is a amount to transform
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat
 */
export function formatCurrency(amount) {
  if (typeof amount !== 'number') {
    throw new Error('formatCurrency error: Value must be a number');
  }

  return new Intl.NumberFormat('en-US', { currency: 'USD', style: 'currency' }).format(amount);
}

export const transactionTypes = {
  CREDIT: 'CREDIT',
  DEBIT: 'DEBIT',
};
