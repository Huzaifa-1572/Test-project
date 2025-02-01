export const INITIAL_VALUES = {
  isResumeApplication: false,
  customerCnic: "",
  googleCaptcha: "",
  customerMobile: "",
  customerOperator: "",
  isValidEmail: "",
  customerEmail: "",
  CUSTOMER_CONTINUE_WITH_NEW_DEVICE: false,
  OTP_VERIFICATION_TOKEN: "",
  KEY_MOTHER_MAIDEN_NAME: "",
  KEY_PLACE_OF_BIRTH: "",
  KEY_GEO_COORDINATES: null,
  KEY_ADDRESS_LINE_1: "",
  KEY_CITY_CODE: "",
  KEY_PROVINCE: "",
  KEY_LANDMARK: "",
  KEY_LIVE_PHOTO: "",
  KEY_CNIC_FRONT: "",
  KEY_CNIC_BACK: "",
  KEY_NAME: "",
  KEY_PARANTAGE: "",
  KEY_CUST_IDENT_VALUE: "",
  KEY_DOB: null,
  KEY_CNIC_ISSUANCE_DATE: null,
  KEY_CNIC_EXPIRY_DATE: null,
  KEY_CNIC_LIFETIME: false,
  isAccepted: false
};

export const OPERATOR_MAP = {
  41006: "Telenor",
  41004: "Zong",
  41007: "Warid",
  41003: "Ufone",
  41001: "Mobilink",
  41009: "Scom",
};

export const PAYLOAD_KEYS = {
  CUST_IDENTIFICATION_KEY: "0001",
  CHANNEL_CODE: "0013",
  KEY_LIVE_PHOTO: "0046",
  KEY_CNIC_FRONT: "0032",
  KEY_CNIC_BACK: "0033",
};

export const FIELD_MANIFEST = {
  TEXTBOX: "Text Box",
  MULTILINE_TEXTBOX: "multiline_text_box",
  DROPDOWN: "Drop Down",
  LOV_POB: "lov_place_of_birth",
  LOV_PROVINCE: "lov_province",
  LOV_CITY: "lov_city",
  UPLOAD_DOCUMENT: "upload_document",
  CNIC: "CNIC",
  DATE_PICKER: "DatePicker",
  CHECKBOX: "checkbox",
};
