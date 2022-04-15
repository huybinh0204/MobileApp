import { REGEX } from '_constants';
import { getMonthFromDate } from '_utilities/date';
/**
 * Format the ach data for match LinkedAccounts component.
 * @param {Array} data
 */
export function formatAccountList(accounts) {
  return accounts.map(({ accountId, lastFourDigits, accountName }) => ({
    name: `${accountName} (${lastFourDigits})`,
    id: accountId,
  }));
}

/**
 * Formats the transactions array into an array of sections (by month)
 * @param {Array} transactions
 * @returns {Array}
 */
export function groupTransactionsByMonth(transactions) {
  const transactionsByMonth = transactions.reduce((accumulator, currentTransaction) => {
    const month = getMonthFromDate(currentTransaction.createdDateTime);

    if (accumulator[month]) {
      accumulator[month].push(currentTransaction);
    } else {
      accumulator[month] = [currentTransaction];
    }
    return accumulator;
  }, {});
  const sections = [];
  for (const month in transactionsByMonth) {
    sections.push({
      title: month,
      data: transactionsByMonth[month],
      date: transactionsByMonth[month][0].createdDateTime,
    });
  }
  return sections.sort((a, b) => new Date(a.date, 10) - new Date(b.date, 10));
}

export function formatPhoneNumber(phone) {
  if (!phone) {
    return;
  }
  let str = phone.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
  const last = str[3] ? '-' + str[3] : '';
  return !str[2] ? str[1] : '(' + str[1] + ') ' + str[2] + last;
}

export function cleanPhoneNumber(code, phoneNumber) {
  return `${code}${phoneNumber.replace(REGEX.cleanPhoneNumber, '')}`;
}
