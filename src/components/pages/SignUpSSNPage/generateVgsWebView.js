import ENV from 'react-native-config';
import PasswordCircledIcon from '_assets/GeneralIcons/password-circled-base64';
import { COLORS, REGEX } from '_constants';
import strings from '_localization';
import W3CContextService from '_services/W3CContextService';

const generateVgsWebView = ({ credentials, userData }) => `
  <!DOCTYPE html>
  <html lang="en">

  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <link
      rel="stylesheet"
      href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
      crossorigin="anonymous"
    >
    <script type="text/javascript" src="${ENV.VGS_COLLECT_SCRIPT_URI}"></script>
    <style>
      body {
        background-color: ${COLORS.background};
      }

      .form-field {
        background: linear-gradient(92.8deg, rgba(119, 110, 196, 0.07) 0%, rgba(247, 121, 60, 0.07) 100%);
        color: ${COLORS.beta900};
        display: block;
        // font-weight: 600;
        color: aquamarine;
        font-size: 14px;
        border: 2px solid ${COLORS.alpha500};
        border-radius: 6px;
        height: 60px;
        width: 100%;
        padding-right: 8px;
        padding-left: 8px;
      }

      .form-field iframe {
        vertical-align: middle;
        height: 100%;
        width: 100%;
      }

      .btn-container {
        position: absolute;
        bottom: 0px;
        width: 100%;
      }

      .btn {
        color: ${COLORS.white};
        background: ${COLORS.alpha500};
        border-radius: 10px;
        font-size: 13px;
        font-weight: 600;
        padding: 16px;
      }

      .btn:disabled {
        background: ${COLORS.beta100};
      }

      .security-card {
        color: ${COLORS.beta500};
        font-size: 12px;
        font-weight: 400;
        line-height: 18px;
        padding-top: 12px;
        padding-bottom: 12px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 32px 0px;
      }
    </style>
  </head>

  <body>
    <main>
      <form id="vgs-form">
        <div class="form-group">
          <span id="ssn" class="form-field">
            <!--VGS Collect iframe for the SSN field will be here!-->
          </span>
        </div>
        <div class="security-card">
            ${strings.signUp.ssn.note}
            <img src="${PasswordCircledIcon}" alt="security" width="30" height="30">
        </div>
        <div class="btn-container">
          <button class="btn btn-block" id="submit-button" type="submit">${strings.signUp.continue}</button>
        </div>
      </form>
    </main>
    <!--Include script with VGS Collect form initialization-->
    <script>
      const submitButton = document.getElementById('submit-button');

      // VGS Collect form initialization
      const vgsForm = VGSCollect.create('${ENV.VGS_COLLECT_KEY}', '${ENV.VGS_COLLECT_ENV}', (state) => {
        // Do not enable the button after the form was submitted
        if (submitButton.innerHTML !== '${strings.loading}') {
          submitButton.disabled = !state.ssn.isValid;
        }
      });

      vgsForm.field('#ssn', {
        name: 'ssn',
        placeholder: '***-**-****',
        type: 'text',
        serializers: [{ name: "replace", options: { old: "-", new: "", count: "2" } }],
        validations: ['required', '${REGEX.ssn}'],
        css: {
          fontSize: '16px',
          fontWeight: '600',
          lineHeight: '48px',
        },
        successColor: '${COLORS.beta900}',
      }).mask('999-99-9999', '*');

      // Submits all of the form fields by executing a POST request.
      document.getElementById('vgs-form')
        .addEventListener('submit', (e) => {
          e.preventDefault();

          submitButton.innerHTML = '${strings.loading}';
          submitButton.disabled = true;

          vgsForm.submit(
            '/accounts',
            {
              headers: {
                'Authorization': 'Bearer ${credentials?.accessToken}',
                'traceparent': '${W3CContextService.traceParent}',
                'tracestate': '${W3CContextService.traceState}'
              },
              data: {
                'userId': '${credentials?.sub}',
                'email': '${userData?.email}',
                'firstName': '${userData?.firstName}',
                'lastName': '${userData?.lastName}',
                'dateOfBirth': '${userData?.dateOfBirth}',
                'phoneNumber': '${userData?.phoneNumber}',
                'addressLine1': '${userData?.addressLine1}',
                'addressLine2': '${userData?.addressLine2}',
                'city': '${userData?.city}',
                'state': '${userData?.state}',
                'zipCode': '${userData?.zipCode}',
              }
            },
            (status, data) => {
              window.ReactNativeWebView.postMessage(JSON.stringify({ status, data }));
            }
          );
        });
    </script>
  </body>

  </html>
`;

export default generateVgsWebView;
