import { DateTime, Settings } from 'luxon';
import {
  getMonthFromDate,
  getStatementsDateRange,
  getTimeBlock,
  isValidAge,
  isValidDate,
  isValidExpirationDate,
  parseExpirationDate,
} from '_utilities/date';

describe('getStatementsDateRange', () => {
  beforeAll(() => {
    Settings.defaultZoneName = 'utc';
  });

  afterAll(() => {
    Settings.defaultZoneName = 'local';
  });

  it('should return a valid range', () => {
    const lastNovember = '2020-11-23T00:00:00.000Z';
    const earlyApril = '2021-04-01T00:00:00.000Z';
    const forthOfMay = '2021-05-04T00:00:00.000Z';
    const fifthOfMay = '2021-05-05T00:00:00.000Z';
    const lateMay = '2021-05-29T00:00:00.000Z';
    const showAllStatements = true;

    expect(getStatementsDateRange(lateMay, lastNovember)).toEqual([]);
    expect(getStatementsDateRange(lateMay, lastNovember, showAllStatements)).toEqual([]);

    expect(getStatementsDateRange(forthOfMay, lateMay)).toEqual([]);
    expect(getStatementsDateRange(forthOfMay, fifthOfMay)).toEqual([]);

    expect(getStatementsDateRange(forthOfMay, lateMay, showAllStatements)).toEqual([
      { date: '202105', title: 'May 2021' },
    ]);

    expect(getStatementsDateRange(forthOfMay, fifthOfMay, showAllStatements)).toEqual([
      { date: '202105', title: 'May 2021' },
    ]);

    expect(getStatementsDateRange(earlyApril, forthOfMay)).toEqual([]);

    expect(getStatementsDateRange(earlyApril, fifthOfMay)).toEqual([
      { date: '202104', title: 'April 2021' },
    ]);

    expect(getStatementsDateRange(earlyApril, forthOfMay, showAllStatements)).toEqual([
      { date: '202105', title: 'May 2021' },
      { date: '202104', title: 'April 2021' },
    ]);

    expect(getStatementsDateRange(lastNovember, forthOfMay)).toEqual([
      { date: '202103', title: 'March 2021' },
      { date: '202102', title: 'February 2021' },
      { date: '202101', title: 'January 2021' },
      { date: '202012', title: 'December 2020' },
      { date: '202011', title: 'November 2020' },
    ]);

    expect(getStatementsDateRange(lastNovember, forthOfMay, showAllStatements)).toEqual([
      { date: '202105', title: 'May 2021' },
      { date: '202104', title: 'April 2021' },
      { date: '202103', title: 'March 2021' },
      { date: '202102', title: 'February 2021' },
      { date: '202101', title: 'January 2021' },
      { date: '202012', title: 'December 2020' },
      { date: '202011', title: 'November 2020' },
    ]);
  });
});

describe('isValidDate', () => {
  it('should return valid date', () => {
    expect(isValidDate('09/24/1997')).toBe(true);
    expect(isValidDate('01/01/2001')).toBe(true);
    expect(isValidDate('09/10/1970')).toBe(true);
  });

  it('should return invalid date', () => {
    expect(isValidDate('45/83/1900')).toBe(false);
    expect(isValidDate('13/31/1990')).toBe(false);
    expect(isValidDate('01/32/2021')).toBe(false);
    expect(isValidDate('AA/BB/CCCC')).toBe(false);
  });
});

describe('isValidAge', () => {
  it('should return valid age', () => {
    const validAge = DateTime.now().minus({ years: 18 }).toFormat('MM/dd/yyyy');
    expect(isValidAge('09/24/1997')).toBe(true);
    expect(isValidAge('01/01/2001')).toBe(true);
    expect(isValidAge('09/10/1970')).toBe(true);
    expect(isValidAge(validAge)).toBe(true);
  });

  it('should return invalid age', () => {
    const invalidAge = DateTime.now().minus({ years: 18 }).plus({ days: 1 }).toFormat('MM/dd/yyyy');
    expect(isValidAge('45/83/1900')).toBe(false);
    expect(isValidAge('01/31/2006')).toBe(false);
    expect(isValidAge('AA/BB/CCCC')).toBe(false);
    expect(isValidAge(invalidAge)).toBe(false);
  });
});

describe('isValidExpirationDate', () => {
  beforeEach(() => {
    const expectedNow = DateTime.local(2021, 6, 1, 0, 0, 0);
    Settings.now = () => expectedNow.toMillis();
  });

  afterEach(() => {
    Settings.now = () => new Date();
  });

  it('should return a valid expiration date', () => {
    expect(isValidExpirationDate('1225')).toBe(true);
    expect(isValidExpirationDate('0525')).toBe(true);
    expect(isValidExpirationDate('1021')).toBe(true);
  });

  it('should return an invalid expiration date', () => {
    expect(isValidExpirationDate('1215')).toBe(false);
    expect(isValidExpirationDate('0121')).toBe(false);
    expect(isValidExpirationDate('1119')).toBe(false);
  });

  it('should return a formatted date', () => {
    expect(parseExpirationDate('1225')).toEqual('2025-12');
    expect(parseExpirationDate('0525')).toEqual('2025-05');
    expect(parseExpirationDate('0622')).toEqual('2022-06');
  });
});

describe('getTimeBlock', () => {
  beforeEach(() => {
    jest.useFakeTimers('modern');
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should return "morning" if time is between 00 and 12', () => {
    jest.setSystemTime(Date.parse('2021-01-01T00:00:00Z'));
    expect(getTimeBlock()).toBe('morning');

    jest.setSystemTime(Date.parse('2021-01-01T08:00:00Z'));
    expect(getTimeBlock()).toBe('morning');

    jest.setSystemTime(Date.parse('2021-01-01T11:59:59Z'));
    expect(getTimeBlock()).toBe('morning');
  });

  it('should return "afternoon" if time is between 12 and 18', () => {
    jest.setSystemTime(Date.parse('2021-01-01T12:00:00Z'));
    expect(getTimeBlock()).toBe('afternoon');

    jest.setSystemTime(Date.parse('2021-01-01T16:30:00Z'));
    expect(getTimeBlock()).toBe('afternoon');

    jest.setSystemTime(Date.parse('2021-01-01T17:59:59Z'));
    expect(getTimeBlock()).toBe('afternoon');
  });

  it('should return "evening" if time is between 18 and 00', () => {
    jest.setSystemTime(Date.parse('2021-01-01T18:00:00Z'));
    expect(getTimeBlock()).toBe('evening');

    jest.setSystemTime(Date.parse('2021-01-01T21:15:00Z'));
    expect(getTimeBlock()).toBe('evening');

    jest.setSystemTime(Date.parse('2021-01-01T23:59:59Z'));
    expect(getTimeBlock()).toBe('evening');
  });
});

describe('getMonthFromDate', () => {
  it('should return a month value from a date time', () => {
    expect(getMonthFromDate('2020-10-28T15:43:18Z')).toEqual('October');
    expect(getMonthFromDate('2020-10-28T15:43:18Z', 'numeric')).toEqual('10');
  });
});
