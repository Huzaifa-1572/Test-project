// LOCAL
export const BASE_URL = "http://192.168.20.101:8080/";

// UAT
// export const BASE_URL = 'http://10.6.60.6:8089/'

export const ENDPOINTS = {
  AUTHENTICATION: "api/dao/v1/authenticate",
  IS_CUSTOMER_EXIST: "api/dao/v1/customer/isExist",
  SEND_SMS: "api/dao/v1/otp/sendsms",
  VALIDATE_SMS_OTP: "api/dao/v1/otp/validate-sms-otp",
  SEND_EMAIL: "api/dao/v1/otp/sendemail",
  VALIDATE_EMAIL_OTP: "api/dao/v1/otp/validate-email-otp",
};
