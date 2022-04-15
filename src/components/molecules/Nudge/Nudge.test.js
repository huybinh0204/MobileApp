import { fireEvent, render, waitFor } from '@testing-library/react-native';
import React from 'react';
import { BaseText } from '_components/atoms';
import { ICONS } from '_constants';
import ComponentWithProviders from '_test/mocks/ComponentWithProviders';
import Nudge from './Nudge';

describe('Nudge', () => {
  let props;

  beforeEach(() => {
    props = {
      icon: ICONS.logo,
      headerComponent: <BaseText testID="headerTitle">Title</BaseText>,
      body: 'content',
      buttonText: 'actionButton',
      onButtonPress: jest.fn(),
      testID: 'Nudge',
    };
  });

  it('should match the snapshot', () => {
    const { toJSON } = render(<ComponentWithProviders component={Nudge} componentProps={props} />);

    expect(toJSON()).toMatchSnapshot();
  });

  it('should render the header and body', () => {
    const { queryByText, queryByTestId } = render(
      <ComponentWithProviders component={Nudge} componentProps={props} />
    );

    expect(queryByTestId('headerTitle')).not.toBeNull();
    expect(queryByText(props.body)).not.toBeNull();
  });

  it('should trigger onButtonPress function', async () => {
    const { getByText } = render(
      <ComponentWithProviders component={Nudge} componentProps={props} />
    );

    await waitFor(() => {
      fireEvent.press(getByText(props.buttonText));
    });

    expect(props.onButtonPress).toHaveBeenCalled();
  });
});
