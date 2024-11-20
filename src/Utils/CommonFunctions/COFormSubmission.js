import { BASE_URL, ENDPOINTS } from "../config";
import { PAYLOAD_KEYS } from "../Constants";
import { retrieveCNIC, retrieveMobileNumber } from "../Helpers";

export const AUTHENTICATION_HANDLER = ({ CURRENT_SCREEN, data }) => {
  const BODY = {
    custIdentityKey: PAYLOAD_KEYS.CUST_IDENTIFICATION_KEY,
    channelCode: PAYLOAD_KEYS.CHANNEL_CODE,
    reCaptchaToken: data.googleCaptcha,
    custIdentityValue: retrieveCNIC(data.customerCnic),
    screenKuid: CURRENT_SCREEN,
  };

  return {
    API_URL: `${BASE_URL}${ENDPOINTS.AUTHENTICATION}`,
    BODY,
  };
};

export const CNICEXIST_HANDLER = ({ CURRENT_SCREEN, getValues }) => {
  const customerCnic = getValues("customerCnic");
  const BODY = {
    custIdentityKey: PAYLOAD_KEYS.CUST_IDENTIFICATION_KEY,
    channelCode: PAYLOAD_KEYS.CHANNEL_CODE,
    custIdentityValue: retrieveCNIC(customerCnic),
    screenKuid: CURRENT_SCREEN,
  };

  return {
    API_URL: `${BASE_URL}${ENDPOINTS.IS_CUSTOMER_EXIST}`,
    BODY,
  };
};

export const CUSTMOBILE_HANDLER = ({ CURRENT_SCREEN, data }) => {
  const BODY = {
    custIdentityKey: PAYLOAD_KEYS.CUST_IDENTIFICATION_KEY,
    channelCode: PAYLOAD_KEYS.CHANNEL_CODE,
    custIdentityValue: retrieveCNIC(data.customerCnic),
    mobileNumber: retrieveMobileNumber(data.customerMobile),
    screenKuid: CURRENT_SCREEN,
    isResumeApplication: false,
  };

  return {
    API_URL: `${BASE_URL}${ENDPOINTS.SEND_SMS}`,
    BODY,
  };
};

export const CUSTMOBILE_VERIFICATION_HANDLER = ({ CURRENT_SCREEN, data }) => {
  const BODY = {
    custIdentityKey: PAYLOAD_KEYS.CUST_IDENTIFICATION_KEY,
    channelCode: PAYLOAD_KEYS.CHANNEL_CODE,
    custIdentityValue: retrieveCNIC(data.customerCnic),
    mobileNumber: retrieveMobileNumber(data.customerMobile),
    screenKuid: CURRENT_SCREEN,
    token: data.verificationToken,
    otp: data.customerOTP,
  };

  return {
    API_URL: `${BASE_URL}${ENDPOINTS.VALIDATE_SMS_OTP}`,
    BODY,
  };
};

export const CUSTEMAIL_HANDLER = ({ CURRENT_SCREEN, data }) => {
  const BODY = {
    custIdentityKey: PAYLOAD_KEYS.CUST_IDENTIFICATION_KEY,
    channelCode: PAYLOAD_KEYS.CHANNEL_CODE,
    custIdentityValue: retrieveCNIC(data.customerCnic),
    email: data.customerEmail,
    screenKuid: CURRENT_SCREEN,
    isResumeApplication: false,
  };

  return {
    API_URL: `${BASE_URL}${ENDPOINTS.SEND_EMAIL}`,
    BODY,
  };
};

export const CUSTEMAIL_VERIFICATION_HANDLER = ({ CURRENT_SCREEN, data }) => {
  const BODY = {
    custIdentityKey: PAYLOAD_KEYS.CUST_IDENTIFICATION_KEY,
    channelCode: PAYLOAD_KEYS.CHANNEL_CODE,
    custIdentityValue: retrieveCNIC(data.customerCnic),
    email: data.customerEmail,
    screenKuid: CURRENT_SCREEN,
    token: data.verificationToken,
    otp: data.customerOTP,
  };

  return {
    API_URL: `${BASE_URL}${ENDPOINTS.VALIDATE_EMAIL_OTP}`,
    BODY,
  };
};

export const COFormSubmission = {
  scr_customerCnic: ({ CURRENT_SCREEN, data }) => {
    return AUTHENTICATION_HANDLER({
      CURRENT_SCREEN,
      data,
    });
  },

  scr_customerMobile: ({ CURRENT_SCREEN, data }) => {
    return CUSTMOBILE_HANDLER({
      CURRENT_SCREEN,
      data,
    });
  },
  scr_mobileVerification: ({ CURRENT_SCREEN, data }) => {
    return CUSTMOBILE_VERIFICATION_HANDLER({
      CURRENT_SCREEN,
      data,
    });
  },
  scr_customerEmail: ({ CURRENT_SCREEN, data }) => {
    return CUSTEMAIL_HANDLER({
      CURRENT_SCREEN,
      data,
    });
  },
  scr_emailVerification: ({ CURRENT_SCREEN, data }) => {
    return CUSTEMAIL_VERIFICATION_HANDLER({
      CURRENT_SCREEN,
      data,
    });
  },
};
