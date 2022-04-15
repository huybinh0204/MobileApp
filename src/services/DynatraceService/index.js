import { Dynatrace } from '@dynatrace/react-native-plugin';

class DynatraceService {
  static reportNavigationAction(screen) {
    const navigationAction = Dynatrace.enterAction(`${screen} Opened`);
    navigationAction.leaveAction();
  }
}

export default DynatraceService;
