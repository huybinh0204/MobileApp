import { fireEvent, render, waitFor } from '@testing-library/react-native';
import React from 'react';
import ComponentWithProviders from '_test/mocks/ComponentWithProviders';
import MainButton from './MainButton';

describe('MainButton', () => {
  let props;
  const action = jest.fn();

  beforeEach(() => {
    props = {
      children: 'text',
      onPress: action,
    };
  });

  it('should match the snapshot', async () => {
    const { toJSON } = render(
      <ComponentWithProviders component={MainButton} componentProps={props} />
    );

    await waitFor(() => {
      expect(toJSON()).toMatchSnapshot();
    });
  });

  it('should call on press', async () => {
    const { getByText } = render(
      <ComponentWithProviders component={MainButton} componentProps={props} />
    );

    const mainButton = getByText('text');

    await waitFor(() => {
      fireEvent.press(mainButton);
    });

    expect(action).toBeCalledTimes(1);
  });
});
