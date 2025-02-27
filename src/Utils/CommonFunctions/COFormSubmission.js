import { BASE_URL, ENDPOINTS } from "src/Utils/Config";
import { PAYLOAD_KEYS } from "src/Utils/Constants";
import {
  getCurrentDate,
  getSHA256Hash,
  retrieveCNIC,
  retrieveDate,
  retrieveDOE,
  retrieveMobileNumber,
} from "src/Utils/Helpers";

export const AUTHENTICATION_HANDLER = ({ CURRENT_SCREEN, data }) => {
  const BODY = {
    custIdentityKey: PAYLOAD_KEYS.CUST_IDENTIFICATION_KEY,
    channelCode: PAYLOAD_KEYS.CHANNEL_CODE,
    reCaptchaToken: data?.googleCaptcha,
    custIdentityValue: retrieveCNIC(data.customerCnic),
    screenKuid: CURRENT_SCREEN,
    requestDate: getCurrentDate(),
  };

  return {
    API_URL: `${BASE_URL}${ENDPOINTS.AUTHENTICATION}`,
    BODY,
  };
};

export const CNICEXIST_HANDLER = ({ CURRENT_SCREEN, CUSTOMER_CNIC }) => {
  const BODY = {
    custIdentityKey: PAYLOAD_KEYS.CUST_IDENTIFICATION_KEY,
    channelCode: PAYLOAD_KEYS.CHANNEL_CODE,
    custIdentityValue: retrieveCNIC(CUSTOMER_CNIC),
    screenKuid: CURRENT_SCREEN === "scr_customerCnicResume" ? 'scr_customerCnic' : CURRENT_SCREEN,
    requestDate: getCurrentDate(),
  };

  return {
    API_URL: `${BASE_URL}${ENDPOINTS.IS_CUSTOMER_EXIST}`,
    BODY,
  };
};

export const CUSTMOBILE_HANDLER = ({
  CURRENT_SCREEN,
  data,
  isResumeApplication = false,
}) => {
  const BODY = {
    custIdentityKey: PAYLOAD_KEYS.CUST_IDENTIFICATION_KEY,
    channelCode: PAYLOAD_KEYS.CHANNEL_CODE,
    custIdentityValue: retrieveCNIC(data.customerCnic),
    mobileNumber: retrieveMobileNumber(data.customerMobile),
    mobileOperator: data.customerOperator,
    screenKuid: CURRENT_SCREEN,
    isResumeApplication: isResumeApplication,
    requestDate: getCurrentDate(),
  };

  return {
    API_URL: `${BASE_URL}${ENDPOINTS.SEND_SMS}`,
    BODY,
  };
};

export const CUSTMOBILE_VERIFICATION_HANDLER = ({ CURRENT_SCREEN, data }) => {
  const MOBILE_DEVICE_DATA = JSON.parse(sessionStorage.getItem('device'))

  const BODY = {
    custIdentityKey: PAYLOAD_KEYS.CUST_IDENTIFICATION_KEY,
    channelCode: PAYLOAD_KEYS.CHANNEL_CODE,
    custIdentityValue: retrieveCNIC(data.customerCnic),
    mobileNumber: retrieveMobileNumber(data.customerMobile),
    name: data.KEY_NAME,
    mnp: data.customerOperator,
    longitude: data.KEY_GEO_COORDINATES.KEY_LONGITUDE,
    latitude: data.KEY_GEO_COORDINATES.KEY_LATITUDE,
    deviceId: MOBILE_DEVICE_DATA?.deviceId,
    playerId: MOBILE_DEVICE_DATA?.playerId,
    makeModel: MOBILE_DEVICE_DATA?.makeModel,
    deviceType: MOBILE_DEVICE_DATA?.deviceType,
    deviceVersion: MOBILE_DEVICE_DATA?.deviceVersion,
    rooted: MOBILE_DEVICE_DATA?.rooted,
    screenKuid: CURRENT_SCREEN,
    token: data.OTP_VERIFICATION_TOKEN,
    otp: getSHA256Hash(data.CUSTOMER_OTP),
    requestDate: getCurrentDate(),
    isUserContinue: data.CUSTOMER_CONTINUE_WITH_NEW_DEVICE
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
    requestDate: getCurrentDate(),
    content: {
      KEY_HAS_VALID_EMAIL: data.isValidEmail,
    },
  };

  return {
    API_URL: `${BASE_URL}${ENDPOINTS.GENERIC_HANDLER}`,
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
    requestDate: getCurrentDate(),
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
    otp: getSHA256Hash(data.CUSTOMER_OTP),
    requestDate: getCurrentDate(),
  };

  return {
    API_URL: `${BASE_URL}${ENDPOINTS.VALIDATE_EMAIL_OTP}`,
    BODY,
  };
};

