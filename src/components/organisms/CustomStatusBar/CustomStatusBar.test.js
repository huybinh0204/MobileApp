import { render } from '@testing-library/react-native';
import React from 'react';
import Theme from '_utilities/Theme';
import CustomStatusBar from './CustomStatusBar';

describe('CustomStatusBar', () => {
  it('should match the snapshot', () => {
    const { toJSON } = render(
      <Theme>
        <CustomStatusBar backgroundColor="#ECF6EA" />
      </Theme>
    );

    expect(toJSON()).toMatchSnapshot();
  });
});
