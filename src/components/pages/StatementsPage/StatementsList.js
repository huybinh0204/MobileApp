import PropTypes from 'prop-types';
import React from 'react';
import EmptyStatements from './EmptyStatements';
import StatementListItem from './StatementListItem';
import { Separator, StatementsFlatList } from './StatementsPage.styles';

const StatementsList = ({ statements }) => {
  if (statements.length === 0) {
    return <EmptyStatements />;
  }

  return (
    <StatementsFlatList
      ItemSeparatorComponent={Separator}
      data={statements}
      renderItem={({ item }) => <StatementListItem {...item} />}
      keyExtractor={(item) => item.date}
    />
  );
};

StatementsList.propTypes = {
  statements: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default StatementsList;
