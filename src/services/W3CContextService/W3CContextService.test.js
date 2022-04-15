import W3CContextService from './index';

const mockedToString = jest.fn();

jest.mock('react-native-randombytes', () => ({
  randomBytes: jest.fn(() => ({
    toString: mockedToString,
  })),
}));

describe('W3CContextService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const VALID_TRACE_ID = '1c73dd634f64e0ad217ac07c9eeb4b69';
  const INVALID_TRACE_ID = '00000000000000000000000000000000';
  const VALID_SPAN_ID = 'd76badbef040231f';
  const INVALID_SPAN_ID = '0000000000000000';
  const VALID_TRACE_STATE_ID = '8d78b8ab68e440cc142210bf';
  const VALID_TRACEPARENT_REGEX = /^00-([0-9]|[a-f]){32}-([0-9]|[a-f]){16}-00$/;
  const VALID_TRACESTATE_REGEX = /^ahead-mobile=([0-9]|[a-f]){24}$/;

  it('returns valid traceparent', () => {
    mockedToString
      .mockImplementationOnce(() => VALID_TRACE_ID)
      .mockImplementationOnce(() => VALID_SPAN_ID);

    const traceparent = W3CContextService.traceParent;

    expect(traceparent).toMatch(VALID_TRACEPARENT_REGEX);
  });

  it('regenerates traceID and spanID if they are invalid', () => {
    mockedToString
      .mockImplementationOnce(() => INVALID_TRACE_ID)
      .mockImplementationOnce(() => VALID_TRACE_ID)
      .mockImplementationOnce(() => INVALID_SPAN_ID)
      .mockImplementationOnce(() => VALID_SPAN_ID);

    const traceparent = W3CContextService.traceParent;

    expect(traceparent).toMatch(VALID_TRACEPARENT_REGEX);
    expect(mockedToString).toHaveBeenCalledTimes(4);
  });

  it('it generates valid tracestate', () => {
    mockedToString.mockImplementationOnce(() => VALID_TRACE_STATE_ID);
    const tracestate = W3CContextService.traceState;

    expect(tracestate).toMatch(VALID_TRACESTATE_REGEX);
  });
});
