import { fireEvent, render, waitFor } from '@testing-library/react-native';
import React from 'react';
import { Linking } from 'react-native';
import { LINK_TYPES } from '_constants';
import Theme from '_utilities/Theme';
import Link from './Link';
import LINK_URL_PREFIXES from './LinkUrlPrefixes';

const TEST_LINK_MAP = {
  WEB: {
    props: {
      type: LINK_TYPES.WEB,
      href: 'lendup.com',
      children: 'my-web-address',
    },
    urlPrefix: LINK_URL_PREFIXES.web,
  },
  SMS: {
    props: {
      type: LINK_TYPES.SMS,
      href: '1-855-253-6387',
      children: 'my-mobile-number',
    },
    urlPrefix: LINK_URL_PREFIXES.sms,
  },
  PHONE: {
    props: {
      type: LINK_TYPES.PHONE,
      href: '1-855-253-6387',
      children: 'my-phone-number',
    },
    urlPrefix: LINK_URL_PREFIXES.phone,
  },
  MAIL: {
    props: {
      type: LINK_TYPES.MAIL,
      href: 'someaddress@lendup.com',
      children: 'my-email-address',
    },
    urlPrefix: LINK_URL_PREFIXES.mail,
  },
};

describe('Link', () => {
  it('should test all link types', () => {
    expect(Object.keys(TEST_LINK_MAP).sort()).toEqual(Object.keys(LINK_TYPES).sort());
  });

  it('should match the snapshot', () => {
    const { toJSON } = render(
      <Theme>
        <Link {...TEST_LINK_MAP.PHONE.props} />
      </Theme>
    );
    expect(toJSON()).toMatchSnapshot();
  });

  let testLinkType = (link) => {
    it(`should call canOpenURL when pressed for ${link.props.type}`, async () => {
      jest.spyOn(Linking, 'canOpenURL');
      jest.spyOn(Linking, 'openURL');

      const { getByText } = render(
        <Theme>
          <Link {...link.props} />
        </Theme>
      );

      const LinkButton = getByText(link.props.children);

      const expectedLinkUrl = `${link.urlPrefix}${link.props.href}`;

      fireEvent.press(LinkButton);

      await waitFor(() => {
        expect(Linking.canOpenURL).toHaveBeenCalledWith(expectedLinkUrl);
        expect(Linking.openURL).toHaveBeenCalledWith(expectedLinkUrl);
      });
    });
  };

  for (const name in TEST_LINK_MAP) {
    testLinkType(TEST_LINK_MAP[name]);
  }
});
