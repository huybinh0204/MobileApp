import { useNavigation } from '@react-navigation/native';
import React from 'react';
import PropTypes from 'prop-types';
import { Nudge } from '_components/molecules';
import { NAVIGATION } from '_constants';
import strings from '_localization/index';
import { Container, HeaderDescription, HeaderTitle } from './MarketplaceItem.styles';

const MarketplaceItem = ({ data }) => {
  const { navigate } = useNavigation();

  const navigateToCardActivation = () => {
    navigate(NAVIGATION.marketplace.directPartner, {
      ...data,
    });
  };

  const Header = (
    <>
      <HeaderTitle>{data.name}</HeaderTitle>
      <HeaderDescription>{data.shortDescription}</HeaderDescription>
    </>
  );

  return (
    <Container>
      <Nudge
        icon={data.icon}
        headerComponent={Header}
        buttonText={strings.settings.getStarted}
        onButtonPress={navigateToCardActivation}
        alignItems={'flex-start'}
      />
    </Container>
  );
};

MarketplaceItem.propTypes = {
  data: PropTypes.object.isRequired,
};

export default MarketplaceItem;
