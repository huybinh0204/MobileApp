import PropTypes from 'prop-types';
import React from 'react';
import { ListContainer, ListTitle } from './ListCard.styles';

const ListCard = ({ children, title, ...props }) => (
  <ListContainer {...props}>
    <ListTitle>{title}</ListTitle>
    {children}
  </ListContainer>
);

ListCard.defaultProps = {
  children: null,
};

ListCard.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string.isRequired,
};

export default ListCard;
