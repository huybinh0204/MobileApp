import { render } from '@testing-library/react-native';
import React from 'react';
import Theme from '_utilities/Theme';
import SecondaryHeader from './SecondaryHeader';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    goBack: jest.fn(),
  }),
  DefaultTheme: {},
  DarkTheme: {},
}));

describe('SecondaryHeader', () => {
  describe('structure', () => {
    it('should match the snapshot', () => {
      const { toJSON } = render(
        <Theme>
          <SecondaryHeader title="title" />
        </Theme>
      );
      expect(toJSON()).toMatchSnapshot();
    });
  });
});
