import { Dynatrace } from '@dynatrace/react-native-plugin';
import {
  getActionFromState,
  getPathFromState,
  getStateFromPath,
  StackActions,
} from '@react-navigation/native';
import { createRef } from 'react';
import { cleanPath, getDeepLinkPath, linking } from '_utilities/DeepLinking';
import DynatraceService from './DynatraceService';

export const isReadyRef = createRef();
export const routeNameRef = createRef();
export const navigationRef = createRef();

export function navigate(name, params) {
  if (isReadyRef?.current) {
    navigationRef.current?.navigate(name, params);
  } else {
    console.warn('The App has not mounted and thus "navigate" method can not be used yet');
  }
}

export function handleReady() {
  isReadyRef.current = true;
  routeNameRef.current = navigationRef.current?.getCurrentRoute().name;
  DynatraceService.reportNavigationAction(routeNameRef.current);
}

export function handleStateChange() {
  const previousRouteName = routeNameRef.current;
  const currentRouteName = navigationRef.current?.getCurrentRoute().name;

  if (previousRouteName !== currentRouteName) {
    DynatraceService.reportNavigationAction(currentRouteName);
  }

  routeNameRef.current = currentRouteName;
}

export function resetNavigation() {
  if (isReadyRef.current && navigationRef.current) {
    const index = navigationRef.current?.getRootState()?.index ?? -1;

    if (index > 0) {
      navigationRef.current?.dispatch(StackActions.popToTop());
    }
  }
}

/**
 * @param {string} deepLink
 */
export function checkDeepLinkTarget(deepLink) {
  const deepLinkPath = getDeepLinkPath(deepLink);
  const currentState = navigationRef.current?.getRootState();
  const deepLinkState = getStateFromPath(deepLinkPath, linking.config);

  if (!deepLinkState) {
    Dynatrace.reportError(`Invalid Deep Link: ${deepLink}`, 0);
    return null;
  }

  const currentScreenPath = cleanPath(getPathFromState(currentState));
  const deepLinkScreenPath = cleanPath(getPathFromState(deepLinkState));
  const didDeepLinkLand = currentScreenPath === deepLinkScreenPath;

  if (didDeepLinkLand) {
    return null;
  }

  return {
    path: deepLinkPath,
    action: getActionFromState(deepLinkState),
  };
}

/**
 * @param {string} path
 * @param {object=} config
 */
export function isPathReachable(path, config) {
  const state = getStateFromPath(path, config);
  return state !== undefined;
}
