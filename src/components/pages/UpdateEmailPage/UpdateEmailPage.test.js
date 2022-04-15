import { useNavigation } from '@react-navigation/native';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import React from 'react';
import { useDispatch } from 'react-redux';
import { createStore } from 'redux';
import strings from '_localization/index';
import rootReducer from '_store/rootReducer';
import ComponentWithProviders from '_test/mocks/ComponentWithProviders';
import { navigationMock } from '_test/mocks/navigation';
import UpdateEmailPage from './UpdateEmailPage';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

describe('UpdateEmailPage', () => {
  const mockedDispatch = jest.fn();
  const mockedNavigation = navigationMock(jest.fn);
  const mockStore = createStore(rootReducer, { customer: { externalId: 1113 } });

  beforeEach(() => {
    useNavigation.mockReturnValue(mockedNavigation);
    useDispatch.mockReturnValue(mockedDispatch);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should not navigate if the mail input is not correct', async () => {
    const { getByText, getByTestId } = render(
      <ComponentWithProviders component={UpdateEmailPage} store={mockStore} />
    );

    const emailInput = getByTestId('newAccountMail');
    fireEvent.changeText(emailInput, 'testmailcom');

    const sendMail = getByText(strings.signUp.continue);
    fireEvent.press(sendMail);

    await waitFor(() => {
      expect(mockedNavigation.navigate).toBeCalledTimes(0);
    });
  });

  it('should match snapshot', () => {
    const { toJSON } = render(
      <ComponentWithProviders component={UpdateEmailPage} store={mockStore} />
    );

    expect(toJSON()).toMatchSnapshot();
  });
});
