import PropTypes from 'prop-types';
import React from 'react';
import BaseText from '_components/atoms/BaseText/BaseText';
import { LINK_TYPES } from '_constants';
import { openExternalLink } from '_utilities/ExternalLinks';
import LINK_URL_PREFIXES from './LinkUrlPrefixes';

const Link = ({ type, href, children, wrapperComponent, ...wrapperProps }) => {
  const Wrapper = wrapperComponent ?? BaseText;

  const onLinkPress = async () => {
    const link = `${LINK_URL_PREFIXES[type]}${href}`;
    await openExternalLink(link);
  };

  return (
    <Wrapper onPress={onLinkPress} {...wrapperProps}>
      {children}
    </Wrapper>
  );
};

Link.defaultProps = {
  type: LINK_TYPES.WEB,
  wrapperComponent: null,
  wrapperProps: null,
};

Link.propTypes = {
  type: PropTypes.oneOf(Object.values(LINK_TYPES)),
  href: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  wrapperProps: PropTypes.object,
};

export default Link;
