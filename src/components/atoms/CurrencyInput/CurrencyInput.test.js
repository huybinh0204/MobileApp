import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import ComponentWithProviders from '_test/mocks/ComponentWithProviders';
import CurrencyInput from './CurrencyInput';

describe('CurrencyInput', () => {
  const onChangeValueMock = jest.fn();

  const props = {
    onChangeValue: onChangeValueMock,
    value: 0,
    testID: 'input',
    amountTestID: 'formattedValue',
  };

  it('should match the snapshot', () => {
    const { toJSON } = render(
      <ComponentWithProviders component={CurrencyInput} componentProps={props} />
    );

    expect(toJSON()).toMatchSnapshot();
  });

  it('should call the "onChangeText" when input changes', () => {
    const { getByTestId } = render(
      <ComponentWithProviders component={CurrencyInput} componentProps={props} />
    );

    const input = getByTestId('input');
    const formattedValue = getByTestId('formattedValue');

    expect(formattedValue).toHaveTextContent('$0.00');

    fireEvent.changeText(input, '1000');

    expect(onChangeValueMock).toBeCalledWith(10);
  });
});
