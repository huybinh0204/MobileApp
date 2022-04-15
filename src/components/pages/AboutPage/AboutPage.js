import Clipboard from '@react-native-community/clipboard';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import ENV from 'react-native-config';
import { getBuildNumber, getUniqueId, getVersion } from 'react-native-device-info';
import { IconSvg, Toast } from '_components/atoms';
import { SecondaryScreenLayout } from '_components/organisms';
import { ICONS, TOAST_TYPES } from '_constants';
import strings from '_localization';
import { normalize } from '_utilities/screen';
import { Content, logoStyles, Text } from './AboutPage.styles';

const AboutPage = () => {
  const appVersion = getVersion();
  const buildNumber = getBuildNumber();
  const deviceId = getUniqueId();
  const environment = ENV.BUILD_VARIANT;

  const [toastContent, setToastContent] = useState('');
  const [isToastVisible, setIsToastVisible] = useState(false);

  const copyData = (data) => () => {
    Clipboard.setString(data);
    setIsToastVisible(true);
    setToastContent(`${data} ${strings.about.savedToClipboard}`);
  };

  const closeToast = () => {
    setIsToastVisible(false);
  };

  return (
    <SecondaryScreenLayout testID="AboutPage" title={strings.settings.about}>
      <Content>
        <IconSvg
          icon={ICONS.logoVertical}
          style={logoStyles}
          width={normalize(150)}
          height={normalize(150)}
        />
        <TouchableOpacity accessibilityLabel="Copy app version" onLongPress={copyData(appVersion)}>
          <Text>
            {strings.about.version}: {appVersion}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          accessibilityLabel="Copy build number"
          onLongPress={copyData(buildNumber)}
        >
          <Text>
            {strings.about.build}: {buildNumber}
          </Text>
        </TouchableOpacity>
        {environment !== 'PROD' && (
          <TouchableOpacity accessibilityLabel="Copy device ID" onLongPress={copyData(deviceId)}>
            <Text numberOfLines={1}>
              {strings.about.deviceId}: {deviceId}
            </Text>
          </TouchableOpacity>
        )}
      </Content>
      <Toast
        type={TOAST_TYPES.INFO}
        content={toastContent}
        header={strings.about.copied}
        onClose={closeToast}
        show={isToastVisible}
        testID="aboutToast"
      />
    </SecondaryScreenLayout>
  );
};

export default AboutPage;
