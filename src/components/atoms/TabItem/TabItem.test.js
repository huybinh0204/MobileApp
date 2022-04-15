import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import ComponentWithProviders from '_test/mocks/ComponentWithProviders';
import TabItem from './TabItem';

describe('TabItem', () => {
  let props;
  let onPressMock = jest.fn();

  beforeEach(() => {
    props = {
      icon: 'ahead',
      isActive: true,
      onPress: onPressMock,
      title: 'test',
    };
  });

  it('should match the snapshot', () => {
    const { toJSON } = render(
      <ComponentWithProviders component={TabItem} componentProps={props} />
    );

    expect(toJSON()).toMatchSnapshot();
  });

  it('should have a icon', () => {
    const { getByTestId } = render(
      <ComponentWithProviders component={TabItem} componentProps={props} />
    );

    const tabIcon = getByTestId('tabIcon');

    expect(tabIcon).toBeTruthy();
  });

  it('should have a label', () => {
    const { getByTestId } = render(
      <ComponentWithProviders component={TabItem} componentProps={props} />
    );

    const tabItem = getByTestId('tabLabel');

    expect(tabItem).toHaveTextContent('test');
  });

  it('should trigger onPress callback', () => {
    const { getByA11yLabel } = render(
      <ComponentWithProviders component={TabItem} componentProps={props} />
    );

    const tabItem = getByA11yLabel('test Tab Button');

    fireEvent.press(tabItem);

    expect(onPressMock).toHaveBeenCalledTimes(1);
  });
});
