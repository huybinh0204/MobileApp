import { render } from '@testing-library/react-native';
import React from 'react';
import { ICONS } from '_constants';
import Theme from '_utilities/Theme';
import BaseFormInput from './BaseFormInput';

describe('BaseFormInput', () => {
  it('should match the snapshot', () => {
    const { toJSON } = render(
      <Theme>
        <BaseFormInput iconLeft={ICONS.userCircled} value="test" />
      </Theme>
    );

    expect(toJSON()).toMatchSnapshot();
  });
});
