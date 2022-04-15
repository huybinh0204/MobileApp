import { render } from '@testing-library/react-native';
import React from 'react';
import Theme from '_utilities/Theme';
import SegmentedTextInput from './SegmentedTextInput';

describe('SegmentedTextInput', () => {
  it('should match the snapshot', () => {
    const { toJSON } = render(
      <Theme>
        <SegmentedTextInput
          cellCount={10}
          placeholder="XXXXXXXXXX"
          separatorIndexes={[]}
          setValue={() => {}}
          value="value"
        />
      </Theme>
    );

    expect(toJSON()).toMatchSnapshot();
  });
});
