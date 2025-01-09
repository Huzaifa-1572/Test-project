import * as yup from "yup";
import dayjs from "dayjs";
import { retrieveMobileNumber } from "src/Utils/Helpers";

// FOR DATE OF BIRTH
const minAge = (age) => {
  return dayjs().subtract(age, 'year').toDate();
};

// FOR CNIC ISSUANCE DATE
const validIssuanceDate = (date) => {
  return dayjs(date).isBefore(dayjs(), 'day');
};

const withinReasonableTimeframe = (date, years = 50) => {
  return dayjs(date).isAfter(dayjs().subtract(years, 'year'), 'day');
};

// FOR CNIC EXPIRY DATE
const validExpiryDate = (date) => {
  return dayjs(date).isAfter(dayjs(), 'day');
};

const withinReasonableRange = (date, years = 100) => {
  return dayjs(date).isBefore(dayjs().add(years, 'year'), 'day');
};

export const shape = {
  "scr_customerCnic": {
    KEY_NAME: yup
      .string()
      .required("Name is required.")
      .min(3, "Name must be at least 3 characters.")
      .max(100, "Name must not exceed 100 characters."),
    customerCnic: yup
      .string()
      .required("CNIC is required.")
      .matches(/^\d{5}-\d{7}-\d{1}$/, "Please enter a valid CNIC in the format XXXXX-XXXXXXX-X."),
    googleCaptcha: yup.string().required("Please complete the CAPTCHA to proceed."),
  },

  "scr_customerCnicResume": {
    KEY_GEO_COORDINATES: yup
      .object({
        KEY_LATITUDE: yup
          .number()
          .required("Failed to retrieve location. Please enable location access."),
        KEY_LONGITUDE: yup
          .number()
          .required("Failed to retrieve location. Please enable location access."),
      })
      .required("Failed to retrieve location. Please enable location access."),
    customerCnic: yup
      .string()
      .required("CNIC is required.")
      .matches(/^\d{5}-\d{7}-\d{1}$/, "Please enter a valid CNIC in the format XXXXX-XXXXXXX-X."),
    googleCaptcha: yup.string().required("Please complete the CAPTCHA to proceed."),
  },

  "scr_customerMobile": {
    customerMobile: yup.string().test('e__NokMobile', 'Please enter a valid mobile number starting with 03xxx-xxxxxxx.', function (value) {
      if (value.length === 11) {
        value = retrieveMobileNumber(value);
      }
      return /^(03)\d{2}-\d{7}$/.test(value);
    }).required('Mobile number is required.'),
    customerOperator: yup
      .string()
      .required("Please select a mobile operator.")
  },

  "scr_customerEmail": {
    customerEmail: yup
      .string()
      .required("Email address is required.")
      .matches(
        /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/,
        "Please enter a valid email address (e.g., name@example.com)."
      )
      .email("Please enter a valid email address.")
      .max(50, "Email address must not exceed 50 characters."),
  },

  "scr_additionalInformation": {
    KEY_MOTHER_MAIDEN_NAME: yup
      .string()
      .required("Mother's maiden name is required.")
      .min(3, "Mother's maiden name must be at least 3 characters.")
      .max(100, "Mother's maiden name must not exceed 100 characters."),
    KEY_PLACE_OF_BIRTH: yup
      .string()
      .required("Place of birth is required.")
  },

  "scr_addressDetail": {
    KEY_ADDRESS_LINE_1: yup
      .string()
      .required("Address is required.")
      .min(4, "Address must be at least 4 characters.")
      .max(200, "Address must not exceed 200 characters."),
    KEY_LANDMARK: yup
      .string()
      .optional()
      .min(4, "Landmark must be at least 4 characters.")
      .max(100, "Landmark must not exceed 100 characters."),
    KEY_PROVINCE: yup
      .string()
      .required('Province is required.'),
    KEY_CITY_CODE: yup
      .string()
      .required('City is required.')
  },

  "scr_livePhotoCapture": {
    KEY_LIVE_PHOTO: yup
      .string()
      .required('Please take a photo to proceed.')
  },

  "scr_uploadCnicFront": {
    KEY_CNIC_FRONT: yup
      .string()
      .required('Please upload the front side of your CNIC.')
  },

  "scr_uploadCnicBack": {
    KEY_CNIC_BACK: yup
      .string()
      .required('Please upload the back side of your CNIC.')
  },

  "scr_cnicDetail": {
    KEY_NAME: yup
      .string()
      .required("Name is required.")
      .min(3, "Name must be at least 4 characters.")
      .max(200, "Name must not exceed 200 characters."),
    KEY_PARANTAGE: yup
      .string()
      .required("Parentage is required.")
      .min(3, "Parentage must be at least 4 characters.")
      .max(200, "Parentage must not exceed 200 characters."),
    KEY_CUST_IDENT_VALUE: yup
      .string()
      .required("CNIC is required.")
      .matches(
        /^\d{5}-\d{7}-\d{1}$/,
        "Please enter a valid CNIC in the format XXXXX-XXXXXXX-X."
      ),
    KEY_DOB: yup
      .date()
      .required('Date of birth is required.')
      .max(minAge(18), 'You must be at least 18 years old.')
      .typeError('Please provide a valid date of birth.'),
    KEY_CNIC_ISSUANCE_DATE: yup
      .date()
      .required('CNIC issuance date is required')
      .test('is-valid-date', 'Please enter a valid CNIC issuance date format.', (value) => dayjs(value).isValid())
      .test('not-in-future', 'CNIC issuance date cannot be in the future', (value) => validIssuanceDate(value))
      .test('within-reasonable-timeframe', 'CNIC issuance date should be within the last 50 years', (value) => withinReasonableTimeframe(value))
      .typeError('Please provide a valid CNIC issuance date.'),
    KEY_CNIC_EXPIRY_DATE: yup
      .date()
      .required('CNIC expiry date is required')
      .test('is-valid-date', 'Please enter a valid CNIC expiry date format.', (value) => dayjs(value).isValid())
      .test('not-in-past', 'CNIC expiry date cannot be in the past', (value) => validExpiryDate(value))
      .typeError('Please provide a valid CNIC expiry date.'),
    KEY_CNIC_LIFETIME: yup.boolean().required('Please select if the CNIC is lifetime.'),
  },

  "scr_termsAndConditions": {
    isAccepted: yup
      .boolean()
      .oneOf([true], 'You must accept the terms and conditions to proceed.')
      .required('You must accept the terms and conditions to continue.')
  }
};