export const getPlaidValues = ({ metadata, publicToken }) => {
  const account = metadata.accounts[0];

  return {
    account,
    accountId: account.id,
    publicToken,
  };
};
