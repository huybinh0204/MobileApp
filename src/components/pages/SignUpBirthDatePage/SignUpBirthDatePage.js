import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { InteractionManager } from 'react-native';
import BottomSheet from 'react-native-raw-bottom-sheet';
import { MainButton } from '_components/atoms';
import Input from '_components/atoms/Input/Input';
import { OnboardingScreenLayout } from '_components/organisms';
import { NAVIGATION } from '_constants';
import strings from '_localization/index';
import { isValidAge, isValidDate } from '_utilities/date';
import { normalize } from '_utilities/screen';
import {
  BirthLegend,
  BirthTitle,
  Container,
  ContinueButton,
  Error,
  InputContainer,
  Link,
  Paragraph,
  ParagraphTitle,
  Row,
  SheetContainer,
  sheetContainerStyles,
} from './SignUpBirthDatePage.styles';

const SignUpBirthDatePage = () => {
  const { params } = useRoute();
  const { navigate } = useNavigation();

  const monthInputRef = useRef(null);
  const dayInputRef = useRef(null);
  const yearInputRef = useRef(null);
  const bottomSheet = useRef(null);

  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [year, setYear] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const interaction = InteractionManager.runAfterInteractions(() => {
      monthInputRef.current.focus();
    });

    return () => {
      interaction.cancel();
    };
  }, []);

  const handleMonthChange = (value) => {
    setMonth(value);
    if (value.length === 2) {
      dayInputRef.current.focus();
    }
  };

  const handleDayChange = (value) => {
    setDay(value);
    if (value.length === 2) {
      yearInputRef.current.focus();
    }
  };

  const handleDelete = ({ nativeEvent: { key } }) => {
    if (key === 'Backspace') {
      if (dayInputRef.current.isFocused() && day.length === 0) {
        monthInputRef.current.focus();
      }
      if (yearInputRef.current.isFocused() && year.length === 0) {
        dayInputRef.current.focus();
      }
    }
  };

  const handleSubmit = () => {
    const birthDate = `${month}/${day}/${year}`;

    if (isValidDate(birthDate)) {
      if (isValidAge(birthDate)) {
        setError(null);
        navigate(NAVIGATION.auth.signUpAddressSuggestion, { ...params, dateOfBirth: birthDate });
      } else {
        setError(strings.signUp.bDayError);
      }
    } else {
      setError(strings.signUp.invalidBirthDate);
    }
  };

  const showBottomSheet = () => {
    bottomSheet.current?.open();
  };

  const hideBottomSheet = () => {
    bottomSheet.current?.close();
  };

  return (
    <OnboardingScreenLayout step={7} testID="SignUpBirthDatePage">
      <Container>
        <BirthTitle>{strings.signUp.birth.title}</BirthTitle>
        <BirthLegend>
          {strings.signUp.birth.legend}
          <Link onPress={showBottomSheet}>{strings.signUp.birth.disclosureLink}</Link>
        </BirthLegend>
        <Row>
          <InputContainer flex={1} marginRight>
            <Input
              keyboardType="number-pad"
              maxLength={2}
              placeholder="MM"
              onChangeText={handleMonthChange}
              value={month}
              ref={monthInputRef}
              testID="signUpBirthMonth"
            />
          </InputContainer>
          <InputContainer flex={1} marginRight>
            <Input
              keyboardType="number-pad"
              maxLength={2}
              placeholder="DD"
              onChangeText={handleDayChange}
              onKeyPress={handleDelete}
              value={day}
              ref={dayInputRef}
              testID="signUpBirthDay"
            />
          </InputContainer>
          <InputContainer flex={2}>
            <Input
              keyboardType="number-pad"
              maxLength={4}
              placeholder="YYYY"
              onChangeText={setYear}
              onKeyPress={handleDelete}
              value={year}
              ref={yearInputRef}
              testID="signUpBirthYear"
            />
          </InputContainer>
        </Row>
        <Error>{error}</Error>
        <ContinueButton
          disabled={month.length < 2 || day.length < 2 || year.length < 4}
          onPress={handleSubmit}
          testID="signUpBirthDateSubmitButton"
        >
          {strings.signUp.continue}
        </ContinueButton>
      </Container>
      <BottomSheet
        ref={bottomSheet}
        height={normalize(470)}
        customStyles={{ container: sheetContainerStyles }}
      >
        <SheetContainer>
          <Paragraph>{strings.signUp.birth.bottomSheet.paragraphOne}</Paragraph>
          <ParagraphTitle>{strings.signUp.birth.bottomSheet.paragraphTwoTitle}</ParagraphTitle>
          <Paragraph>{strings.signUp.birth.bottomSheet.paragraphTwo}</Paragraph>
          <MainButton onPress={hideBottomSheet}>
            {strings.signUp.birth.bottomSheet.buttonText}
          </MainButton>
        </SheetContainer>
      </BottomSheet>
    </OnboardingScreenLayout>
  );
};

export default SignUpBirthDatePage;
