import { render } from '@testing-library/react-native';
import React from 'react';
import ComponentWithProviders from '_test/mocks/ComponentWithProviders';
import TransferDetailsItem from './TransferDetailsItem';

describe('TransferDetailsItem', () => {
  let props;

  beforeEach(() => {
    props = {
      label: 'Label',
      value: 'Value',
    };
  });

  it('should match the snapshot', () => {
    const { toJSON } = render(
      <ComponentWithProviders component={TransferDetailsItem} componentProps={props} />
    );

    expect(toJSON()).toMatchSnapshot();
  });
});
