export default {
  ahead: 'AHEAD',
  loading: 'Loading',
  connectionError: 'Connection error',
  currencySymbol: '$',

  generalCallToActionButtonText: 'Continue',

  default_empty_list_message: 'There are no items to display',

  kinly_support_number: '1-888-795-4659',
  kinly_support_email: 'support@bekinly.com',
  ahead_faq_page: 'https://aheadmoney.zendesk.com/hc/en-us', // TO-DO: update this

  welcome: {
    signInButtonLabel: 'Sign In',
    signUpButtonLabel: 'Get Started',
    carousel: {
      bankAccount: {
        title: 'Get ahead \nwith your money',
        legals:
          'Kinly is not a bank, and banking services are \nprovided by The Bancorp Bank, Member FDIC.',
      },
      getPaidEarly: {
        title: 'Get paid earlier',
        description: 'Connect your direct deposit and receive \nyour money up to 2 days {earlier}',
        earlier: 'earlier*',
        legals: '*Additional terms apply. See ',
        legalsLink: 'Direct Deposit terms.',
        infoSheetButton: 'I understand',
        infoSheetTitle: 'Early Direct Deposit',
        infoSheetContent:
          'Early access to direct deposit funds depends on the timing of the submission of the payment file from the payer. We generally make these funds available on the day the payment file is received, which may be up to 2 days earlier than the scheduled payment date.',
      },
      noOverDraftFee: {
        title: 'No Overdraft Fees',
        description: 'Get up to $100 in overdraft protection \nto stay ahead in life.*',
        legals: '*Eligibility requirements and limits apply. ',
        legalsLink: 'Learn more.',
        infoSheetButton: 'I understand',
        infoSheetTitle: 'Overdraft Protection',
        infoSheetContent:
          'Overdraft is available after qualifying direct deposits of $1,000 or more into the Kinly Account. For eligible members who are enrolled in the Overdraft Service, the bank will approve purchases that result in a negative balance on the Kinly Account up to $100. Not all purchases are eligible. Eligibility conditions apply for the Overdraft Service.',
        infoSheetTermsAndConditions: 'See Kinly Overdraft Terms and Conditions.',
      },
    },
  },

  submit: 'Submit',

  signUp: {
    // Disclaimer
    disclaimer: 'By proceeding, you agree to the ',
    disclaimerLink: 'Ahead Privacy Policy',
    disclaimerUrl: 'https://www.aheadmoney.com/mobileviews/m-privacy-policy', // TO-DO: update this
    // Mail
    email: {
      title: 'What’s your email?',
      placeholder: 'Email',
    },
    // Mail Verification
    emailVerification: {
      title: 'Verify your email address',
      message:
        "We've sent you an email to your email address, you will need to verify your email address before continuing the onboarding process.",
      notVerified: {
        title: 'Email not verified yet',
        description: 'Verify your email in order to continue',
      },
      fetchCurrentUserError: {
        title: 'There was an error',
        description: 'Please try again later.',
      },
    },
    // Password
    password: {
      title: 'Create password',
      placeholder: 'Password',
    },
    // Name
    name: {
      title: 'What’s your name?',
      legend: 'Your legal name is required to open an account.',
      firstNamePlaceholder: 'First name',
      lastNamePlaceholder: 'Last name',
    },
    // Birth Date
    birth: {
      title: 'What’s your birthday?',
      legend:
        'To open an Kinly account, you must be 18 years or older. Federal regulation requires that we verify your identity. ',
      disclosureLink: 'Learn more.',
      bottomSheet: {
        paragraphOne:
          'To help the government fight the funding of terrorism and money laundering activities, federal law requires all financial institutions to obtain, verify, and record information that identifies each person who opens a deposit account.',
        paragraphTwoTitle: 'What this means for you',
        paragraphTwo:
          'When you open a deposit account, we will ask for your name, address, date of birth, and other information that will allow us to identify you. We may also ask to see a copy of your driver’s license or other identifying documents.',
        buttonText: 'I understand',
      },
    },
    // Phone Number
    phoneNumber: {
      title: 'Let’s get started by verifying your phone number',
      placeholder: 'Phone',
      disclosure:
        'By submitting your phone number you agree to our {privacyPolicy} and to receive future transactional SMS messages & SMS messages about our product & features. Message and data rates may apply. Text STOP to stop receiving messages.',
      invalid: 'Invalid phone number',
      privacyPolicy: 'Privacy Policy',
    },
    confirmPhoneNumber: {
      title: 'Please enter the code sent to\n{phone}',
      resendCode: 'Resend Code',
    },
    // Address
    address: {
      header: 'Home Address',
      title: 'What’s your address?',
      legend: 'We’ll deliver your debit card to this address.',
      line1PlaceHolder: 'Street address',
      line2PlaceHolder: 'Apt/Suite (Optional)',
      cityPlaceholder: 'City',
      statePlaceholder: 'State',
      zipCodePlaceholder: 'Zip Code',
    },
    // SSN
    ssn: {
      title: 'Let’s verify your SSN',
      legend: 'Federal regulation requires that we verify your Social Security number.',
      note: 'We secure your information with</br> 128-bit encryption.',
    },
    // Welcome to Kinly
    welcomeToKinly: {
      title: 'Welcome to Kinly',
      description:
        'Your Kinly debit card is on its way! You should expect to see it in your mail within 8-10 days, but sometimes even faster.',
      legal: 'The Kinly Visa® Debit Card is issued \nby the Bancorp Bank, Member FDIC.',
    },
    // Fund
    fund: {
      title: 'Fund your account',
      content: 'Deposit money into your new account to get ahead with your money.',
      directDeposit: 'Add Direct Deposit',
      directDepositLegend: 'and get early paycheck*',
      bankTransfer: 'Bank transfer',
      depositCash: 'Deposit cash',
      skipNote:
        'You can always add funds later. \n*Additional terms apply. See Direct Deposit terms.',
      skipButton: 'Skip',
    },
    // Actions
    continue: 'Continue',
    save: 'Save and Continue',
    // Errors
    authError: {
      title: 'There was an error creating your account',
      description: 'Please try again later.',
    },
    signUpExistAccountError: {
      title: 'Email address is registered with an account',
      description: 'Please go back and sign in.',
    },
    signUpBlockSignUpError: {
      outsideUS: {
        title: 'Location not supported',
        description: 'Kinly is not available outside of the United States',
      },
    },
    requiredField: 'This field is required',
    invalidEmail: 'Your e-mail can’t contain special characters (e.g: ! % # ?)',
    invalidPassword:
      'Password doesn’t meet the security criteria: \n- Min 8 characters\n- At least 1 Uppercase character (A-Z)\n- Lower case characters (a-z)\n- Special characters (e.g: ! % # ?)',
    passwordsMustMatch: "Password doesn't match, please make sure to re-enter it correctly.",
    modalErrorTitle: 'Looks like something\n went wrong on our end.',
    modalErrorDescription:
      'Please try again. If you continue\n to experience issues, please contact\n support at 1-833-332-4323.',
    modalErrorButtonText: 'OK',
    nameError: 'You may only use letters, spaces and hyphen (-) in this field',
    minError: 'This field must be at least ${min} characters',
    maxError: 'This field must not exceed ${max} characters',
    maxCombinedError: 'Maximum name length is 25 characters',
    alphanumericError: 'You may only use letters and numbers in this field.',
    onlyLettersError: 'You may only use letters in this field.',
    bDayError: 'To create an account you must be 18 or older.',
    invalidBirthDate: 'Invalid birth date.',
    mainAddressError: 'This field must contain at least one number, one letter, and one space.',
    stateError: 'Should be a US state',
    zipError: 'You must enter a valid Zip Code',
    legalAgreementErrorHeader: 'Network communication error',
    legalAgreementErrorBody:
      'Error communicating with our server, please try again in a few seconds.',
    modalIdentityErrorTitle: 'We can’t verify your information at this point',
    modalIdentityErrorDescription:
      "We're constantly working on ways to improve our processes. We'll notify you in the future.",
    modalIdentityButton: 'I understand',
  },

  transferMoney: {
    transferFunds: 'Transfer funds',
    title: 'Transfer money',
    subTitle: 'What would you like to do?',
    addMoney: 'Add money',
    takeOutMoney: 'Take out money',
    cancel: 'Cancel',
    addMoneyDisclaimer: 'Currently not available in your account',
  },

  fetchCustomer: {
    error: {
      title: 'There was an error loading your account information',
      description: 'Please try again later.',
    },
  },
  updateAddress: {
    error: {
      title: 'Can’t confirm your address',
      description: 'Please check your address details.',
    },
    success: {
      title: 'Your address has been updated',
    },
  },
  updateEmail: {
    error: {
      title: 'Can’t confirm your email address',
      description: 'Please try updating your email address again.',
    },
    success: {
      title: 'Your email address has been updated',
    },
  },
  updatePhoneNumber: {
    success: {
      title: 'Your phone number has been updated',
    },
  },
  addressAutocompleteSuggestion: {
    error: {
      title: 'Can’t fetch address autocomplete suggestions',
    },
  },
  phoneVerification: {
    startVerification: {
      error: {
        title: 'Error sending SMS to your phone number ',
        description: 'Please verify it and try again',
      },
    },
    confirmVerification: {
      error: {
        title: 'We were unable to verify your phone number',
        description: 'Please, check the code received or resend a new one',
      },
    },
  },

  signIn: {
    button_text: 'Sign in',
    user_name: 'E-mail',
    password: 'Password',
    forgot_password: 'Forgot password?',
    signUp: 'Don’t have an account? Apply now.',
    expiredSession: {
      title: 'Due to inactivity, we’ve logged you out automatically.',
      description: 'Please log in again.',
    },
    defaultError: {
      title: 'Authentication error',
      description: 'Please try again later.',
    },
    outsideUSError: {
      title: 'Login outside US',
      description:
        'Kinly is only available in the United States. Due to regulation, international logins are blocked.',
    },
  },

  forgotPassword: {
    title: 'Recover your password',
    paragraph: "Enter your e-mail below and we'll send you a link to reset it.",
    placeholder: 'E-mail',
    submit: 'Request password reset',
    successTitle: 'Password reset e-mail sent',
    successMessage: 'You will receive an e-mail shortly ',
    errorTitle: 'Password reset failed ',
    errorMessage: 'Please try again later',
  },

  depositCash: {
    title: 'Deposit Cash',
    contentTitle: 'Deposit cash',
    contentDescription:
      'Deposit cash into your account when you visit thousands of Green Dot Network® locations nationwide.*',
    footerNote:
      '*When you deposit cash, it is transferred by a third party into your account. Additional fees may apply. ',
    footerNoteLink: 'Learn more.',
    infoSheetButtonLabel: 'Got it',
    infoSheetTitle: 'Deposit Cash',
    infoSheetContent:
      'Fees may apply depending on the retailer’s policies. When you deposit cash to your Kinly Account, it is transferred by a third party to your account. Your funds will be FDIC insured once the bank holding your account receives the funds from the third party.',
    infoSheetTermsAndConditions: 'See Deposit agreement for full terms and conditions.',
    button: 'Find a location near you',
  },

  directDepositInfo_directDeposit_title: 'Direct Deposit',
  directDepositInfo_directDeposit_body:
    'Send a pre-filled letter to your employer to set up your direct deposit.',
  directDepositInfo_overdraftProtection_title: 'Get up to $100 in overdraft protection*',
  directDepositInfo_overdraftProtection_body:
    'Just have a qualifying direct deposit from your employer and at least $1,000 in direct deposits within 35 days.',
  directDepositInfo_footer:
    'Send a pre-filled letter to your employer to set up your direct deposit.',
  directDepositInfo_footer_note:
    '*Not all deposits apply. Certain transactions may not apply such as ACH, P2P transactions, and others.',
  directDepositInfo_button: 'Create form',
  directDepositInfo_routing_number: 'Routing',
  directDepositInfo_account_number: 'Account',
  directDepositFormView_title: 'Direct Deposit Form',
  directDepositFormView_button: 'Send Form',

  directDepositFormSuccessTitle: 'All sent!',
  directDepositFormSuccessContent:
    'We’ve sent your direct deposit form to you. Give this pre-filled form to your employer and you’re all set!',
  directDepositFormErrorTitle: 'We’re unable to get you a direct deposit form',
  directDepositFormErrorContent:
    'Looks like we’re having some issue getting a form to you. Please try again later.',
  Plaid_title: 'The Kinly application Uses Plaid to link your account',

  earlyPaycheck: {
    title: 'Get your paycheck up to 2 days earlier*',
    description:
      'Connect your paycheck to your Kinly account automatically. Kinly uses Atomic to change your payroll provider direct deposit location.',
    disclaimer:
      '*Learn more about {earlyDepositLink}.\nBy clicking continue you agree to {atomicPrivacyLink}',
    buttonText: 'Continue',
    earlyDepositText: 'early direct deposit.',
    atomicPrivacyText: "Atomic's Privacy Policy",
    disclosureTitle: 'Early Direct Deposit',
    disclosureBody:
      'Early access to direct deposit funds depends on the timing of the submission of the payment file from the payer. We generally make these funds available on the day the payment file is received, which may be up to 2 days earlier than the scheduled payment date.',
    disclosureButtonText: 'I understand',
    setUpDirectDeposit: 'Other ways to set up direct deposit',
    bottomSheet: {
      title: 'Set up direct deposit',
      body: 'Give a pre-filled letter to your employer to set up your direct deposit.',
      buttonText: 'Get direct deposit form',
    },
    info: {
      title: 'Get your paycheck up to 2 days earlier*',
      body: 'Just have a qualifying direct deposit from your employer.',
    },
    success: {
      title: 'Congratulations!\nDirect deposit is set up',
      description:
        'Continue receiving direct deposits of at least $1,000 over 35 calendar days. We’ll let you know when it’s ready! {learnMoreLink}',
      learnMore: 'Learn more',
      buttonText: 'Got it',
    },
  },
  fund: {
    chooseAmount: {
      title: 'Add money',
      legend: 'How much money do you want to add?',
      continue: 'Continue',
    },
    confirmAmount: {
      title: 'Confirm Transfer',
      ctaText: 'Confirm Transfer',
      loadingAccount: 'Fetching Account...',
      kinlyAccount: 'Kinly Account',
      disclaimer: 'Transfers may take up to 3-5 business days to complete.',
      generalErrorHeader: 'There was an issue on our end completing your transaction',
      generalErrorBody: 'Please try again.',
    },
    failModal: {
      genericFail: 'Woops! Looks like something \n happened. Try again later.',
      closeModalButtonText: 'Go Back',
    },
    success: {
      title: 'Your money is on its way!',
      gotIt: 'Got it',
    },
  },

  overdraftProtection: {
    bottomSheet: {
      optIn: {
        title: 'Get overdraft protection',
        content: 'Get up to $100 in overdraft protection at no cost if you qualify.',
        primaryButtonText: 'Turn on overdraft protection',
        secondaryButtonText: 'Cancel',
      },
      optOut: {
        title: 'Turn off Kinly Overdraft',
        description: 'Would you like to turn off Kinly Overdraft protection?',
        secondaryButtonText: 'Cancel',
      },
    },
    error: {
      title: 'Unable to change overdraft protection state',
      description: 'Please try again later.',
    },
    successBottomSheet: {
      title: 'Overdraft Protection',
      description:
        'Overdraft is available after qualifying direct deposits of $1,000 or more over 35 calendar days into the Kinly Account. For eligible members who are enrolled in the Overdraft Service, the bank will approve purchases that result in a negative balance on the Kinly Account up to $100. Not all purchases are eligible. Eligibility conditions apply for the Overdraft Service. ',
      disclaimer: 'See {disclaimerLink} for full terms and conditions.',
      disclaimerLinkText: 'aheadmoney.com/overdraft', // TO-DO: update this
      buttonText: 'Got it',
    },
  },

  settings: {
    title: 'Settings',
    hello: 'Hello',
    content: 'To review or edit your settings, please call us at: ',
    user_info: 'Personal',
    account: 'Account',
    documents: 'Documents',
    help: 'Help',
    account_info: 'Kinly account',
    direct_deposit: 'Direct deposit',
    statements: 'Statements',
    account_policy: 'Account Policy & Terms',
    faq: 'FAQ',
    about: 'About',
    contact: 'Contact',
    logout: 'Log out',
    change_password: 'Change Password',
    findATM: 'Find ATM',
    depositCash: 'Deposit cash',
    overdraftProtection: 'Overdraft protection',
    policyTerms: {
      depositAccount: {
        title: 'Ahead Deposit Account Agreement',
        url: 'https://www.aheadmoney.com/mobileviews/m-deposit-agreement', // TO-DO: update this
      },
      electronicCommunication: {
        title: 'Ahead Agreement to Receive Electronic Communications',
        url: 'https://www.aheadmoney.com/mobileviews/m-electronic-communication-agreement', // TO-DO: update this
      },
      privacyPolicy: {
        title: 'Ahead Privacy Policy',
        url: 'https://www.aheadmoney.com/mobileviews/m-privacy-policy', // TO-DO: update this
      },
      kinlyUser: {
        title: 'Ahead User Agreement',
        url: 'https://www.aheadmoney.com/mobileviews/m-ahead-user-agreement', // TO-DO: update this
      },
      overdraft: {
        title: 'Ahead Overdraft Terms and Conditions',
        url: 'https://www.aheadmoney.com/mobileviews/m-overdraft', // TO-DO: update this
      },
      bankPrivacy: {
        title: 'The Bancorp Bank Privacy Notice',
        url: 'https://static-aheadmoney-com-prod.s3.amazonaws.com/assets/files/bancorp-privacy-notice-form.pdf', // TO-DO: update this
      },
      legalDocument: 'Legal Document',
    },
    kinlyMarketplace: 'Kinly Marketplace',
    shopDeals: 'Shop Deals',
    marketplace: 'Marketplace',
    getStarted: 'Get started',
    applyNow: 'Apply now',
  },

  card: {
    title: 'Card',
    activateCard: 'Activate Card',
    letsActivate: 'Let’s activate your card',
    description:
      'If you haven’t received the card yet, don’t worry, it takes between 8-10 days to arrive (but usually less than that).',
    securityCheck: 'Security Check',
    expDateMessage: 'Enter the expiration date on your debit card',
    expDateError: 'Oops! Please check the expiration date.',
    expDateErrorMessage: 'Please check the entered number and try again.',
    setInitialPinInfo: {
      title: 'Let’s set your PIN',
      description: 'Set your card PIN number to start using your Kinly Card.',
      openForm: 'Set my card PIN',
    },
    changePinInfo: {
      header: 'Change PIN',
      title: 'Let’s change your card PIN number',
      description: 'Use the form on the next screen to update your card PIN.',
      openForm: 'Change PIN',
      changePinMessage: 'To change your pin, please contact \nsupport:',
    },
    setPinForm: {
      header: 'Set debit card PIN',
      modalErrorTitle: 'Looks like something went wrong on our end.',
      modalErrorDescription:
        'Please try again. If you continue to experience issues, please contact support at 1-833-332-4323.',
      modalErrorButtonText: 'Ok',
    },
    setInitialPinSuccess: 'Your card has been activated.',
    changePinSuccess: 'Your pin has been updated.',
  },

  common: {
    continue: 'Continue',
    errorBoundary: {
      title: 'An Error Occurred',
      description:
        'There was an error on our end. The operation could not be completed. If the error persists, please email {email}',
      buttonText: 'Dismiss',
    },
  },

  cardTab_title: 'Card',
  cardTab_disclaimer: 'Kinly Visa® Debit Card is issued\n by The Bancorp Bank, Member FDIC.',
  cardTab_list_activate_card: 'Activate card',
  cardTab_list_lock_card: 'Lock and unlock card',
  cardTab_list_change_pin: 'Change PIN',
  cardTab_list_replace_card: 'Replace card',
  cardTab_list_find_atm: 'Find ATM',
  cardTab_list_find_place_to_deposit_cash: 'Find cash deposit location',

  cardTab_activateCard_title: 'Activate your card',
  cardTab_activateCard_content: 'To activate your card, please contact us at:',

  cardTab_lockCard_title: 'Lock your card',
  cardTab_lockCard_content: 'If you’d like to lock your card, please call customer support:',

  cardTab_resetPin_title: 'Reset your pin',
  cardTab_resetPin_content: 'If you’d like to change your pin, please contact us at:',

  cardTab_replaceCard_title: 'Replace your card',
  cardTab_replaceCard_content:
    'If your card was lost, stolen, or damaged, please contact support to get a new card:',

  cardTab_bottomSheet_continue: 'Continue',

  finEdTab_title: 'Learn',
  findEd: {
    playlist: {
      title: 'Playlists',
      description: 'Intro copy about Fined',
    },
  },
  finEdWelcome: {
    title: 'Welcome To \nKinly Learn',
    description:
      'Kinly provides financial education baked in to the platform. Uplevel your financial education with Kinly.',
    buttonText: 'Continue',
  },
  account_linked_accounts: 'Linked accounts',
  account_linked_empty: 'Add bank account',

  kinlyBankingServices: 'Kinly Banking Services',
  kinlyBankAccount: 'Kinly Bank Account',

  link_card_success: 'Your debit card was added successfully!',
  link_card_bad_cc:
    'Woops! Looks like you didn’t enter a valid debit card. Please try another debit card.',
  link_card_form_cc_number: 'Your card number',
  link_card_form_exp: 'Expiration date (MM/YY)',
  link_card_form_cvv: 'CVV Number',
  link_card_form_zip: 'Billing Zip Code',
  account: 'Account',
  routing: 'Routing',

  kinly_acount_name: 'KINLY ACCOUNT BALANCE',

  home: {
    header: 'Home',
    greeting: {
      morning: 'Good morning,',
      afternoon: 'Good afternoon,',
      evening: 'Good evening,',
    },
    accountBalance: 'Account Balance',
    viewAccountButton: 'View account',
  },

  linkAccount: {
    linkedAccounts: 'Linked Accounts',
    linkedEmpty: "You Don't Have Any Linked Account",
    cardInfoBottomSheet: {
      remove: 'Remove',
      closeButton: 'Close',
    },
    unlinkConfirmationBottomSheet: {
      description: 'Would you like to remove this bank from your account?',
      confirmButtonText: 'Remove bank account',
      cancelButtonText: 'Cancel',
    },
    unlinkAccountError: {
      title: 'Unable to remove bank account',
      description: 'Please try again later.',
    },
    unlinkAccountSuccess: {
      title: 'Bank Account Deleted',
      description: 'Your bank account has been removed.',
    },
    linkAccountSuccess: {
      title: 'Bank Account Linked',
      description: 'Your bank account has been linked.',
    },
    linkAccountError: {
      title: 'Unable to link bank account',
      description: 'Please try again later.',
    },
    fetchPlaidTokenError: {
      title: 'An error occurred, please try again.',
      text: 'There are no linked external bank accounts and we were unable to begin linking a new external bank account.',
    },
  },

  linkCard: {
    bottom_action: 'Link Card',
    contunue: 'Continue',
    previous: 'Previous',
    next: 'Next',
    awesome: 'Awesome!',
    go_back: 'Go Back',
    linked_cards: 'Linked Cards',
    linked_empty: "You Don't Have Cards Linked",
    linkDebitCard: 'Link debit card',
    card_number_leyend: 'Please enter your card details',
    card_number_placeholder: 'Card Number',
    card_number_error: 'Invalid debit card number',
    card_exp_date_placeholder: 'Expiration Date',
    card_sc_placeholder: 'Security Code',
    card_sc_error: 'Invalid security code',
    card_exp_date_error: 'Invalid expiration date',
    success: {
      title: 'Awesome!',
      description: 'Your debit card was \n added successfully!',
    },
    error: {
      title: 'Continue',
      description: 'Your debit card was not\nable to be added.',
    },
    flowIntroPage: {
      flowGoal: "Let's link a debit card!",
      flowGoalSubtext: 'Press continue, link a debit card\n and make the transfers you want',
    },
    cardInfoBottomSheet: {
      remove: 'Remove',
      closeButton: 'Close',
    },
    unlinkConfirmationBottomSheet: {
      description: 'Would you like to remove this debit card from your account?',
      confirmButtonText: 'Remove debit card',
      cancelButtonText: 'Cancel',
    },
    unlinkCardError: {
      title: 'Unable to remove bank account',
      description: 'Please try again later.',
    },
    unlinkCardSuccess: {
      title: 'Debit card deleted',
      description: 'Your debit card has been removed.',
    },
  },

  about: {
    copied: 'Copied!',
    version: 'Version',
    build: 'Build',
    deviceId: 'Device Id',
    savedToClipboard: 'saved to clipboard',
  },

  accountInfo: {
    copied: 'Copied!',
    accountNumber: 'Account Number',
    routingNumber: 'Routing Number',
    accountNumberCopied: 'Account number copied.',
    routingNumberCopied: 'Routing number copied.',
    balanceTitle: 'Available balance',
  },

  statements: {
    title: 'Statement',
    empty_main_title: 'All your statements will be available here starting next month.',
    empty_secondary_title: 'In the meantime, you can always see your transactions in real time.',
    empty_go_to_transactions_button: 'Go to your transactions',
    previewError: 'Error, try again later',
  },

  contact: {
    main_title: 'Have a question?',
    contactSupport: 'Contact support at 1-888-795-4659 or\n',
    email: 'support@bekinly.com',
    forAssistance: '\nfor assistance.',
    button: 'Call us',
    supportTitle: 'Customer Support Hours*',
    supportSchedule: 'Mon-Sat 7am-7pm CST\n Sun 9am-5pm CST',
    supportAvailability: '*Holidays excluded',
  },

  earlyPaycheckNudge: {
    header: {
      title: 'Early direct deposit',
      description: 'Connect your direct deposit to receive your pay up to 2 days earlier.',
    },
    buttonText: 'View details',
  },

  activateCardNudge: {
    title: 'Activate card',
    info: 'If you just got your card, go ahead and activate it now!',
    buttonText: 'Activate now',
  },

  accounts: {
    add: 'Add bank account',
    header: 'Accounts',
    allActivity: 'All activity',
    nudgeTitle: 'Recent Activity',
    nudgeEmptyState: 'No activity in last 30 days',
    emptyState: 'No activity yet',
    nudgeActionTitle: `View all activity`,
    processing: 'Processing',
    accountInfo: {
      error: {
        title: 'There was an issue on our end fetching your account',
        description: 'Please try again later',
      },
    },
    kinlyDebitCards: {
      error: {
        title: 'There was an issue on our end fetching your Kinly debit card',
        description: 'Please try again later',
      },
    },
    transactions: {
      error: {
        title: 'There was an issue on our end fetching your transactions',
        description: 'Please try again later',
      },
    },
    linkDebitCards: {
      error: {
        title: 'There was an issue on our end fetching your linked debit card',
        description: 'Please try again later',
      },
    },
    linkAccounts: {
      error: {
        title: 'There was an issue on our end fetching your linked bank account',
        description: 'Please try again later',
      },
    },
    overdraft: {
      error: {
        title: 'There was an issue on our end fetching your overdraft status',
        description: 'Please try again later',
      },
    },
  },

  moneyMovement: {
    amountPageHeader: 'Take out money',
    amountPageLegend: 'How much money do you want to take out?',
    instantTransfer: 'Instant transfer\n ${fee} fee',
    achTransfer: '3-5 business days\nNo fee',
    confirmationTitle: 'Transfer {amount}',
    instantTransferMin: 'Instant Transfer minimum is {amount}',
    instantTransferMax: 'Instant Transfer maximum is {amount}',
    standardTransferMax: 'Standard transfer maximum is {amount}',
    addMoneyTransferMax: 'Transfer maximum is {amount}',
    transferDetails: {
      kinlyAccount: 'Kinly Account',
      receiveAmount: 'You’ll receive:',
      transferAmount: 'You’ll transfer:',
      fee: 'Instant Transfer Fee:',
      from: 'From:',
      to: 'To:',
      method: 'Arrival:',
      instantTransfer: 'Instant',
      standardTransfer: '3-5 business days',
      confirmButton: 'Confirm Transfer',
      cancelButton: 'Cancel',
      instantTransferDisclaimer:
        'Most Instant Transfers are instant but can take up to 30 minutes depending on your bank.',
    },
    submitButtonText: 'Continue',
    insufficientFundsToastHeader: 'Not enough funds',
    insufficientFundsToastContent: "Your source bank doesn't have enough funds.",
    genericErrorToast: {
      title: 'There was an issue on our end completing your transaction',
      description: 'Please try again later.',
    },
  },
  changePassword: {
    title: 'Change your password',
    subtitle: "To help keep your account secure, we'll send you a new password.",
    button: 'Request password reset',
  },

  legalAgreement: {
    title: 'Legal Agreement',
    readAndAgreeCommunicationAgreement:
      'I have read and agree to the {communicationsAgreementLink}.',
    readAndAgreeOthers:
      'I have read and agree to the {accountAgreementLink}, and {privacyNotice}, {privacyPolicy} and {agreementPolicy}.',
  },

  forcedUpdates: {
    modal: {
      title: 'Update required',
      description: 'The most recent version of Kinly is required to ensure the best experience.',
      buttonText: 'Update',
    },
  },

  overdraft: {
    sell: {
      title: 'Kinly Overdraft',
      header: 'Set up your fee-free*\noverdraft protection',
      description:
        'Send a pre-filled letter to your employer to set up direct deposit. Then, receive at least $1,000 in deposits over 35 calendar days to qualify for Kinly Overdraft.',
      atomicFiDescription:
        'Connect your paycheck to your Kinly\naccount automatically. Kinly uses Atomic\nto change your direct deposit location.',
      buttonText: 'Get direct deposit form',
      atomicFiButtonText: 'Continue',
      disclaimer:
        'We’ll notify you via email when you’re eligible.\n*Additional terms and conditions apply. {learnMoreLink}',
      atomicFiDisclaimer:
        '*Additional terms and conditions apply. {learnMoreLink}\nBy clicking continue you agree to {atomicPrivacyPolicyLink}',
      learnMore: 'Learn more.',
      atomicFiPrivacyPolicy: "Atomic's Privacy Policy",
      setUpDirectDeposit: 'Other ways to set up direct deposit',
      setUpDirectDepositBottomSheet: {
        title: 'Set up direct deposit',
        body: 'Give a pre-filled letter to your employer to set up your direct deposit.',
        buttonText: 'Get direct deposit form',
      },
      eligibilityFirstStep:
        "Don't worry - we'll send you an email\nto let you know when you're eligible.",
      directDepositFormInfo:
        'Send your your employer the pre-filled form or your account details below to set up direct deposit.',
      disclosureTitle: 'Overdraft Protection',
      disclosureBody:
        'Overdraft is available after qualifying direct deposits of $1,000 or more over 35 calendar days into the Kinly Account. For eligible members who are enrolled in the Overdraft Service, the bank will approve purchases that result in a negative balance on the Kinly Account up to $100. Not all purchases are eligible. Eligibility conditions apply for the Overdraft Service.\n',
      disclosureBodyLink: 'See\n{linkUrl} for full terms and conditions.',
      termsAndConditionsLinkText: 'aheadmoney.com/overdraft', // TO-DO: update this
      disclosureButton: 'I understand',
      directDepositFormError: {
        title: 'Issue retrieving direct deposit form',
        description: 'Please try again later',
      },
    },
    legalAgreement: {
      title: 'Kinly Overdraft Terms and Conditions',
      agreementCheck:
        'I have read the Kinly Overdraft Terms and Conditions and agree to get started and become eligible.',
      submit: 'Turn on',
    },
    nudge: {
      active: {
        title: 'Kinly Overdraft',
        limit: 'max limit',
        statusOn: 'On',
        statusOnBody:
          'Go to settings to turn off Kinly Overdraft at any time. See {termsLink} for additional details.',
        termsLinkText: 'terms',
      },
      optedOut: {
        header: {
          title: 'Kinly Overdraft',
          description:
            'Set up direct deposit and receive up\nto $100 of fee-free overdraft protection!',
        },
        buttonText: 'Set up Kinly Overdraft',
      },
      inactiveOptedIn: {
        header: {
          title: 'You’re eligible\nfor Kinly Overdraft',
          description: 'Ready to activate',
        },
        buttonText: 'Turn on Kinly Overdraft',
      },
    },
    optInSuccess: {
      title: 'Congratulations!\nYou have Kinly\nOverdraft.',
    },
  },

  forceAppKill: {
    modal: {
      title: 'We’ll be back in a bit!',
      description:
        'Kinly is currently undergoing \nscheduled maintenance to ensure you \nget the best experience. We should be \nback online soon.\n\nFor urgent matters please email {email}',
      buttonText: 'Email Support',
    },
  },
  dates: {
    locale: 'en-US',
  },

  done: 'Done',
  gotIt: 'Got it',
  back: 'Back',
  advertiserDisclosure: {
    modal: {
      title: 'Advertiser disclosure',
      description: `Some of the offers that appear on this Site and Mobile Application are from companies from which kinly may receive compensation. This compensation may impact how and where products appear on this Site and Mobile Application, including, for example, the order in which they may appear within listing categories. kinly does not include all products or offers available in the marketplace. It is always your choice whether or not to apply for an offered product or service and we will never submit an application for a financial product or service on your behalf without your express consent. For further information, please refer to our `,
      linkDescription: `Privacy Notice, Terms and Conditions, and Third-party Disclosures.`,
    },
  },
  thirdPartyDisclosure: {
    modal: {
      title: 'Third-party disclosure',
      description: `No Content!`,
    },
  },
};
