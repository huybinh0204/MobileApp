import Clipboard from '@react-native-community/clipboard';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import React from 'react';
import ComponentWithProviders from '_test/mocks/ComponentWithProviders';
import AboutPage from './AboutPage';

describe('AboutPage', () => {
  it('should match the snapshot', async () => {
    const { toJSON } = render(<ComponentWithProviders component={AboutPage} />);

    await waitFor(() => {
      expect(toJSON()).toMatchSnapshot();
    });
  });

  it('should copy the account number', async () => {
    jest.spyOn(Clipboard, 'setString');

    const { getByAccessibilityLabel } = render(<ComponentWithProviders component={AboutPage} />);
    const appVersion = getByAccessibilityLabel('Copy app version');
    const buildNumber = getByAccessibilityLabel('Copy build number');
    const deviceID = getByAccessibilityLabel('Copy device ID');

    await waitFor(() => {
      fireEvent(appVersion, 'onLongPress');
      expect(Clipboard.setString).toBeCalledWith('appVersion');

      fireEvent(buildNumber, 'onLongPress');
      expect(Clipboard.setString).toBeCalledWith('buildNumber');

      fireEvent(deviceID, 'onLongPress');
      expect(Clipboard.setString).toBeCalledWith('deviceId');
    });
  });
});
