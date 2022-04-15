import { render, waitFor } from '@testing-library/react-native';
import React from 'react';
import { createStore } from 'redux';
import { BaseText } from '_components/atoms';
import rootReducer from '_store/rootReducer';
import ComponentWithProviders from '_test/mocks/ComponentWithProviders';
import MainScreenLayout from './MainScreenLayout';

const Component = () => (
  <MainScreenLayout title="test" testID="test">
    <BaseText>test</BaseText>
  </MainScreenLayout>
);

describe('MainScreenLayout', () => {
  let mockStore;

  beforeEach(() => {
    mockStore = createStore(rootReducer, {});
  });

  describe('structure', () => {
    it('should match the snapshot', async () => {
      const { toJSON } = render(<ComponentWithProviders component={Component} store={mockStore} />);

      await waitFor(() => {
        expect(toJSON()).toMatchSnapshot();
      });
    });
  });
});
