import { DateTime, IANAZone } from 'luxon';
import { getTimeZone } from 'react-native-localize';
import strings from '_localization';

function firstDayOfTheMonth(date) {
  return date.startOf('month');
}

function firstDayOfTheNextMonth(date) {
  const nextMonth = date.plus({ months: 1 });
  return firstDayOfTheMonth(nextMonth);
}

function fifthOfMonth(date) {
  return firstDayOfTheMonth(date).plus({ days: 4 });
}

export function getStatementsDateRange(
  startDateInISO,
  endDateInISO,
  showAllMonthsStatement = false
) {
  let dates = [];
  let start = DateTime.fromISO(startDateInISO);
  let end = DateTime.fromISO(endDateInISO);

  while (start < end) {
    const isDifferentYear = start.year < end.year;
    const isStartMoreThanTwoMonthsBeforeEnd = end.month - start.month > 1;
    const isStartOneMonthBeforeEnd = end.month - start.month === 1;

    if (
      isDifferentYear ||
      isStartMoreThanTwoMonthsBeforeEnd ||
      (isStartOneMonthBeforeEnd && end >= fifthOfMonth(end)) ||
      showAllMonthsStatement
    ) {
      dates.push({ date: start.toFormat('yyyyMM'), title: start.toFormat('MMMM yyyy') });
    }

    start = firstDayOfTheNextMonth(start);
  }

  return dates.reverse();
}

export function isValidDate(date) {
  return DateTime.fromFormat(date, 'MM/dd/yyyy').isValid;
}

export function isValidExpirationDate(date) {
  const month = date.substring(0, 2);
  if (month > 12) {
    return false;
  }

  const actualDate = DateTime.local();
  const parsedDate = DateTime.fromFormat(date, 'MMyy');
  return parsedDate > actualDate;
}

export function parseExpirationDate(date) {
  if (!isValidExpirationDate(date)) {
    throw new Error('date must have a valid format');
  }
  const month = date.substring(0, 2);
  const parsedDate = DateTime.fromFormat(date, 'MMyy');
  return `${parsedDate.year}-${month}`;
}

export function isValidAge(date) {
  if (isValidDate(date)) {
    const age = DateTime.fromFormat(date, 'MM/dd/yyyy');
    const now = DateTime.now();

    const days = now.day - age.day;
    const months = now.month - age.month;
    const years = now.year - age.year;

    if (years > 18) {
      return true;
    }
    if (months > 0 && years >= 18) {
      return true;
    }
    if (days >= 0 && years >= 18 && months >= 0) {
      return true;
    }
  }

  return false;
}

export function castToLocalTZ(ISODate) {
  const timeZone = getTimeZone();

  if (IANAZone.isValidZone(timeZone)) {
    const localDate = DateTime.fromISO(ISODate, { zone: timeZone });
    return localDate.toLocaleString({ month: 'long', day: 'numeric' });
  } else {
    return ISODate;
  }
}

export function ISODateTimeFromNow({ hours = 0, minutes = 0, seconds = 0 }) {
  const now = DateTime.utc();
  const dateTime = now.plus({ hours, minutes, seconds });
  return dateTime.toISO();
}

export function isPastDateTime(dateTime) {
  const now = DateTime.utc();
  const dt = DateTime.fromISO(dateTime);
  return now > dt;
}

export function getMonthFromDate(dateTime, display = 'long') {
  const deviceTimeZone = getTimeZone();
  const timeZone = IANAZone.isValidZone(deviceTimeZone) ? deviceTimeZone : 'utc';
  const currentDateTime = DateTime.fromISO(dateTime, { zone: timeZone });

  return currentDateTime.setLocale(strings.dates.locale).toLocaleString({ month: display });
}

export function getTimeBlock() {
  const deviceTimeZone = getTimeZone();
  const timeZone = IANAZone.isValidZone(deviceTimeZone) ? deviceTimeZone : 'utc';
  const { hour: currentHour } = DateTime.now().setZone(timeZone);

  if (currentHour < 12) {
    return 'morning';
  }

  if (currentHour < 18) {
    return 'afternoon';
  }

  return 'evening';
}
