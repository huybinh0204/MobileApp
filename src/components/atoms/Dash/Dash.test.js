import React from 'react';
import { render } from '@testing-library/react-native';
import Dash from './Dash';

describe('Dash', () => {
  it('should match the snapshot', () => {
    const { toJSON } = render(
      <Dash
        style={{
          width: 1,
          height: 30,
        }}
      />
    );

    expect(toJSON()).toMatchSnapshot();
  });
});
