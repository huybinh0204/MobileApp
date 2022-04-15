import PropTypes from 'prop-types';
import React from 'react';
import { IconSvg, MainButton } from '_components/atoms';
import { normalize } from '_utilities/screen';
import { BodyText, Container, HeaderBlock, HeaderSection } from './Nudge.styles';

const Nudge = ({ icon, headerComponent, body, buttonText, onButtonPress, testID, alignItems }) => {
  return (
    <Container testID={testID}>
      <HeaderSection alignItems={alignItems}>
        <IconSvg icon={icon} width={normalize(64)} height={normalize(64)} />
        <HeaderBlock>{headerComponent}</HeaderBlock>
      </HeaderSection>
      {typeof body === 'string' ? <BodyText>{body}</BodyText> : body}
      {!!buttonText && (
        <MainButton variant="secondary" onPress={onButtonPress}>
          {buttonText}
        </MainButton>
      )}
    </Container>
  );
};

Nudge.propTypes = {
  icon: PropTypes.string.isRequired,
  headerComponent: PropTypes.element.isRequired,
  body: PropTypes.node,
  testID: PropTypes.string,
  buttonText: PropTypes.string,
  onButtonPress: PropTypes.func,
};

export default Nudge;
