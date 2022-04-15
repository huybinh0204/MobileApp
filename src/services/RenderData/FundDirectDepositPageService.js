import ENV from 'react-native-config';

function FundDirectDepositPageService() {
  const accounts = ENV.EXPERIENCE_LAYER_URIS_ACCOUNTS;
  const fundDirectDeposit = ENV.EXPERIENCE_LAYER_URIS_PAGES;

  return (api) => ({
    getRenderData(externalId) {
      if (!externalId) {
        throw new Error('externalId must be set');
      }

      return api.get(`${fundDirectDeposit}/fundDirectDeposit/renderData`, {
        headers: {
          externalId,
        },
      });
    },
    // TO-DO: Move this to the AccountService
    submitDirectDepositForm(externalId) {
      if (!externalId) {
        throw new Error('externalId must be set');
      }

      return api.get(`${accounts}/${externalId}/directDepositForm`);
    },
  });
}

export default FundDirectDepositPageService();