export const MULTIPLE_KYC_HANDLER = ({ CURRENT_SCREEN, data, kuid }) => {
  const isEdit = localStorage.getItem("isEdit") || false;
  if (isEdit) { localStorage.removeItem("isEdit") }

  let fields = [];
  if (Array.isArray(kuid)) {
    fields = kuid?.map((kuid) => {
      if (kuid === "KEY_CUST_IDENT_VALUE") {
        return {
          attributeName: kuid,
          attributeValue: retrieveCNIC(data[kuid]),
        };
      }

      if ((kuid === "KEY_DOB") || (kuid === "KEY_CNIC_ISSUANCE_DATE")) {
        return {
          attributeName: kuid,
          attributeValue: retrieveDate(data[kuid]),
        };
      }

      if (kuid === "KEY_CNIC_EXPIRY_DATE") {
        return {
          attributeName: kuid,
          attributeValue: retrieveDOE(data[kuid]),
        };
      }

      return {
        attributeName: kuid,
        attributeValue: data[kuid],
      };
    });
  }


  const BODY = {
    custIdentityKey: PAYLOAD_KEYS.CUST_IDENTIFICATION_KEY,
    channelCode: PAYLOAD_KEYS.CHANNEL_CODE,
    custIdentityValue: retrieveCNIC(data.customerCnic),
    screenKuid: CURRENT_SCREEN,
    isRedirectedScreen: isEdit,
    requestDate: getCurrentDate(),
    content: {
      kycs: fields,
    },

  };

  return {
    API_URL: `${BASE_URL}${ENDPOINTS.CUSTOMER_INFORMATION}`,
    BODY,
  };
};

export const DOCUMENT_HANDLER = ({ CURRENT_SCREEN, data, kuid }) => {
  const BODY = {
    documentType: PAYLOAD_KEYS[kuid],
    custIdentityKey: PAYLOAD_KEYS.CUST_IDENTIFICATION_KEY,
    channelCode: PAYLOAD_KEYS.CHANNEL_CODE,
    custIdentityValue: retrieveCNIC(data.customerCnic),
    screenKuid: CURRENT_SCREEN,
    imageBase64: data[kuid],
    requestDate: getCurrentDate(),
  };

  return {
    API_URL: `${BASE_URL}${ENDPOINTS.DOCUMENT_HANDLER}`,
    BODY,
  };
};

export const REVIEW_APPLICATION_HANDLER = ({ CURRENT_SCREEN, data }) => {
  const BODY = {
    custIdentityKey: PAYLOAD_KEYS.CUST_IDENTIFICATION_KEY,
    channelCode: PAYLOAD_KEYS.CHANNEL_CODE,
    custIdentityValue: retrieveCNIC(data.customerCnic),
    screenKuid: CURRENT_SCREEN,
    requestDate: getCurrentDate(),
  };

  return {
    API_URL: `${BASE_URL}${ENDPOINTS.REVIEW_APPLICATION}`,
    BODY,
  };
};

export const APPLICATION_COMPLETE_HANDLER = ({ CURRENT_SCREEN, data }) => {
  const BODY = {
    custIdentityKey: PAYLOAD_KEYS.CUST_IDENTIFICATION_KEY,
    channelCode: PAYLOAD_KEYS.CHANNEL_CODE,
    custIdentityValue: retrieveCNIC(data.customerCnic),
    screenKuid: CURRENT_SCREEN,
    requestDate: getCurrentDate(),
  };

  return {
    API_URL: `${BASE_URL}${ENDPOINTS.APPLICATION_COMPLETE}`,
    BODY,
  };
};

