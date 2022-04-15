import { render } from '@testing-library/react-native';
import React from 'react';
import Theme from '_utilities/Theme';
import ProgressHeader from './ProgressHeader';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({ goBack: jest.fn() }),
}));

describe('ProgressHeader', () => {
  it('should match the snapshot', () => {
    const { toJSON } = render(
      <Theme>
        <ProgressHeader step={5} numberOfSteps={10} />
      </Theme>
    );

    expect(toJSON()).toMatchSnapshot();
  });
});
