import { fireEvent, render, waitFor } from '@testing-library/react-native';
import React from 'react';
import ComponentWithProviders from '_test/mocks/ComponentWithProviders';
import NotifyModal from './NotifyModal';

describe('NotifyModal', () => {
  let props;

  beforeEach(() => {
    props = {
      title: 'Title',
      description: 'Description',
      buttonText: 'Cancel',
      onDismiss: jest.fn(),
      visible: true,
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should match the snapshot', async () => {
    const { toJSON } = render(
      <ComponentWithProviders component={NotifyModal} componentProps={props} />
    );

    await waitFor(() => {
      expect(toJSON()).toMatchSnapshot();
    });
  });

  it('should call onDismiss when the modal button is pressed', async () => {
    const { getByText } = render(
      <ComponentWithProviders component={NotifyModal} componentProps={props} />
    );

    const modalButton = getByText(props.buttonText);

    await fireEvent.press(modalButton);

    expect(props.onDismiss).toBeCalled();
  });
});
