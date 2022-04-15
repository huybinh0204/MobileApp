import { randomBytes } from 'react-native-randombytes';

export default class W3CContextService {
  static INVALID_TRACE_ID = '00000000000000000000000000000000';
  static INVALID_SPAN_ID = '0000000000000000';
  static VERSION = '00';
  static HEX_ENCODING = 'hex';
  static TRACE_FLAGS = '00';
  static VENDOR_NAME = 'ahead-mobile';

  static get traceParent() {
    const traceId = this.generateTraceID();
    const spanId = this.generateSpanID();

    return `${this.VERSION}-${traceId}-${spanId}-${this.TRACE_FLAGS}`;
  }

  static get traceState() {
    const stateValue = randomBytes(12).toString(this.HEX_ENCODING);

    return `${this.VENDOR_NAME}=${stateValue}`;
  }

  static isValidTraceID(traceId) {
    return traceId !== this.INVALID_TRACE_ID;
  }

  static isValidSpanID(spanId) {
    return spanId !== this.INVALID_SPAN_ID;
  }

  static generateTraceID() {
    const traceId = randomBytes(16).toString(this.HEX_ENCODING);

    return this.isValidTraceID(traceId) ? traceId : this.generateTraceID();
  }

  static generateSpanID() {
    const spanId = randomBytes(8).toString(this.HEX_ENCODING);

    return this.isValidSpanID(spanId) ? spanId : this.generateSpanID();
  }
}
