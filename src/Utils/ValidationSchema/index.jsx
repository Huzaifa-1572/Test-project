import * as yup from "yup";

export const shape = {
  "scr_customerCnic": {
    customerCnic: yup
      .string()
      .required("This field is required")
      .matches(/^\d{5}-\d{7}-\d{1}$/, "A valid CNIC is required"),
    googleCaptcha: yup.string().required("Captcha is required"),

  },
  "mobile-verification": {
    customerMobile: yup
      .string()
      .required("This field is required")
      .matches(/^(03)\d{2}-\d{7}$/, "A valid mobile number is required."),
  },
  "email-verification": {
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
};

export const emailRegex =
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
