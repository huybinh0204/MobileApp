import { useTheme } from '@emotion/react';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { IconSvg, Toast } from '_components/atoms';
import { SecondaryScreenLayout } from '_components/organisms';
import { FEATURE_FLAGS, ICONS, NAVIGATION, TOAST_TYPES } from '_constants';
import { useBooleanFeatureFlag } from '_hooks';
import strings from '_localization';
import { CustomerActions, CustomerSelectors } from '_store/customer';
import { formatPhoneNumber } from '_utilities/Account';
import { Content, EditButton, ItemContainer, LoadingContainer, Text } from './UserInfo.styles';

const UserInfoPage = () => {
  const dispatch = useDispatch();
  const { navigate } = useNavigation();
  const { colors, spacing } = useTheme();

  const customer = useSelector(CustomerSelectors.getCustomer);
  const customerExternalId = useSelector(CustomerSelectors.getExternalId);
  const updateAddressSuccess = useSelector(CustomerSelectors.getUpdateAddressSuccess);
  const updateEmailSuccess = useSelector(CustomerSelectors.getUpdateEmailSuccess);
  const updatePhoneSuccess = useSelector(CustomerSelectors.getConfirmPhoneVerificationSuccess);

  const isChangeEmailEnabled = useBooleanFeatureFlag(
    FEATURE_FLAGS.CHANGE_EMAIL,
    customerExternalId
  );

  const isChangePhoneEnabled = useBooleanFeatureFlag(
    FEATURE_FLAGS.CHANGE_PHONE,
    customerExternalId
  );

  const address = {
    addressLine1: customer?.addressLine1,
    addressLine2: customer?.addressLine2,
    city: customer?.city,
    state: customer?.state,
    zipCode: customer?.zipCode,
  };

  const onPressEditAddress = () => {
    navigate(NAVIGATION.settings.updateAddress, { ...address });
  };

  const onPressEditEmail = () => {
    navigate(NAVIGATION.settings.updateEmail, { email: customer.email });
  };

  const onPressEditPhoneNumber = () => {
    navigate(NAVIGATION.shared.phoneNumber, { edit: true, target: NAVIGATION.settings.userInfo });
  };

  return (
    <SecondaryScreenLayout testID="UserInfoPage" title={strings.settings.user_info}>
      {!customer ? (
        <LoadingContainer>
          <ActivityIndicator color={colors.black} size="large" />
        </LoadingContainer>
      ) : (
        <Content>
          <ItemContainer>
            <IconSvg icon={ICONS.userCircled} width={spacing.m} height={spacing.m} />
            <Text numberOfLines={1}>{`${customer.firstName} ${customer.lastName}`}</Text>
          </ItemContainer>
          <ItemContainer>
            <IconSvg icon={ICONS.contactSetting} width={spacing.m} height={spacing.m} />
            <Text numberOfLines={1}>{customer.email}</Text>
            {isChangeEmailEnabled && (
              <EditButton onPress={onPressEditEmail} testID="editEmailButton">
                <IconSvg icon={ICONS.editIcon} width={spacing.m} height={spacing.m} />
              </EditButton>
            )}
          </ItemContainer>
          <ItemContainer>
            <IconSvg icon={ICONS.phoneCircled} width={spacing.m} height={spacing.m} />
            <Text numberOfLines={1}>{formatPhoneNumber(customer.phoneNumber)}</Text>
            {isChangePhoneEnabled && (
              <EditButton onPress={onPressEditPhoneNumber} testID="editPhoneNumberButton">
                <IconSvg icon={ICONS.editIcon} width={spacing.m} height={spacing.m} />
              </EditButton>
            )}
          </ItemContainer>
          <ItemContainer separator={false}>
            <IconSvg icon={ICONS.homeCircled} width={spacing.m} height={spacing.m} />
            <Text numberOfLines={2}>
              {`${address.addressLine1}, ${address.addressLine2}\n${address.city}, ${address.state} ${address.zipCode}`}
            </Text>
            <EditButton onPress={onPressEditAddress} testID="editAddressButton">
              <IconSvg icon={ICONS.editIcon} width={spacing.m} height={spacing.m} />
            </EditButton>
          </ItemContainer>
        </Content>
      )}
      <Toast
        type={TOAST_TYPES.SUCCESS}
        header={strings.updateAddress.success.title}
        onClose={() => dispatch(CustomerActions.setUpdateAddressSuccess(false))}
        show={updateAddressSuccess}
        testID="UpdateAddresssSuccessToast"
      />
      <Toast
        type={TOAST_TYPES.SUCCESS}
        header={strings.updateEmail.success.title}
        onClose={() => dispatch(CustomerActions.setUpdateEmailSuccess(false))}
        show={updateEmailSuccess}
        testID="UpdateEmailSuccessToast"
      />
      <Toast
        type={TOAST_TYPES.SUCCESS}
        header={strings.updatePhoneNumber.success.title}
        onClose={() => dispatch(CustomerActions.setConfirmPhoneVerificationSuccess(false))}
        show={updatePhoneSuccess}
        testID="UpdatePhoneNumberSuccessToast"
      />
    </SecondaryScreenLayout>
  );
};

export default UserInfoPage;
