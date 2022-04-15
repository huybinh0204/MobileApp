export default {
  email: /^([\w-.]+@([\w-]+\.)+[\w-]{2,})?$/,
  phoneNumber: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?\d{3}[-\s.]?\d{4,6}$/,
  cleanPhoneNumber: /[^\d]/g,
  name: /^[a-zA-Z\s-]+$/,
  signUpPasswordRegex: /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/,
  ssn: /^(?!666|9\\d{2})\\d{3}-\\d{2}-\\d{4}$/,
  onlyLetters: /^[A-Za-z]([^0-9\s]*[A-Za-z])$/,
  onlyDigits: /^\d+$/,
  alphanumeric: /[a-zA-z0-9\s]*/,
  address: /(?=.*[0-9])(?=.*[a-zA-z])(?=.*[ ]).+ .+/,
  states:
    /^(?:(A[KLRZ]|C[AOT]|D[CE]|FL|GA|HI|I[ADLN]|K[SY]|LA|M[ADEINOST]|N[CDEHJMVY]|O[HKR]|P[AR]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY]))$/i,
  zipCode: /(^\d{5}$)|(^\d{5}-\d{4}$)/,
  onlyLettersAndSpaces: /^[a-zA-Z\s]*$/,
  leadingZeros: /^0+/,
  nonDigits: /\D+/g,
};
