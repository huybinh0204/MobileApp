import { render } from '@testing-library/react-native';
import React from 'react';
import ComponentWithProviders from '_test/mocks/ComponentWithProviders';
import Toast from './Toast';

describe('Toast', () => {
  let props;

  beforeEach(() => {
    props = {
      content: 'content',
      header: 'header',
      show: true,
    };
  });

  it('should match the snapshot', () => {
    const { toJSON } = render(<ComponentWithProviders component={Toast} componentProps={props} />);

    expect(toJSON()).toMatchSnapshot();
  });

  it('should render header and body', () => {
    const { getByText } = render(
      <ComponentWithProviders component={Toast} componentProps={props} />
    );

    expect(getByText('header')).toBeTruthy();
    expect(getByText('content')).toBeTruthy();
  });
});
