import { render } from '@testing-library/react-native';
import React from 'react';
import { createStore } from 'redux';
import { BaseText } from '_components/atoms';
import rootReducer from '_store/rootReducer';
import ComponentWithProviders from '_test/mocks/ComponentWithProviders';
import OnboardingScreenLayout from './OnboardingScreenLayout';

const Content = () => (
  <OnboardingScreenLayout step={5} numberOfSteps={10} testID="OnboardingScreenLayout">
    <BaseText>Test</BaseText>
  </OnboardingScreenLayout>
);

describe('OnboardingScreenLayout', () => {
  let mockStore;

  beforeEach(() => {
    mockStore = createStore(rootReducer, {});
  });

  it('should match the snapshot', () => {
    const { toJSON } = render(<ComponentWithProviders component={Content} store={mockStore} />);

    expect(toJSON()).toMatchSnapshot();
  });
});