export const GET_IMAGE_HANDLER = ({ CURRENT_SCREEN, customerCnic, kuid }) => {
  const BODY = {
    documentType: PAYLOAD_KEYS[kuid],
    custIdentityKey: PAYLOAD_KEYS.CUST_IDENTIFICATION_KEY,
    channelCode: PAYLOAD_KEYS.CHANNEL_CODE,
    custIdentityValue: retrieveCNIC(customerCnic),
    screenKuid: CURRENT_SCREEN,
    requestDate: getCurrentDate(),
  };

  return {
    API_URL: `${BASE_URL}${ENDPOINTS.GET_IMAGE_HANDLER}`,
    BODY,
  };
};

export const GO_BACK_HANDLER = ({ PREV_SCREEN, customerCnic }) => {
  const BODY = {
    custIdentityKey: PAYLOAD_KEYS.CUST_IDENTIFICATION_KEY,
    channelCode: PAYLOAD_KEYS.CHANNEL_CODE,
    custIdentityValue: retrieveCNIC(customerCnic),
    screenKuid: PREV_SCREEN,
    requestDate: getCurrentDate(),
  };

  return {
    API_URL: `${BASE_URL}${ENDPOINTS.GO_BACK}`,
    BODY,
  };
};

export const EDIT_HANDLER = ({ CURRENT_SCREEN, customerCnic }) => {
  const BODY = {
    custIdentityKey: PAYLOAD_KEYS.CUST_IDENTIFICATION_KEY,
    channelCode: PAYLOAD_KEYS.CHANNEL_CODE,
    custIdentityValue: retrieveCNIC(customerCnic),
    screenKuid: CURRENT_SCREEN,
    requestDate: getCurrentDate(),
  };

  return {
    API_URL: `${BASE_URL}${ENDPOINTS.EDIT_HANDLER}`,
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
  scr_customerCnicResume: ({ CURRENT_SCREEN, data }) => {
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
  scr_additionalInformation: ({ CURRENT_SCREEN, data }) => {
    return MULTIPLE_KYC_HANDLER({
      CURRENT_SCREEN,
      data,
      kuid: ["KEY_PLACE_OF_BIRTH", "KEY_MOTHER_MAIDEN_NAME"],
    });
  },
  scr_addressDetail: ({ CURRENT_SCREEN, data }) => {
    return MULTIPLE_KYC_HANDLER({
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
  scr_livePhotoCapture: ({ CURRENT_SCREEN, data }) => {
    return DOCUMENT_HANDLER({
      CURRENT_SCREEN,
      data,
      kuid: "KEY_LIVE_PHOTO",
    });
  },
  scr_uploadCnicFront: ({ CURRENT_SCREEN, data }) => {
    return DOCUMENT_HANDLER({
      CURRENT_SCREEN,
      data,
      kuid: "KEY_CNIC_FRONT",
    });
  },
  scr_uploadCnicBack: ({ CURRENT_SCREEN, data }) => {
    return DOCUMENT_HANDLER({
      CURRENT_SCREEN,
      data,
      kuid: "KEY_CNIC_BACK",
    });
  },
  scr_cnicDetail: ({ CURRENT_SCREEN, data }) => {
    return MULTIPLE_KYC_HANDLER({
      CURRENT_SCREEN,
      data,
      kuid: [
        "KEY_NAME",
        "KEY_PARANTAGE",
        "KEY_CUST_IDENT_VALUE",
        "KEY_DOB",
        "KEY_CNIC_ISSUANCE_DATE",
        "KEY_CNIC_EXPIRY_DATE",
        "KEY_CNIC_LIFETIME",
      ],
    });
  },
  scr_reviewApplication: ({ CURRENT_SCREEN, data }) => {
    return REVIEW_APPLICATION_HANDLER({
      CURRENT_SCREEN,
      data,
    });
  },
  scr_termsAndConditions: ({ CURRENT_SCREEN, data }) => {
    return APPLICATION_COMPLETE_HANDLER({
      CURRENT_SCREEN,
      data,
    });
  },
};
