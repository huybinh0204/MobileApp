import { useNavigation } from '@react-navigation/native';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import React from 'react';
import * as ReactRedux from 'react-redux';
import { createStore } from 'redux';
import { OverdraftState } from '_constants';
import strings from '_localization/index';
import rootReducer from '_store/rootReducer';
import ComponentWithProviders from '_test/mocks/ComponentWithProviders';
import { navigationMock } from '_test/mocks/navigation';
import OverdraftLegalAgreementPage from './OverdraftLegalAgreementPage';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));

const dispatch = jest.fn();
jest.spyOn(ReactRedux, 'useDispatch').mockReturnValue(dispatch);

describe('OverdraftLegalAgreementPage', () => {
  let mockStore;
  let mockNavigation;

  beforeEach(() => {
    mockStore = createStore(rootReducer, {});
    mockNavigation = navigationMock(jest.fn);
    useNavigation.mockImplementation(() => mockNavigation);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should match snapshot', async () => {
    const { toJSON } = render(
      <ComponentWithProviders component={OverdraftLegalAgreementPage} store={mockStore} />
    );

    await waitFor(() => {
      expect(toJSON()).toMatchSnapshot();
    });
  });

  it('should not enable the submit button if the checkbox is not marked', async () => {
    const { getByText } = render(
      <ComponentWithProviders component={OverdraftLegalAgreementPage} store={mockStore} />
    );

    const submit = getByText(strings.overdraft.legalAgreement.submit);

    await waitFor(() => {
      fireEvent.press(submit);
      expect(mockNavigation.navigate).toBeCalledTimes(0);
    });
  });

  it('should navigate to the overdraft success screen', async () => {
    mockStore = createStore(rootReducer, {
      account: {
        overdraft: {
          state: OverdraftState.OPT_IN,
        },
      },
    });

    const { getByText, getByTestId } = render(
      <ComponentWithProviders component={OverdraftLegalAgreementPage} store={mockStore} />
    );

    const checkbox = getByTestId('agreementCheckbox');
    const submit = getByText(strings.overdraft.legalAgreement.submit);

    await waitFor(() => {
      fireEvent(checkbox, 'onValueChange', {
        nativeEvent: {
          value: true,
        },
      });
      fireEvent.press(submit);
      expect(mockNavigation.navigate).toBeCalledTimes(1);
    });
  });
});
