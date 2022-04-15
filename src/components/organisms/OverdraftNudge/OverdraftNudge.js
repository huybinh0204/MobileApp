import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EVENTS, OverdraftState } from '_constants';
import { AccountSelectors } from '_store/account';
import { RegisterActions } from '_store/register';
import ActiveOverdraftNudge from './ActiveOverdraftNudge';
import InactiveOptedInOverdraftNudge from './InactiveOptedInOverdraftNudge';
import OptedOutOverdraftNudge from './OptedOutOverdraftNudge';

const OverdraftNudge = () => {
  const dispatch = useDispatch();
  const overdraft = useSelector(AccountSelectors.getOverdraft);

  const isEligible = overdraft?.state === OverdraftState.OPT_OUT && overdraft?.eligible;
  const isActive = overdraft?.state === OverdraftState.OPT_IN && overdraft?.eligible;

  useEffect(() => {
    if (overdraft) {
      dispatch(RegisterActions.trackEvent(EVENTS.OVERDRAFT_TEASER_PANEL_OPENED));
    }
  }, [dispatch, overdraft]);

  if (overdraft === null) {
    return null;
  }

  if (isActive) {
    return <ActiveOverdraftNudge limit={overdraft?.limit ?? 0} testID="ActiveOverdraftNudge" />;
  }

  if (isEligible) {
    return <InactiveOptedInOverdraftNudge testID={'InactiveOptedInOverdraftNudge'} />;
  }

  return <OptedOutOverdraftNudge testID="OptedOutOverdraftNudge" />;
};

export default OverdraftNudge;
