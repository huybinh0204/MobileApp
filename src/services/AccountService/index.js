import ENV from 'react-native-config';

function AccountService(api) {
  const accounts = ENV.EXPERIENCE_LAYER_URIS_ACCOUNTS;
  const directDeposit = ENV.EXPERIENCE_LAYER_URIS_DIRECT_DEPOSITS;
  const plaid = ENV.EXPERIENCE_LAYER_URIS_PLAID;

  return {
    linkAch(data) {
      if (!data.externalId || !data.accountId || !data.publicToken) {
        throw new Error('account externalId, accountId and publicToken must be set');
      }

      return api.post(`${accounts}/linkAch`, data);
    },
    unlinkAch(externalId, achAccountId) {
      if (!externalId || !achAccountId) {
        throw new Error('account externalId and achAccountId must be set');
      }

      return api.delete(`${accounts}/${externalId}/ach-accounts/${achAccountId}`);
    },
    getLinkedAccounts(externalId) {
      if (!externalId) {
        throw new Error('account externalId must be set');
      }

      return api.get(`${accounts}/${externalId}/accounts`);
    },
    fetchAccountInfo(externalId) {
      if (!externalId) {
        throw new Error('account externalId must be set');
      }

      return api.get(`${accounts}/${externalId}/preview`);
    },
    fetchTransactions(externalId, filters) {
      if (!externalId) {
        throw new Error('account externalId must be set');
      }

      return api.get(`${accounts}/${externalId}/transactions`, { params: filters });
    },
    fetchKinlyDebitCards(externalId) {
      if (!externalId) {
        throw new Error('account externalId must be set');
      }

      return api.get(`${accounts}/${externalId}/cards`);
    },
    addAccountCard(externalId, data) {
      if (!externalId) {
        throw new Error('account externalId must be set');
      }

      return api.post(`${accounts}/${externalId}/linkDebitCard`, data, { timeout: 30000 });
    },
    getAccountLinkedCards(externalId) {
      if (!externalId) {
        throw new Error('account externalId must be set');
      }

      return api.get(`${accounts}/${externalId}/linkedDebitCards`);
    },
    unlinkAccountCard(externalId, cardId) {
      if (!externalId || !cardId) {
        throw new Error('account externalId and cardId must be set');
      }

      return api.put(`${accounts}/${externalId}/linkedDebitCards/${cardId}/unlink`);
    },
    confirmLegalAgreement(externalId, agreements) {
      if (!externalId) {
        throw new Error('account externalId must be set');
      }

      return api.post(`${accounts}/${externalId}/agreement`, { agreements });
    },
    fetchOverdraftStatus(externalId) {
      if (!externalId) {
        throw new Error('account externalId must be set');
      }

      return api.get(`${accounts}/${externalId}/overdraft`);
    },
    setOverdraftProtectionState(externalId, overdraftState) {
      if (!externalId) {
        throw new Error('account externalId must be set');
      }

      return api.put(`${accounts}/${externalId}/overdraft`, { action: overdraftState });
    },
    activateCard(externalId, cardId, cardExpiryDate) {
      if (!externalId || !cardId || !cardExpiryDate) {
        throw new Error('account externalId, cardId and cardExpiryDate must be set');
      }

      return api.post(`${accounts}/${externalId}/cards/${cardId}/activate`, { cardExpiryDate });
    },
    fetchCardPinChangeToken(externalId, cardId) {
      if (!externalId || !cardId) {
        throw new Error('account externalId and cardId must be set');
      }

      return api.get(`${accounts}/${externalId}/cards/${cardId}/pin-change-token`);
    },
    commitCardPinChange(externalId, cardId) {
      if (!externalId || !cardId) {
        throw new Error('account externalId and cardId must be set');
      }

      return api.post(`${accounts}/${externalId}/cards/${cardId}/commit-pin-change`);
    },
    fetchPlaidLinkToken(userId) {
      if (!userId) {
        throw new Error('userId must be set');
      }

      return api.post(`${plaid}/linkToken`, { userId });
    },
    fetchAtomicFiToken(externalId) {
      if (!externalId) {
        throw new Error('account externalId must be set');
      }

      return api.post(`${directDeposit}/public-token`, { accountExternalId: externalId });
    },
  };
}

export default AccountService;
