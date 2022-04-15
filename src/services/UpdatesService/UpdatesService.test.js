import UpdatesService from '_services/UpdatesService';

describe('shouldForceUpdate', () => {
  it('the user must update the app', () => {
    expect(UpdatesService.shouldForceUpdate('1.0', '0.0')).toBeTruthy();
    expect(UpdatesService.shouldForceUpdate('1.0', '0.1')).toBeTruthy();
    expect(UpdatesService.shouldForceUpdate('1.0', '0.9')).toBeTruthy();
    expect(UpdatesService.shouldForceUpdate('1.0', '0.99.9')).toBeTruthy();
    expect(UpdatesService.shouldForceUpdate('1.1', '1.0.11')).toBeTruthy();
    expect(UpdatesService.shouldForceUpdate('1.5.0', '0.9.9')).toBeTruthy();
    expect(UpdatesService.shouldForceUpdate('1.0', '0.9.0')).toBeTruthy();
    expect(UpdatesService.shouldForceUpdate('0.9.1', '0.9.0')).toBeTruthy();
    expect(UpdatesService.shouldForceUpdate('0.101', '0.11')).toBeTruthy();
    expect(UpdatesService.shouldForceUpdate('0.11.1', '0.11.0')).toBeTruthy();
  });

  it('the user do not need to update the app', () => {
    expect(UpdatesService.shouldForceUpdate('0.0', '0.1')).toBeFalsy();
    expect(UpdatesService.shouldForceUpdate('1.0', '1.0.0')).toBeFalsy();
    expect(UpdatesService.shouldForceUpdate('1.0', '1.1')).toBeFalsy();
    expect(UpdatesService.shouldForceUpdate('0.9', '1.0')).toBeFalsy();
    expect(UpdatesService.shouldForceUpdate('0.9.9', '1.0')).toBeFalsy();
    expect(UpdatesService.shouldForceUpdate('0.9.0', '1.0.0')).toBeFalsy();
    expect(UpdatesService.shouldForceUpdate('1.9.9', '2.0')).toBeFalsy();
    expect(UpdatesService.shouldForceUpdate('0.9', '0.9.1')).toBeFalsy();
    expect(UpdatesService.shouldForceUpdate('0.9', '0.9.0')).toBeFalsy();
    expect(UpdatesService.shouldForceUpdate('0.11.0', '0.11')).toBeFalsy();
    expect(UpdatesService.shouldForceUpdate('0.11.1', '0.12')).toBeFalsy();
  });
});
