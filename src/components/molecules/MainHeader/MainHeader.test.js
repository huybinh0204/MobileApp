import { render } from '@testing-library/react-native';
import React from 'react';
import Theme from '_utilities/Theme';
import MainHeader from './MainHeader';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
  DefaultTheme: {},
  DarkTheme: {},
}));

describe('MainHeader', () => {
  let props;

  beforeEach(() => {
    props = {
      title: 'title',
    };
  });

  describe('structure', () => {
    it('should match the snapshot', () => {
      const { toJSON } = render(
        <Theme>
          <MainHeader {...props} />
        </Theme>
      );
      expect(toJSON()).toMatchSnapshot();
    });
  });
});
