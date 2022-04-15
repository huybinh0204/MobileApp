import { render } from '@testing-library/react-native';
import React from 'react';
import BaseText from '_components/atoms/BaseText/BaseText';
import Theme from '_utilities/Theme';
import Card from './Card';

describe('Card', () => {
  it('should match the snapshot', () => {
    const { toJSON } = render(
      <Theme>
        <Card>
          <BaseText>test</BaseText>
        </Card>
      </Theme>
    );

    expect(toJSON()).toMatchSnapshot();
  });
});
