import { render } from '@testing-library/react-native';
import React from 'react';
import Theme from '_utilities/Theme';
import ProgressBar from './ProgressBar';

describe('ProgressBar', () => {
  it('should match the snapshot', () => {
    const { toJSON } = render(
      <Theme>
        <ProgressBar step={2} numberOfSteps={10} />
      </Theme>
    );

    expect(toJSON()).toMatchSnapshot();
  });
});
