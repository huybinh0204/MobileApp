import { useTheme } from '@emotion/react';
import PropTypes from 'prop-types';
import React from 'react';
import { Dash } from '_components/atoms';
import strings from '_localization';
import {
  dashStyles,
  Step,
  StepBadge,
  StepDescription,
  StepNumber,
} from './OverdraftActivationSteps.styles';

export const OverdraftActivationSteps = ({ isOverdraftOptedIn, isOverdraftActive, variant }) => {
  const { colors } = useTheme();
  const isVariantScreen = variant === 'screen';
  const isStepTwoActive = isOverdraftOptedIn && !isOverdraftActive;

  return (
    <>
      <Step>
        <StepBadge isComplete={isOverdraftOptedIn} isVariantScreen={isVariantScreen}>
          <StepNumber isComplete={isOverdraftOptedIn}>
            {strings.overdraft.sell.steps.firstStepNumber}
          </StepNumber>
          <Dash dashGap={3} dashColor={colors.beta100} style={dashStyles(isVariantScreen)} />
        </StepBadge>
        <StepDescription isVariantScreen={isVariantScreen} isBold={!isStepTwoActive}>
          {strings.overdraft.sell.steps.firstStep}
        </StepDescription>
      </Step>
      <Step>
        <StepBadge isComplete={isOverdraftActive} isVariantScreen={isVariantScreen}>
          <StepNumber isComplete={isOverdraftActive}>
            {strings.overdraft.sell.steps.secondStepNumber}
          </StepNumber>
        </StepBadge>
        <StepDescription isBold={isStepTwoActive} isVariantScreen={isVariantScreen}>
          {strings.overdraft.sell.steps.secondStep}
        </StepDescription>
      </Step>
    </>
  );
};

OverdraftActivationSteps.propTypes = {
  isOverdraftOptedIn: PropTypes.bool.isRequired,
  isOverdraftActive: PropTypes.bool.isRequired,
  variant: PropTypes.oneOf(['nudge', 'screen']).isRequired,
};

export default OverdraftActivationSteps;
