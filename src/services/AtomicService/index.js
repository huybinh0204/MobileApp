import { Atomic, Environment, Product } from '@atomicfi/transact-react-native';
import ENV from 'react-native-config';

export default class AtomicService {
  static transact({ token, brandColor, onInteraction, onFinish, onClose }) {
    Atomic.transact({
      onInteraction,
      onFinish,
      onClose,
      config: {
        product: Product.DEPOSIT,
        publicToken: token,
        theme: {
          brandColor,
        },
      },
      environment: ENV.BUILD_VARIANT === 'PROD' ? Environment.Production : Environment.Sandbox,
    });
  }
}
