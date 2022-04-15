import { Dimensions, PixelRatio, useWindowDimensions } from 'react-native';
import { isTablet } from 'react-native-device-info';

const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

/**
 * Based on iPhone 11 and iPad 9.7 Retina scales
 * @param {number} value
 */
export function normalize(value) {
  const ratio = isTablet() ? 768 : 414;
  const scale = screenWidth / ratio;

  return PixelRatio.roundToNearestPixel(value * scale);
}

/**
 * @param {number} percentage
 */
export function heightPercentageToDP(percentage) {
  if (percentage < 0 || percentage > 100) {
    throw new Error('The value must be an integer between 0 and 100');
  }

  return PixelRatio.roundToNearestPixel(screenHeight * (percentage / 100));
}

/**
 * @param {number} percentage
 */
export function useHeightPercentageToDP(percentage) {
  const { height } = useWindowDimensions();

  if (percentage < 0 || percentage > 100) {
    throw new Error('The value must be an integer between 0 and 100');
  }

  return PixelRatio.roundToNearestPixel(height * (percentage / 100));
}

/**
 * @param {number} percentage
 */
export function widthPercentageToDP(percentage) {
  if (percentage < 0 || percentage > 100) {
    throw new Error('The value must be an integer between 0 and 100');
  }

  return PixelRatio.roundToNearestPixel(screenWidth * (percentage / 100));
}

/**
 * @param {number} percentage
 */
export function useWidthPercentageToDP(percentage) {
  const { width } = useWindowDimensions();

  if (percentage < 0 || percentage > 100) {
    throw new Error('The value must be an integer between 0 and 100');
  }

  return PixelRatio.roundToNearestPixel(width * (percentage / 100));
}
