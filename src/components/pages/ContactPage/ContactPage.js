import React from 'react';
import { View } from 'react-native';
import { IconSvg, Link } from '_components/atoms';
import { SecondaryScreenLayout } from '_components/organisms';
import { ICONS, LINK_TYPES } from '_constants';
import strings from '_localization';
import { normalize } from '_utilities/screen';
import {
  BottomContainer,
  ContactButton,
  Content,
  LinkText,
  MainTitle,
  Note,
  RegularText,
  SupportContainer,
  SupportTitle,
} from './ContactPage.styles';

const ContactPage = () => {
  return (
    <SecondaryScreenLayout testID="ContactPage" title={strings.settings.contact}>
      <Content>
        <IconSvg icon={ICONS.contact} width={normalize(270)} height={normalize(270)} />
        <MainTitle>{strings.contact.main_title}</MainTitle>
        <SupportContainer>
          <RegularText>
            {strings.contact.contactSupport}
            <Link href={strings.contact.email} type={LINK_TYPES.MAIL} wrapperComponent={LinkText}>
              {strings.contact.email}
            </Link>
            {strings.contact.forAssistance}
          </RegularText>
        </SupportContainer>
        <View>
          <SupportTitle>{strings.contact.supportTitle}</SupportTitle>
          <RegularText>{strings.contact.supportSchedule}</RegularText>
        </View>
        <BottomContainer>
          <Note>{strings.contact.supportAvailability}</Note>
          <Link
            accessibilityLabel="ContactButton"
            href={strings.kinly_support_number}
            type={LINK_TYPES.PHONE}
            wrapperComponent={ContactButton}
          >
            {strings.contact.button}
          </Link>
        </BottomContainer>
      </Content>
    </SecondaryScreenLayout>
  );
};

export default ContactPage;
