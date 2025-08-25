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
  isAccepted: false,
  updateCustomerCnic: ""
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
  TEXTDATE: "Text Date"
};


export const dateFormats = [
  "DD.MM.YYYY", // 23.02.2021
  "MM/DD/YYYY", // 02/23/2021
  "YYYY-MM-DD", // 2021-02-23
  "YYYY/MM/DD", // 2021/02/23
  "DD/MM/YYYY", // 23/02/2021
  "MM-DD-YYYY", // 02-23-2021
  "YYYY.MM.DD", // 2021.02.23
  "YYYY/DD/MM", // 2021/23/02
  "MM.DD.YYYY", // 23.02.2021
];


export const LIVENESS_GUIDELINES = [
  {
    heading: 'Volume Up 🔊',
    content: 'Keep your device’s sound on to catch all audio cues.'
  },
  {
    heading: 'No Glasses 🚫👓',
    content: 'Remove glasses before starting.'
  },
  {
    heading: 'Face Detection 👤',
    content: 'Ensure your face is centered, well-lit, and fully visible.'
  },
  {
    heading: 'Eye Blinking 👁️‍🗨️',
    content: 'Close your eyes slowly for 1–2 seconds when blinking.'
  },
  {
    heading: 'Head Movement ↩️↪️',
    content: 'Turn your head slowly as instructed, holding the position for 1–2 seconds.'
  },
  {
    heading: 'Good Lighting 💡',
    content: 'Be in a bright environment without strong backlight or shadows.'
  },
  {
    heading: 'Avoid Blurriness 🔍',
    content: 'Keep the camera focused for a sharp image.'
  },
];



export const CNIC_UPLOAD_GUIDELINES = [
  "Keep image clear and centered.",
  "Ensure the image is straight and stable.",
  "Use good lighting, avoid shadows and blurriness.",
];