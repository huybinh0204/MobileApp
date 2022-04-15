import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import { createStore } from 'redux';
import PolicyTermsPage from './PolicyTermsPage';
import rootReducer from '_store/rootReducer';
import ComponentWithProviders from '_test/mocks/ComponentWithProviders';

describe('PolicyTermsPage', () => {
  it('should match snapshot', async () => {
    const mockStore = createStore(rootReducer, {});

    const { toJSON } = render(
      <ComponentWithProviders component={PolicyTermsPage} store={mockStore} />
    );

    await waitFor(() => {
      expect(toJSON()).toMatchSnapshot();
    });
  });
});
