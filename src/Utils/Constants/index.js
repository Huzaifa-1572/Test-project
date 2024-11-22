export const INITIAL_VALUES = {
  isResumeApplication: false,
  customerCnic: "",
  googleCaptcha: "",
  customerMobile: "",
  customerOperator: "",
  isValidEmail: "",
  customerEmail: "",
  OTP_VERIFICATION_TOKEN: "",
  KEY_FIRST_NAME: "",
  KEY_LAST_NAME: "",
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
  KEY_CNIC: "",
  KEY_DOB: "",
  KEY_CNIC_ISSUANCE_DATE: "",
  KEY_CNIC_EXPIRY_DATE: "",
  KEY_CNIC_LIFETIME: false,
};

export const OPERATOR_OPTION = [
  { value: "1", label: "Zong" },
  { value: "2", label: "Jazz" },
  { value: "3", label: "Telenor" },
  { value: "4", label: "Uphone" },
];

export const PAYLOAD_KEYS = {
  CUST_IDENTIFICATION_KEY: "0001",
  CHANNEL_CODE: "0013",
  DOCUMENT_TYPE: "1",
};

export const FIELD_MANIFEST = {
  TEXTBOX: "Text Box",
  DROPDOWN: "Drop Down",
  LOV_POB: "lov_place_of_birth",
  LOV_PROVINCE: "lov_province",
  LOV_CITY: "lov_city",
  UPLOAD_DOCUMENT: "upload_document",
  CNIC: "CNIC",
  DATE_PICKER: "DatePicker",
  CHECKBOX: "checkbox",
};