import { ThemeProvider } from '@emotion/react';
import { useNavigation } from '@react-navigation/native';
import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import * as ReactRedux from 'react-redux';
import { createStore } from 'redux';
import { NAVIGATION } from '_constants';
import { LightTheme } from '_constants/Themes';
import { RegisterActions } from '_store/register';
import rootReducer from '_store/rootReducer';
import { navigationMock } from '_test/mocks/navigation';
import EarlyPaycheckSuccessPage from './EarlyPaycheckSuccessPage';

jest.spyOn(RegisterActions, 'trackEvent');
jest.mock('@react-navigation/native');

describe('EarlyPaycheckSuccessPage', () => {
  let mockStore;
  let mockNavigation;
  const dispatch = jest.fn();
  jest.spyOn(ReactRedux, 'useDispatch').mockReturnValue(dispatch);

  const RenderDirectDepositFormStatusPage = (props) => (
    <ReactRedux.Provider store={mockStore}>
      <ThemeProvider theme={LightTheme}>
        <EarlyPaycheckSuccessPage {...props} />
      </ThemeProvider>
    </ReactRedux.Provider>
  );
  beforeEach(() => {
    mockNavigation = navigationMock(jest.fn);
    useNavigation.mockImplementation(() => mockNavigation);
    mockStore = createStore(rootReducer, {});
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should match snapshot', () => {
    const { toJSON } = render(<RenderDirectDepositFormStatusPage />);
    expect(toJSON()).toMatchSnapshot();
  });

  describe('Navigate to hometab when the button is pressed', () => {
    it('should dispatch isSignIn action to navigate to hometab if isSignIn is false', async () => {
      ReactRedux.useSelector = jest.fn().mockReturnValue(false);
      ReactRedux.useDispatch = jest.fn().mockReturnValue(dispatch);
      const { findByTestId } = render(<RenderDirectDepositFormStatusPage />);
      const directDepositFormStatusButton = await findByTestId('earlyPaycheckSuccessButton');
      fireEvent.press(directDepositFormStatusButton);
      expect(dispatch).toHaveBeenCalledWith({
        isSignIn: true,
        type: '@@BE-AUTHENTICATION/SET_IS_SIGN_IN',
      });
    });

    it('should use navigate to navigate to hometab if isSignIn is true', async () => {
      ReactRedux.useSelector = jest.fn().mockReturnValue(true);
      const { findByTestId } = render(<RenderDirectDepositFormStatusPage />);
      const directDepositFormStatusButton = await findByTestId('earlyPaycheckSuccessButton');
      fireEvent.press(directDepositFormStatusButton);
      expect(mockNavigation.navigate).toBeCalledWith(NAVIGATION.shared.main);
    });
  });
});
