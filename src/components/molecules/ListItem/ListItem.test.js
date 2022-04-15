import { render } from '@testing-library/react-native';
import React from 'react';
import { ICONS } from '_constants';
import Theme from '_utilities/Theme';
import ListItem from './ListItem';

describe('ListItem', () => {
  let props;

  const RederListItem = (innerProps) => (
    <Theme>
      <ListItem {...innerProps} />
    </Theme>
  );

  beforeEach(() => {
    props = {
      title: 'List Item',
      icon: ICONS.logo,
    };
  });

  it('should match the snapshot', () => {
    const { toJSON } = render(<RederListItem {...props} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('should display the title', () => {
    const { getByText } = render(<RederListItem {...props} />);
    expect(getByText(props.title)).not.toBeNull();
  });

  it('should display the icon', () => {
    const { queryByTestId } = render(<RederListItem {...props} />);
    expect(queryByTestId('LeftIcon')).not.toBeNull();
  });

  it('should not display the icon', () => {
    const { queryByTestId } = render(<RederListItem title={props.title} />);
    expect(queryByTestId('LeftIcon')).toBeNull();
  });
});
