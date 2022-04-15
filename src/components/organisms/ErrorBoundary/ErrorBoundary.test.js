import { SplitContext, useClient } from '@splitsoftware/splitio-react';
import { render } from '@testing-library/react-native';
import React from 'react';
import { WelcomePage } from '_components/pages';
import ComponentWithProviders from '_test/mocks/ComponentWithProviders';
import ErrorBoundary from './ErrorBoundary';

jest.mock('@splitsoftware/splitio-react', () => ({
  ...jest.requireActual('@splitsoftware/splitio-react'),
  useClient: jest.fn(),
}));

const Boundary = () => (
  <ErrorBoundary>
    <SplitContext.Provider value={{ isReady: true }}>
      <WelcomePage />
    </SplitContext.Provider>
  </ErrorBoundary>
);

describe('ErrorBoundary', () => {
  beforeEach(() => {
    useClient.mockReturnValue({ getTreatment: (flag) => 'off' });
  });

  it('should match the snapshot', () => {
    const { toJSON } = render(<ComponentWithProviders component={Boundary} />);

    expect(toJSON()).toMatchSnapshot();
  });
});
