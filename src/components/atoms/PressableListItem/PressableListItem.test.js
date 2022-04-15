import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import ComponentWithProviders from '_test/mocks/ComponentWithProviders';
import PressableListItem from './PressableListItem';

describe('PressableListItem', () => {
  let props;

  beforeEach(() => {
    props = {
      title: 'List Item',
      onPress: jest.fn(),
      rightItem: jest.fn(),
      leftItem: jest.fn(),
    };
  });

  it('should match the snapshot', () => {
    const { toJSON } = render(
      <ComponentWithProviders component={PressableListItem} componentProps={props} />
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('should display the title', () => {
    const { getByText } = render(
      <ComponentWithProviders component={PressableListItem} componentProps={props} />
    );
    expect(getByText(props.title)).not.toBeNull();
  });

  it('should display the icons', () => {
    const leftItem = jest.fn(({ testID }) => expect(testID).toEqual('LeftItem'));
    const rightItem = jest.fn(({ testID }) => expect(testID).toEqual('RightItem'));

    render(
      <ComponentWithProviders
        component={PressableListItem}
        componentProps={{ ...props, leftItem, rightItem }}
      />
    );
  });

  it('should trigger onPress', () => {
    const { getByTestId } = render(
      <ComponentWithProviders component={PressableListItem} componentProps={props} />
    );
    expect(getByTestId('PressableListItemContainer')).not.toBeNull();

    fireEvent.press(getByTestId('PressableListItemContainer'));

    expect(props.onPress).toBeCalledTimes(1);
  });
});
