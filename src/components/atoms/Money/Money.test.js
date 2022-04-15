import { render } from '@testing-library/react-native';
import React from 'react';
import ComponentWithProviders from '_test/mocks/ComponentWithProviders';
import Money from './Money';

describe('Money', () => {
  let props;

  beforeEach(() => {
    props = {
      value: 500,
    };
  });

  it('should match snapshot', async () => {
    const { toJSON } = render(<ComponentWithProviders component={Money} componentProps={props} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('should format the value properly', async () => {
    const { getByText } = render(
      <ComponentWithProviders component={Money} componentProps={props} />
    );

    expect(getByText('$500.00')).toBeTruthy();
  });
});
