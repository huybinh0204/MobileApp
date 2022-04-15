import React from 'react';
import { WebView } from 'react-native-webview';
import { SecondaryHeader } from '_components/organisms';
import { COLORS } from '_constants';
import strings from '_localization/index';
import { ActivityIndicator, Container } from './PolicyTermsDetailPage.styles';

const PolicyTermsDetailPage = ({ url }) => {
  return (
    <Container testID="PolicyTermsDetailPage">
      <SecondaryHeader title={strings.settings.policyTerms.legalDocument} />
      <WebView
        overScrollMode="always"
        renderLoading={() => <ActivityIndicator color={COLORS.alpha500} size="large" />}
        source={{ uri: url }}
        startInLoadingState={true}
      />
    </Container>
  );
};

export default PolicyTermsDetailPage;
