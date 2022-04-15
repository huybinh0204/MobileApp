import { render } from '@testing-library/react-native';
import React from 'react';
import { ICONS } from '_constants';
import IconSvg from './IconSvg';

describe('IconSvg', () => {
  let props;

  beforeEach(() => {
    props = {
      icon: ICONS.logo,
      width: 100,
      height: 100,
    };
  });

  it('should match the snapshot', () => {
    const { toJSON } = render(<IconSvg {...props} />);

    expect(toJSON()).toMatchSnapshot();
  });

  it('should Render mesage if the provided icon not exist', () => {
    const { getByTestId } = render(<IconSvg testID="icon" icon="testIcon" />);

    const icon = getByTestId('icon');

    expect(icon).toHaveTextContent('not Found');
  });
});
