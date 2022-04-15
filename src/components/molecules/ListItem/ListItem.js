import PropTypes from 'prop-types';
import React from 'react';
import { IconSvg } from '_components/atoms';
import { COLORS } from '_constants';
import { normalize } from '_utilities/screen';
import { Container, Icon, LeftContainer, SubTitle, TextContainer, Title } from './ListItem.styles';

const ListItem = ({ children, color, icon, title, subtitle }) => {
  return (
    <Container>
      <LeftContainer>
        {icon && (
          <Icon testID="LeftIcon">
            <IconSvg width={normalize(30)} height={normalize(30)} icon={icon} />
          </Icon>
        )}
        <TextContainer>
          <Title color={color} numberOfLines={1}>
            {title}
          </Title>
          {subtitle && (
            <SubTitle color={color} numberOfLines={2}>
              {subtitle}
            </SubTitle>
          )}
        </TextContainer>
      </LeftContainer>
      {children}
    </Container>
  );
};

ListItem.defaultProps = {
  children: null,
  color: COLORS.alpha500,
  icon: null,
  subtitle: null,
};

ListItem.propTypes = {
  children: PropTypes.node,
  color: PropTypes.string,
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
};

export default ListItem;
