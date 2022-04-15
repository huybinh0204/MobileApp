import { render } from '@testing-library/react-native';
import React from 'react';
import BaseText from './BaseText';

describe('Text', () => {
  it('should match the snapshot', () => {
    const { toJSON } = render(<BaseText>test</BaseText>);

    expect(toJSON()).toMatchSnapshot();
  });
});
