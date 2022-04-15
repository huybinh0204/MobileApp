import ENV from 'react-native-config';
import { encode } from 'base-64';

export default function CustomerService(api) {
  const customersURI = ENV.EXPERIENCE_LAYER_URIS_CUSTOMERS;
  const lobURL = ENV.LOB_API_URL;
  const PHONE_VERIFICATION_CHANNEL = 'SMS';

  return {
    fetchCustomer(externalId) {
      if (!externalId) {
        throw new Error('customer externalId must be set');
      }

      return api.get(`${customersURI}/${externalId}`);
    },
    updateAddress(externalId, address) {
      if (!externalId || !address) {
        throw new Error('customer externalId and address must be set');
      }

      return api.post(`${customersURI}/${externalId}/address`, address);
    },
    updateEmail(externalId, email) {
      if (!externalId || !email) {
        throw new Error('customer externalId and email must be set');
      }

      return api.post(`${customersURI}/${externalId}/email`, {
        email,
      });
    },
    startPhoneVerification(externalId, phoneNumber) {
      if (!phoneNumber || !externalId) {
        throw new Error('phoneNumber and externalId must be set');
      }

      return api.post(`${customersURI}/${externalId}/verification/start`, {
        id: phoneNumber,
        channel: PHONE_VERIFICATION_CHANNEL,
      });
    },
    confirmPhoneVerification(code, externalId, phoneNumber) {
      if (!phoneNumber || !code || !externalId) {
        throw new Error('phoneNumber, externalId and code must be set');
      }

      return api.post(`${customersURI}/${externalId}/verification/check`, {
        code,
        id: phoneNumber,
        channel: PHONE_VERIFICATION_CHANNEL,
      });
    },
    checkVerificationStatus(externalId, field) {
      if (!externalId || !field) {
        throw new Error('customer externalId and field must be set');
      }

      return api.get(`${customersURI}/${externalId}/verification/${field}`);
    },
    getSuggestedAddresses(address) {
      if (!address) {
        throw new Error('address must be set');
      }

      const lobUserAndPassword = ENV.LOB_PUBLISHABLE_API_KEY + ':';
      return api.post(
        `${lobURL}/us_autocompletions`,
        {
          address_prefix: address,
        },
        {
          headers: {
            Authorization: `Basic ${encode(lobUserAndPassword)}`,
          },
        }
      );
    },
  };
}
