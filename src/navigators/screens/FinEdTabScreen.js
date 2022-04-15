import React from 'react';
import { FinEdTabPage } from '_components/pages';

const FinEdTabScreen = () => {
  // const dispatch = useDispatch();

  // const trackNavigation = useCallback(() => {
  //   dispatch(RegisterActions.trackEvent(EVENTS.CARD_TAB_OPENED));
  // }, [dispatch]);

  // useFocusEffect(trackNavigation);

  return <FinEdTabPage testID="FinEdTabScreen" />;
};

export default FinEdTabScreen;
