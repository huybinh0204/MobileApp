import { Dynatrace } from '@dynatrace/react-native-plugin';
import React, { useCallback, useMemo } from 'react';
import { getVersion } from 'react-native-device-info';
import { useDispatch, useSelector } from 'react-redux';
import LinkUrlPrefixes from '_components/atoms/Link/LinkUrlPrefixes';
import { NotifyModal } from '_components/molecules';
import { FEATURE_FLAGS } from '_constants';
import { useAppState, useBooleanFeatureFlag, useTreatment } from '_hooks';
import strings from '_localization';
import UpdatesService from '_services/UpdatesService';
import { AppActions } from '_store/app';
import { AuthenticationSelectors } from '_store/authentication';
import { CustomerSelectors } from '_store/customer';
import { openExternalLink } from '_utilities/ExternalLinks';
export { default as RootNavigator } from './RootNavigator';

const RootNavigator = () => {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(AuthenticationSelectors.getIsSignIn);
  const customerExternalId = useSelector(CustomerSelectors.getExternalId);

  const isKillSwitchOn = useBooleanFeatureFlag(FEATURE_FLAGS.APP_KILL_SWITCH);
  const minimumSupportedVersion = useTreatment(FEATURE_FLAGS.MINIMUM_APP_VERSION);

  const currentVersion = useMemo(() => getVersion(), []);

  const shouldForceUpdate =
    minimumSupportedVersion &&
    minimumSupportedVersion !== 'off' &&
    UpdatesService.shouldForceUpdate(minimumSupportedVersion, currentVersion);

  const mailToSupport = async () => {
    const url = `${LinkUrlPrefixes.mail}${strings.kinly_support_email}`;
    await openExternalLink(url);
  };

  const handleForegroundAppState = useCallback(
    (nextAppState) => {
      /**
       * Dispatch an action when app state changes to active
       * This will run the verifySession middleware and logout the user if the session expired
       */
      dispatch(AppActions.appStateChanged(nextAppState));

      if (isLoggedIn && customerExternalId) {
        Dynatrace.identifyUser(customerExternalId);
      }
    },
    [dispatch, isLoggedIn, customerExternalId]
  );

  useAppState({ onForeground: handleForegroundAppState });

  return (
    <>
      <RootNavigator />
      <NotifyModal
        transparent={false}
        title={strings.forcedUpdates.modal.title}
        description={strings.forcedUpdates.modal.description}
        buttonText={strings.forcedUpdates.modal.buttonText}
        onDismiss={UpdatesService.openStore}
        visible={shouldForceUpdate}
      />
      <NotifyModal
        transparent={false}
        title={strings.forceAppKill.modal.title}
        description={strings.formatString(strings.forceAppKill.modal.description, {
          email: strings.kinly_support_email,
        })}
        buttonText={strings.forceAppKill.modal.buttonText}
        onDismiss={mailToSupport}
        visible={isKillSwitchOn}
      />
    </>
  );
};

export default RootNavigator;
