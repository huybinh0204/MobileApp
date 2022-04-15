import { render } from '@testing-library/react-native';
import React from 'react';
import { GeneralContainer } from '_components/atoms';
import BaseText from '_components/atoms/BaseText/BaseText';
import Theme from '_utilities/Theme';

describe('GeneralContainer', () => {
  describe('structure', () => {
    it('should match the snapshot for GeneralContainer', () => {
      const { toJSON } = render(
        <Theme>
          <GeneralContainer>
            <BaseText>content</BaseText>,
          </GeneralContainer>
        </Theme>
      );

      expect(toJSON()).toMatchSnapshot();
    });
  });
});
