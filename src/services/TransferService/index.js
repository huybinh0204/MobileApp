import ENV from 'react-native-config';

function TransferService() {
  const ACCOUNTS = ENV.EXPERIENCE_LAYER_URIS_ACCOUNTS;

  return (api) => ({
    achIn({ achAccountId, amount, externalId }) {
      if (!achAccountId || !amount || !externalId) {
        throw new Error('achAccountId, amount and externalId must be set');
      }

      const body = { achAccountId, amount };
      const config = { timeout: 32000 };
      const url = `${ACCOUNTS}/${externalId}/fund`;

      return api.post(url, body, config);
    },
    achOut({ achAccountId, amount, externalId }) {
      if (!achAccountId || !amount || !externalId) {
        throw new Error('achAccountId, amount and externalId must be set');
      }

      const body = { achAccountId, amount };
      const config = { timeout: 32000 };
      const url = `${ACCOUNTS}/${externalId}/ach-credit-transaction`;

      return api.post(url, body, config);
    },
    instantOut({ amount, cardId, externalId }) {
      if (!amount || !cardId || !externalId) {
        throw new Error('amount, cardId and externalId must be set');
      }

      const body = { amount };
      const config = { timeout: 35000 };
      const url = `${ACCOUNTS}/${externalId}/linkedDebitCards/${cardId}/fund`;

      return api.post(url, body, config);
    },
  });
}

export default TransferService();
