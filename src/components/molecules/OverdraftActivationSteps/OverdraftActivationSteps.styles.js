import styled, { css } from '@emotion/native';
import { BaseText } from '_components/atoms';
import { normalize } from '_utilities/screen';

export const Step = styled.View({
  flexDirection: 'row',
  width: '90%',
});

export const StepBadge = styled.View(({ theme, isComplete = false, isVariantScreen }) => ({
  minWidth: isVariantScreen ? normalize(22) : normalize(16),
  height: isVariantScreen ? normalize(22) : normalize(16),
  borderRadius: 50,
  borderWidth: 1,
  justifyContent: 'center',
  alignItems: 'center',
  borderColor: theme.colors.alpha500,
  backgroundColor: isComplete ? theme.colors.alpha500 : theme.colors.background,
}));

export const StepNumber = styled(BaseText)(({ theme, isComplete }) => ({
  ...theme.typography.legal,
  color: isComplete ? theme.colors.background : theme.colors.alpha500,
}));

export const dashStyles = (isVariantScreen) =>
  css({
    width: 1,
    height: 30,
    position: 'absolute',
    top: isVariantScreen ? normalize(22) : normalize(16),
    flexDirection: 'column',
    alignSelf: 'center',
  });

export const StepDescription = styled(BaseText)(({ theme, isBold = false, isVariantScreen }) => {
  const stepDescriptionTypography = isVariantScreen
    ? {
        regular: theme.typography.subContentRegular,
        bold: theme.typography.subContentSemiBold,
      }
    : {
        regular: theme.typography.tinyContentRegular,
        bold: theme.typography.tinyContentBold,
      };
  const style = {
    color: theme.colors.beta500,
    marginBottom: theme.spacing.s,
    marginLeft: theme.spacing.xs,
  };

  return isBold
    ? { ...stepDescriptionTypography.bold, ...style }
    : { ...stepDescriptionTypography.regular, ...style };
});
