import { render } from '@testing-library/react-native';
import React from 'react';
import { BaseText } from '_components/atoms';
import BottomSheet from './BottomSheet';

describe('BottomSheet', () => {
  let props;

  beforeEach(() => {
    props = {
      isVisible: true,
      children: <BaseText>Hi</BaseText>,
      onClose: jest.fn(),
      onOpen: jest.fn(),
    };
  });

  it('should match the snapshot', () => {
    const { toJSON } = render(<BottomSheet {...props} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('should call onOpen if isVisible is true', () => {
    render(<BottomSheet {...props} />);
    expect(props.onOpen).toBeCalled();
    expect(props.onClose).not.toBeCalled();
  });

  it('should render the content', () => {
    const { getByText } = render(<BottomSheet {...props} />);
    expect(getByText('Hi')).not.toBeNull();
  });
});
