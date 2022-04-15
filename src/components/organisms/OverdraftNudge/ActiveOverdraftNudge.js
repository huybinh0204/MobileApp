import React from 'react';
import ENV from 'react-native-config';
import { Badge, Link } from '_components/atoms';
import { Nudge } from '_components/molecules';
import { ICONS } from '_constants';
import strings from '_localization/index';
import { formatCurrency } from '_utilities/currency';
import {
  Body,
  BoldText,
  HeaderRow,
  Status,
  TermsLink,
  TinyText,
} from './ActiveOverdraftNudge.styles';

const ActiveOverdraftNudge = ({ limit, testID }) => {
  const body = (
    <Body>
      {strings.formatString(strings.overdraft.nudge.active.statusOnBody, {
        termsLink: (
          <Link href={ENV.OVERDRAFT_LEGAL_AGREEMENT_URL} wrapperComponent={TermsLink}>
            {strings.overdraft.nudge.active.termsLinkText}
          </Link>
        ),
      })}
    </Body>
  );

  const Header = (
    <>
      <HeaderRow>
        <BoldText>{strings.overdraft.nudge.active.title}</BoldText>
        <BoldText>{formatCurrency(limit)}</BoldText>
      </HeaderRow>
      <HeaderRow>
        <Status>
          <Badge />
          <TinyText>{strings.overdraft.nudge.active.statusOn}</TinyText>
        </Status>
        <TinyText>{strings.overdraft.nudge.active.limit}</TinyText>
      </HeaderRow>
    </>
  );

  return (
    <Nudge icon={ICONS.overdraftProtection} headerComponent={Header} testID={testID} body={body} />
  );
};

export default ActiveOverdraftNudge;
