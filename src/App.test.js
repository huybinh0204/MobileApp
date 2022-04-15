import React from 'react';
import 'react-native';
import renderer from 'react-test-renderer';
import App from './App';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn,
}));

describe('App', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    renderer.create(<App />);
  });
});
