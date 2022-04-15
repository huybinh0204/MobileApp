import { render } from '@testing-library/react-native';
import React from 'react';
import ComponentWithProviders from '_test/mocks/ComponentWithProviders';
import PressableList from './PressableList';

describe('PressableList', () => {
  let props;

  beforeEach(() => {
    props = {
      items: [{ title: 'List Item 1' }, { title: 'List Item 2' }],
    };
  });

  it('should match the snapshot', () => {
    const { toJSON } = render(
      <ComponentWithProviders component={PressableList} componentProps={props} />
    );

    expect(toJSON()).toMatchSnapshot();
  });

  it('should display correct number of items', () => {
    const { getAllByTestId } = render(
      <ComponentWithProviders component={PressableList} componentProps={props} />
    );

    expect(getAllByTestId('ItemTitle')).toHaveLength(2);
  });
});
