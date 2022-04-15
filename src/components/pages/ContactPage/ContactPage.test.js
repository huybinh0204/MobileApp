import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import { Linking } from 'react-native';
import { createStore } from 'redux';
import rootReducer from '_store/rootReducer';
import ComponentWithProviders from '_test/mocks/ComponentWithProviders';
import ContactPage from './ContactPage';
import strings from '_localization';

describe('ContactPage', () => {
  let mockStore;

  beforeEach(() => {
    mockStore = createStore(rootReducer, {});
    jest.spyOn(Linking, 'openURL');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should match the snapshot', () => {
    const { toJSON } = render(<ComponentWithProviders component={ContactPage} store={mockStore} />);

    expect(toJSON()).toMatchSnapshot();
  });

  it('should show the contact button', async () => {
    const { getByA11yLabel } = render(
      <ComponentWithProviders component={ContactPage} store={mockStore} />
    );

    await fireEvent.press(getByA11yLabel('ContactButton'));
    expect(Linking.openURL).toBeCalled();
  });

  it('should render the contact email as email link', async () => {
    const { getByText } = render(
      <ComponentWithProviders component={ContactPage} store={mockStore} />
    );

    await fireEvent.press(getByText(strings.contact.email));
    expect(Linking.openURL).toBeCalledWith(`mailto:${strings.contact.email}`);
  });
});
