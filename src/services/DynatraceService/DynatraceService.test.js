import { Dynatrace } from '@dynatrace/react-native-plugin';
import DynatraceService from '_services/DynatraceService';

describe('DynatraceService', () => {
  it('should call reportNavigationAction with the screen name', () => {
    const screenName = 'Test Screen';
    const enterActionMock = jest.spyOn(Dynatrace, 'enterAction');
    const leaveActionMock = jest.fn();

    enterActionMock.mockReturnValue({
      leaveAction: leaveActionMock,
    });

    DynatraceService.reportNavigationAction(screenName);

    expect(enterActionMock).toHaveBeenCalledWith(`${screenName} Opened`);
    expect(leaveActionMock).toHaveBeenCalled();
  });
});
