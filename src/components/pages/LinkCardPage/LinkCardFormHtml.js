import ENV from 'react-native-config';
import { COLORS } from '_constants';
import strings from '_localization';
import W3CContextService from '_services/W3CContextService';

module.exports = (authToken) => {
  return `
  <!DOCTYPE html>
  <html lang="en">

  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <title>SignUpFormVgs</title>
    <link
      rel="stylesheet"
      href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
      crossorigin="anonymous"
    />
    <script type="text/javascript" src="${ENV.VGS_COLLECT_SCRIPT_URI}"></script>
    <style>
      body {
        background-color: ${COLORS.background};
      }

      label {
        color: ${COLORS.beta400};
        font-size: 12px;
      }

      .form-field {
        display: block;
        font-size: 16px;
        color: ${COLORS.beta900};
        border-bottom: 1px solid ${COLORS.alpha500};
        height: 50px;
        width: 100%;
        padding-right: 8px;
        padding-left: 8px;
      }

      .form-field iframe {
        vertical-align: middle;
        height: 100%;
        width: 100%;
      }

      #bottom-bar {
        position: absolute;
        bottom: 0px;
        width: 100%;
      }

      button {
        background-color: transparent;
        border: 0 none transparent;
        color: ${COLORS.alpha500};
        font-weight: 600;
        font-size: 13px;
        width: 100%;
        padding: 15px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .next-btn {
        background-color: ${COLORS.alpha500};
        color: ${COLORS.white};
      }

      .back-btn {
        border: 1px solid ${COLORS.alpha500};
      }

      .med {
        width: 45%;
      }

      *:disabled {
        background-color: ${COLORS.beta100};
      }

      .second-screen {
        display: flex;
        justify-content: space-between;
        width: 100%;
      }

      .inner {
        width: 48%;
      }

      .hidden {
        display: none;
      }

      main {
        overflow: hidden;
      }

      .error {
        color: ${COLORS.epsilon500};
        opacity: 0;
        transition: all 0.4s cubic-bezier(.17, .67, .83, .67);
      }

      .show {
        opacity: 1;
        transition: all 0.4s cubic-bezier(.17, .67, .83, .67);
      }

      .error-field {
        border-bottom: 1px solid ${COLORS.epsilon500};
      }

      .lds-spinner {
        display: block;
        position: relative;
        width: 16px;
        height: 16px;
        margin-top: 14px;
      }

      .lds-spinner div {
        animation: lds-spinner 1.2s linear infinite;
      }

      .lds-spinner div:after {
        content: " ";
        display: block;
        position: absolute;
        top: 5px;
        left: 6px;
        width: 2px;
        height: 5px;
        border-radius: 20%;
        background: ${COLORS.white};
      }

      .lds-spinner div:nth-child(1) {
        transform: rotate(0deg);
        animation-delay: -1.1s;
      }

      .lds-spinner div:nth-child(2) {
        transform: rotate(30deg);
        animation-delay: -1s;
      }

      .lds-spinner div:nth-child(3) {
        transform: rotate(60deg);
        animation-delay: -0.9s;
      }

      .lds-spinner div:nth-child(4) {
        transform: rotate(90deg);
        animation-delay: -0.8s;
      }

      .lds-spinner div:nth-child(5) {
        transform: rotate(120deg);
        animation-delay: -0.7s;
      }

      .lds-spinner div:nth-child(6) {
        transform: rotate(150deg);
        animation-delay: -0.6s;
      }

      .lds-spinner div:nth-child(7) {
        transform: rotate(180deg);
        animation-delay: -0.5s;
      }

      .lds-spinner div:nth-child(8) {
        transform: rotate(210deg);
        animation-delay: -0.4s;
      }

      .lds-spinner div:nth-child(9) {
        transform: rotate(240deg);
        animation-delay: -0.3s;
      }

      .lds-spinner div:nth-child(10) {
        transform: rotate(270deg);
        animation-delay: -0.2s;
      }

      .lds-spinner div:nth-child(11) {
        transform: rotate(300deg);
        animation-delay: -0.1s;
      }

      .lds-spinner div:nth-child(12) {
        transform: rotate(330deg);
        animation-delay: 0s;
      }

      @keyframes lds-spinner {
        0% {
          opacity: 1;
        }
        100% {
          opacity: 0;
        }
      }
    </style>
  </head>

  <body>
    <main>
      <div class="row">
        <div class="col-md-4">
          <div class="row">
            <div class="card-body">
              <form id="vgs-form" onsubmit="return formSubmit();">
                <div class="form-group">
                  <div class='first-screen' id='step1'>
                    <label for="link_card_form_cc_number">${strings.linkCard.card_number_placeholder}</label>
                    <span id="link_card_form_cc_number" name="link_card_form_cc_number" class="form-field"></span>
                    <p class='error' id='cardNumberError'>${strings.linkCard.card_number_error}</p>
                  </div>
                  <div class='second-screen hidden' id='step2'>
                    <div class='inner'>
                      <label for="link_card_form_exp">${strings.linkCard.card_exp_date_placeholder}</label>
                      <span id="link_card_form_exp" name="link_card_form_exp" class="form-field"></span>
                      <p class='error' id='cardExpError'>${strings.linkCard.card_exp_date_error}</p>
                    </div>
                    <div class='inner'>
                      <label for="link_card_form_cvv">${strings.linkCard.card_sc_placeholder}</label>
                      <span id="link_card_form_cvv" name="link_card_form_cvv" class="form-field"></span>
                      <p class='error' id='cardCVVError'>${strings.linkCard.card_sc_error}</p>
                    </div>
                  </div>
                </div>
                <!--Submit credit card form button-->
              </form>
            </div>
          </div>
        </div>
      </div>
      <div id="bottom-bar" class="bottom-bar">
        <button onClick='changeStep()' form="vgs-form" id="next-btn" class='next-btn'>${strings.linkCard.next}</button>
        <div class='second-screen hidden' id='step2-btns'>
          <button id="back-btn" class='back-btn med' onClick='back()'>${strings.linkCard.previous}</button>
          <button type="submit" disabled class='next-btn med disabled' form="vgs-form"
            id="next-btn2">${strings.linkCard.next}</button>
        </div>
      </div>
    </main>
    <!--Include script with VGS Collect form initialization-->
    <script>
      let step = 0;
      const nextBtn = document.getElementById('next-btn');
      const nextBtn2 = document.getElementById('next-btn2');
      const step1 = document.getElementById('step1');
      const step2 = document.getElementById('step2');
      const step2Btns = document.getElementById('step2-btns');

      const cardField = document.getElementById('link_card_form_cc_number');
      const expField = document.getElementById('link_card_form_exp');
      const cvvField = document.getElementById('link_card_form_cvv');

      const cardError = document.getElementById('cardNumberError');
      const expError = document.getElementById('cardExpError');
      const cvvError = document.getElementById('cardCVVError');

      // VGS Collect form initialization
      const form = VGSCollect.create('${ENV.VGS_COLLECT_KEY}', '${ENV.VGS_COLLECT_ENV}', (state) => {
        nextBtn.disabled = !state.link_card_form_cc_number.isValid;

        if (!state.link_card_form_cc_number.isValid && !state.link_card_form_cc_number.isEmpty) {
          cardError.classList.add('show');
          cardField.classList.add('error-field');
        } else {
          cardError.classList.remove('show');
          cardField.classList.remove('error-field');
        }

        if (!state.link_card_form_cvv.isValid || !state.link_card_form_exp.isValid) {
          nextBtn2.disabled = true;
          nextBtn2.innerHTML = '${strings.linkCard.next}';
        } else {
          nextBtn2.disabled = false;
        }

        if (!state.link_card_form_cvv.isValid && !state.link_card_form_cvv.isEmpty) {
          cvvError.classList.add('show');
          cvvField.classList.add('error-field');
        } else {
          cvvError.classList.remove('show');
          cvvField.classList.remove('error-field');
        }

        if (!state.link_card_form_exp.isValid && !state.link_card_form_exp.isEmpty) {
          expError.classList.add('show');
          expField.classList.add('error-field');
        } else {
          expError.classList.remove('show');
          expField.classList.remove('error-field');
        }

        // Do not enable the button after the form was submitted
        if (nextBtn2.innerHTML !== '${strings.linkCard.next}') {
          nextBtn2.disabled = true;
        }
      });

      const bottomBar = document.getElementById('bottom-bar')

      form.field('#link_card_form_cc_number', {
        type: 'card-number',
        name: 'link_card_form_cc_number',
        validations: ['required', "validCardNumber"],
        placeholder: '1111 1111 1111 1111',
        showCardIcon: true,
      });

      form.field('#link_card_form_exp', {
        type: 'card-expiration-date',
        name: 'link_card_form_exp',
        validations: ['required', 'validCardExpirationDate'],
        placeholder: 'MM/YY',
        yearLength: '2',
        serializers: [
          { name: "replace", options: { old: "/", new: "" } },
          { name: "replace", options: { old: " ", new: "" } }
        ],
      });

      form.field('#link_card_form_cvv', {
        type: 'card-security-code',
        name: 'link_card_form_cvv',
        placeholder: '123',
        validations: ['required', 'validCardSecurityCode'],
      });

      // Submits all of the form fields by executing a POST request.
      function formSubmit() {
        nextBtn2.innerHTML = "<div class='lds-spinner'><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>";

        form.submit(
          '/postback',
          {
            headers: {
              'Authorization': 'Bearer ${authToken}',
              'traceparent': '${W3CContextService.traceParent}',
              'tracestate': '${W3CContextService.traceState}'
            },
          },
          (status, data) => {
            const tokenizedData = {
              cardNumberAliasToken: data.link_card_form_cc_number,
              expirationDateAliasToken: data.link_card_form_exp,
              cvvAliasToken: data.link_card_form_cvv
            }

            window.ReactNativeWebView.postMessage(JSON.stringify({ status, data: tokenizedData }));
          }
        );

        return false;
      }

      function back() {
        step2.classList.add('hidden');
        step2Btns.classList.add('hidden');
        step1.classList.remove('hidden');
        nextBtn.classList.remove('hidden');
      }

      function changeStep() {
        nextBtn2.innerHTML = '${strings.linkCard.next}';
        step2.classList.remove('hidden');
        step2Btns.classList.remove('hidden');
        step1.classList.add('hidden');
        nextBtn.classList.add('hidden');
      }
    </script>
  </body>

  </html>
`;
};
