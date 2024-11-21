import { BASE_URL, ENDPOINTS } from "src/Utils/config";
import { PAYLOAD_KEYS } from "src/Utils/Constants";
import { retrieveCNIC, retrieveMobileNumber } from "src/Utils/Helpers";

export const AUTHENTICATION_HANDLER = ({ CURRENT_SCREEN, data }) => {
  const BODY = {
    custIdentityKey: PAYLOAD_KEYS.CUST_IDENTIFICATION_KEY,
    channelCode: PAYLOAD_KEYS.CHANNEL_CODE,
    reCaptchaToken: data?.googleCaptcha,
    custIdentityValue: retrieveCNIC(data.customerCnic),
    screenKuid: CURRENT_SCREEN,
  };

  return {
    API_URL: `${BASE_URL}${ENDPOINTS.AUTHENTICATION}`,
    BODY,
  };
};

export const CNICEXIST_HANDLER = ({ CURRENT_SCREEN, customerCnic }) => {
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
    token: data.OTP_VERIFICATION_TOKEN,
    otp: data.customerOTP,
  };

  return {
    API_URL: `${BASE_URL}${ENDPOINTS.VALIDATE_SMS_OTP}`,
    BODY,
  };
};

export const CUST_HASVALIDEMAIL_HANDLER = ({ CURRENT_SCREEN, data }) => {
  const BODY = {
    custIdentityKey: PAYLOAD_KEYS.CUST_IDENTIFICATION_KEY,
    channelCode: PAYLOAD_KEYS.CHANNEL_CODE,
    custIdentityValue: retrieveCNIC(data.customerCnic),
    screenKuid: CURRENT_SCREEN,
    content: {
      KEY_HAS_VALID_EMAIL: data.isValidEmail,
    },
  };

  return {
    API_URL: `${BASE_URL}${ENDPOINTS.HAS_VALID_EMAIL}`,
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
    token: data.OTP_VERIFICATION_TOKEN,
    otp: data.customerOTP,
  };

  return {
    API_URL: `${BASE_URL}${ENDPOINTS.VALIDATE_EMAIL_OTP}`,
    BODY,
  };
};

export const PERSONAL_INFORMATION_HANDLER = ({
  CURRENT_SCREEN,
  data,
  kuid,
}) => {
  let fields;

  if (Array.isArray(kuid)) {
    fields = kuid.map((kuid) => ({
      attributeName: kuid,
      attributeValue: data[kuid],
    }));
  }

  const BODY = {
    custIdentityKey: PAYLOAD_KEYS.CUST_IDENTIFICATION_KEY,
    channelCode: PAYLOAD_KEYS.CHANNEL_CODE,
    custIdentityValue: retrieveCNIC(data.customerCnic),
    screenKuid: CURRENT_SCREEN,
    content: {
      kycs: fields,
    },
  };

  return {
    API_URL: `${BASE_URL}${ENDPOINTS.CUSTOMER_INFORMATION}`,
    BODY,
  };
};

export const ADDITIONAL_INFORMATION_HANDLER = ({
  CURRENT_SCREEN,
  data,
  kuid,
}) => {
  let fields;

  if (Array.isArray(kuid)) {
    fields = kuid.map((kuid) => ({
      attributeName: kuid,
      attributeValue: data[kuid],
    }));
  }

  const BODY = {
    custIdentityKey: PAYLOAD_KEYS.CUST_IDENTIFICATION_KEY,
    channelCode: PAYLOAD_KEYS.CHANNEL_CODE,
    custIdentityValue: retrieveCNIC(data.customerCnic),
    screenKuid: CURRENT_SCREEN,
    content: {
      kycs: fields,
    },
  };

  return {
    API_URL: `${BASE_URL}${ENDPOINTS.CUSTOMER_INFORMATION}`,
    BODY,
  };
};

export const DEVICE_LOCATION_HANDLER = ({ CURRENT_SCREEN, data }) => {
  const BODY = {
    custIdentityKey: PAYLOAD_KEYS.CUST_IDENTIFICATION_KEY,
    channelCode: PAYLOAD_KEYS.CHANNEL_CODE,
    custIdentityValue: retrieveCNIC(data.customerCnic),
    screenKuid: CURRENT_SCREEN,
    content: {
      KEY_LONGITUDE: data.KEY_GEO_COORDINATES.KEY_LONGITUDE,
      KEY_LATITUDE: data.KEY_GEO_COORDINATES.KEY_LATITUDE,
    },
  };

  return {
    API_URL: `${BASE_URL}${ENDPOINTS.DEVICE_LOCATION}`,
    BODY,
  };
};

export const ADDRESS_DETAIL_HANDLER = ({ CURRENT_SCREEN, data, kuid }) => {
  let fields;

  if (Array.isArray(kuid)) {
    fields = kuid.map((kuid) => ({
      attributeName: kuid,
      attributeValue: data[kuid],
    }));
  }

  const BODY = {
    custIdentityKey: PAYLOAD_KEYS.CUST_IDENTIFICATION_KEY,
    channelCode: PAYLOAD_KEYS.CHANNEL_CODE,
    custIdentityValue: retrieveCNIC(data.customerCnic),
    screenKuid: CURRENT_SCREEN,
    content: {
      kycs: fields,
    },
  };

  return {
    API_URL: `${BASE_URL}${ENDPOINTS.CUSTOMER_INFORMATION}`,
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
  scr_hasValidEmail: ({ CURRENT_SCREEN, data }) => {
    return CUST_HASVALIDEMAIL_HANDLER({
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
  scr_personalInformation: ({ CURRENT_SCREEN, data }) => {
    return PERSONAL_INFORMATION_HANDLER({
      CURRENT_SCREEN,
      data,
      kuid: ["KEY_FIRST_NAME", "KEY_LAST_NAME"],
    });
  },
  scr_additionalInformation: ({ CURRENT_SCREEN, data }) => {
    return ADDITIONAL_INFORMATION_HANDLER({
      CURRENT_SCREEN,
      data,
      kuid: ["KEY_PLACE_OF_BIRTH", "KEY_MOTHER_MAIDEN_NAME"],
    });
  },
  scr_deviceLocation: ({ CURRENT_SCREEN, data }) => {
    return DEVICE_LOCATION_HANDLER({
      CURRENT_SCREEN,
      data,
    });
  },
  scr_addressDetail: ({ CURRENT_SCREEN, data }) => {
    return ADDRESS_DETAIL_HANDLER({
      CURRENT_SCREEN,
      data,
      kuid: [
        "KEY_ADDRESS_LINE_1",
        "KEY_CITY_CODE",
        "KEY_PROVINCE",
        "KEY_LANDMARK",
      ],
    });
  },
};
