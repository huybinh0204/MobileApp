import * as Split from '@splitsoftware/splitio-react';
import { render } from '@testing-library/react-native';
import React from 'react';
import { FEATURE_FLAGS } from '_constants';
import ComponentWithProviders from '_test/mocks/ComponentWithProviders';
import SettingsPage from './SettingsPage';

const Settings = () => (
  <Split.SplitContext.Provider value={{ isReady: true }}>
    <SettingsPage />
  </Split.SplitContext.Provider>
);

describe('SettingsPage', () => {
  it('should match the snapshot with overdraft enabled', () => {
    jest.spyOn(Split, 'useClient').mockReturnValue({
      getTreatment: () => 'on',
    });

    const { toJSON } = render(<ComponentWithProviders component={Settings} />);

    expect(toJSON()).toMatchSnapshot();
  });

  it('should match the snapshot with FAQ hidden', () => {
    jest.spyOn(Split, 'useClient').mockImplementation(() => ({
      getTreatment(flag) {
        return flag === FEATURE_FLAGS.FAQ ? 'off' : 'on';
      },
    }));

    const { toJSON } = render(<ComponentWithProviders component={Settings} />);

    expect(toJSON()).toMatchSnapshot();
  });
});
