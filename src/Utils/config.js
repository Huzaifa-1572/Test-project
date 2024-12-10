// LOCAL
// export const BASE_URL = "http://192.168.10.200:8080/";

// UAT
export const BASE_URL = "http://10.6.60.6:8089/";

export const ENDPOINTS = {
  AUTHENTICATION: "api/dao/v1/authenticate",
  IS_CUSTOMER_EXIST: "api/dao/v1/customer/isExist",
  SEND_SMS: "api/dao/v1/otp/sendsms",
  VALIDATE_SMS_OTP: "api/dao/v1/otp/validate-sms-otp",
  SEND_EMAIL: "api/dao/v1/otp/sendemail",
  VALIDATE_EMAIL_OTP: "api/dao/v1/otp/validate-email-otp",
  CUSTOMER_INFORMATION: "api/dao/v1/customer/updateCustomerInfo",
  GENERIC_HANDLER: "api/dao/v1/generic-handler/",
  DOCUMENT_HANDLER: "api/dao/v1/document/uploadImageBase64",
  GET_IMAGE_HANDLER: "api/dao/v1/document/getImageBase64ByDocId",
  REVIEW_APPLICATION: "api/dao/v1/customer/validateCustomerInfo",
  APPLICATION_COMPLETE: "api/dao/v1/customer/submitCustomerInfo",
  GO_BACK: "api/dao/v1/customer/getKYCDetail",
  EDIT_HANDLER: "api/dao/v1/customer/editKYCDetail",
};


