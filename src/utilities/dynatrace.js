export function shouldReportError(statusCode) {
  return statusCode < 400 || statusCode >= 500;
}
