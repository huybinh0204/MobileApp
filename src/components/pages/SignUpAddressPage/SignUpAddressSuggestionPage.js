import { useTheme } from '@emotion/react';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { FlatList, LayoutAnimation } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Toast } from '_components/atoms';
import Input from '_components/atoms/Input/Input';
import { OnboardingScreenLayout } from '_components/organisms';
import { NAVIGATION, TOAST_TYPES } from '_constants';
import strings from '_localization/index';
import { CustomerActions, CustomerSelectors } from '_store/customer';
import {
  AddressItem,
  addressItemStyles,
  AddressLegend,
  AddressTitle,
  Container,
  LoadingIndicator,
  LoadingIndicatorContainer,
  Separator,
} from './SignUpAddressPage.styles';

const SignUpAddressSuggestionPage = () => {
  const { params } = useRoute();
  const { navigate } = useNavigation();
  const dispatch = useDispatch();
  const suggestedAddresses = useSelector(CustomerSelectors.getSuggestedAddresses);
  const suggestedAddressesError = useSelector(CustomerSelectors.getSuggestedAddressesError);
  const theme = useTheme();
  const isLoading = useSelector(CustomerSelectors.getIsLoading);

  const [isContentVisible, setIsContentVisible] = useState(true);
  const [searchAddress, setSearchAddress] = useState('');

  const hideContent = () => {
    LayoutAnimation.easeInEaseOut();
    setIsContentVisible(false);
  };

  const onSuggestedAddressPressed = ({ addressLine1, city, state, zipCode }) => {
    navigate(NAVIGATION.auth.signUpAddress, { ...params, addressLine1, city, state, zipCode });
    setIsContentVisible(true);
  };

  const onAddressChange = (text) => {
    setSearchAddress(text);
    dispatch(CustomerActions.getSuggestedAddresses(text));
  };

  const handleCloseToast = () => {
    dispatch(CustomerActions.setSuggestedAddressesError(null));
  };

  const parseTitle = ({ addressLine1, city, state, zipCode }) => {
    let title = addressLine1;

    if (city !== '') {
      title = `${addressLine1}, ${city}, ${state}, ${zipCode}`;
    }

    return title;
  };

  return (
    <OnboardingScreenLayout step={8} testID="SignUpAddressSuggestionPage">
      <Container>
        {isContentVisible && (
          <>
            <AddressTitle>{strings.signUp.address.title}</AddressTitle>
            <AddressLegend>{strings.signUp.address.legend}</AddressLegend>
          </>
        )}
        <Input
          onChangeText={onAddressChange}
          placeholder={strings.signUp.address.line1PlaceHolder}
          testID="address"
          value={searchAddress}
          onFocus={hideContent}
        />
        {isLoading ? (
          <LoadingIndicatorContainer>
            <LoadingIndicator color={theme.colors.alpha500} size="small" />
          </LoadingIndicatorContainer>
        ) : (
          <FlatList
            data={suggestedAddresses}
            ItemSeparatorComponent={() => <Separator />}
            keyExtractor={(item, index) => item.addressLine1 + index}
            renderItem={({ item }) => (
              <AddressItem
                title={parseTitle(item)}
                onPress={() => onSuggestedAddressPressed(item)}
                titleStyles={addressItemStyles(theme)}
                testID={parseTitle(item)}
              />
            )}
          />
        )}
      </Container>
      <Toast
        type={TOAST_TYPES.ERROR}
        header={suggestedAddressesError?.title}
        onClose={handleCloseToast}
        show={suggestedAddressesError !== null}
        testID="suggestedAddressesErrorToast"
      />
    </OnboardingScreenLayout>
  );
};

export default SignUpAddressSuggestionPage;
