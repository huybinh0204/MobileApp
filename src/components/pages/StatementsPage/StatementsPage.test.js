import * as Split from '@splitsoftware/splitio-react';
import { render, waitFor } from '@testing-library/react-native';
import { DateTime } from 'luxon';
import React from 'react';
import { createStore } from 'redux';
import { FEATURE_FLAGS } from '_constants';
import strings from '_localization';
import rootReducer from '_store/rootReducer';
import ComponentWithProviders from '_test/mocks/ComponentWithProviders';
import StatementsPage from './StatementsPage';

const Statement = () => (
  <Split.SplitContext.Provider value={{ isReady: true }}>
    <StatementsPage />
  </Split.SplitContext.Provider>
);

describe('StatementsPage', () => {
  beforeEach(() => {
    jest.spyOn(Split, 'useClient').mockImplementation(() => ({
      getTreatment(flag) {
        expect(flag).toEqual(FEATURE_FLAGS.SHOW_ALL_MONTHS_STATEMENT);
        return 'off';
      },
    }));
  });

  it("should show a loading indicator while get user's data", async () => {
    const mockStore = createStore(rootReducer, {});

    const { getByTestId } = render(
      <ComponentWithProviders component={Statement} store={mockStore} />
    );

    await waitFor(() => {
      expect(getByTestId('Statements-Page-Loading')).toBeTruthy();
    });
  });

  it('should show the empty screen when the user does not have any', async () => {
    const mockStore = createStore(rootReducer, {
      account: {
        externalId: 'd9be3a12-1909-459c-91dd-80be2dce1353',
        accountInfo: {
          createdAt: DateTime.now().toISO(),
        },
      },
      customer: {
        externalId: 's7ds7s-459c-91dd-80be2dhd7ds8d1353',
      },
    });

    const { getByText } = render(
      <ComponentWithProviders component={Statement} store={mockStore} />
    );

    await waitFor(() => {
      expect(getByText(strings.statements.empty_main_title)).toBeTruthy();
    });
  });

  it('should match snapshot', async () => {
    const mockStore = createStore(rootReducer, {
      account: {
        externalId: 'd9be3a12-1909-459c-91dd-80be2dce1353',
        accountInfo: {
          createdAt: '2020-07-26T14:56:59.301Z',
        },
      },
    });

    const { toJSON } = render(<ComponentWithProviders component={Statement} store={mockStore} />);

    await waitFor(() => {
      expect(toJSON()).toMatchSnapshot();
    });
  });
});
