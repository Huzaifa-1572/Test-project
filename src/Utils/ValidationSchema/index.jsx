import * as yup from "yup";
import { retrieveMobileNumber } from "src/Utils/Helpers";

const currentDate = new Date();
const minDate = new Date(1900, 0, 1);

export const shape = {
  "scr_customerCnic": {
    customerCnic: yup
      .string()
      .required("This field is required")
      .matches(/^\d{5}-\d{7}-\d{1}$/, "A valid CNIC is required"),
    googleCaptcha: yup.string().required("Captcha is required"),
  },

  "scr_customerMobile": {
    customerMobile: yup.string().test('e__NokMobile', 'A valid mobile number is required.', function (value) {
      if (value.length === 11) {
        value = retrieveMobileNumber(value);
      }
      return /^(03)\d{2}-\d{7}$/.test(value);
    }).required('This field is required'),
    customerOperator: yup
      .string()
      .required("This field is required")
  },

  "scr_customerEmail": {
    customerEmail: yup
      .string()
      .required("This field is required")
      .matches(
        /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/,
        "A valid email address is required."
      )
      .email("A valid email address is required.")
      .max(40, "Must be at most 40 characters"),
  },

  "scr_personalInformation": {
    KEY_FIRST_NAME: yup
      .string()
      .required("This field is required"),
    KEY_LAST_NAME: yup
      .string()
      .required("This field is required")
  },

  "scr_additionalInformation": {
    KEY_MOTHER_MAIDEN_NAME: yup.string().required('This field is required')
      .min(3, 'Must be at least 3 characters')
      .max(20, 'Must be at most 20 characters'),
    KEY_PLACE_OF_BIRTH: yup
      .string()
      .required("This field is required")
  },

  "scr_addressDetail": {
    KEY_ADDRESS_LINE_1: yup.string().required('This field is required')
      .min(4, 'Must be at least 4 characters'),
    KEY_LANDMARK: yup.string().required('This field is required')
      .min(3, 'Must be at least 3 characters')
      .max(20, 'Must be at most 20 characters'),
    KEY_PROVINCE: yup.string().required('This field is required'),
    KEY_CITY_CODE: yup.string().required('This field is required')
  },

  "scr_cnicDetail": {
    KEY_NAME: yup.string().required('This field is required')
      .min(4, 'Must be at least 4 characters'),
    KEY_PARANTAGE: yup.string().required('This field is required'),
    KEY_CNIC: yup
      .string()
      .required("This field is required")
      .matches(/^\d{5}-\d{7}-\d{1}$/, "A valid CNIC is required"),
    KEY_DOB: yup.date().required('This field is required')
      .transform((value, originalValue) => {
        if (!originalValue) {
          return null
        }
        const parsedDate = Date.parse(originalValue);
        return isNaN(parsedDate) ? new Date('') : new Date(parsedDate);
      }),
    // .min(minDate, `Date of birth must be later than ${format(minDate, 'dd/MM/yyyy')}`)
    // .max(currentDate, `Date of birth must be earlier than ${format(currentDate, 'dd/MM/yyyy')}`),
    KEY_CNIC_ISSUANCE_DATE: yup.date().required('This field is required')
      .transform((value, originalValue) => {
        if (!originalValue) {
          return null
        }
        const parsedDate = Date.parse(originalValue);
        return isNaN(parsedDate) ? new Date('') : new Date(parsedDate);
      }),
    // .min(minDate, `Date of birth must be later than ${format(minDate, 'dd/MM/yyyy')}`),
    KEY_CNIC_EXPIRY_DATE: yup.date()
      .nullable()
      .when('KEY_CNIC_LIFETIME', {
        is: (lifetime) => lifetime === false, // Validate only if lifetime is unchecked (false)
        then: () => yup.date()
          .required('This field is required')
          .transform((value, originalValue) => {
            if (!originalValue) {
              return null;
            }
            const parsedDate = Date.parse(originalValue);
            return isNaN(parsedDate) ? new Date('') : new Date(parsedDate);
          }),
        // .min(minDate, `Expiry date must be later than ${format(minDate, 'dd/MM/yyyy')}`),
        otherwise: () => yup.string().nullable(), // Not required if lifetime is checked
      }),
    KEY_CNIC_LIFETIME: yup.boolean().required('This field is required'),
  },
  "scr_termsAndConditions":{
    isAccepted: yup.boolean().oneOf([true], 'You must accept the terms').required('This field is required'),
    googleCaptchaReviewApplication: yup.string().required("Captcha is required"),
  }
};