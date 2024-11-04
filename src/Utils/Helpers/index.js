export function maskEmail(email = "") {
  const parts = email.split("@");
  const username = parts[0];
  const domain = parts[1];

  const maskedUsername =
    username.charAt(0) +
    "*".repeat(username.length - 2) +
    username.charAt(username.length - 1);

  return maskedUsername + "@" + domain;
}

export const maskNumber = (mobileNum) => {
  let number = mobileNum.replace(/-/g, "");
  if (mobileNum.startsWith("92")) {
    number = `0${mobileNum.slice(2)}`;
  }
  if (!number || number.length < 4) return number;
  return `${number.slice(0, 4)}*****${number.slice(9, 11)}`;
};

export const retrieveMobileNumber = (mobileNum) => {
  return mobileNum.replace(/[-_]/g, "");
};

//handle file size of img
export const validateFileSize = (file) => {
  const fileSizeInMB = file.size / (1024 * 1024);
  const sizeLimit = 2; // Size limit in MB
  return fileSizeInMB <= sizeLimit;
};

//Default get option label for AutoComplete
export const defaultGetOptionLabel = (option) => {
  if (Array.isArray(option) && option.length === 0) return ""; // Handle empty array
  return option?.label ? option?.label : option?.split("*")[1];
};

export const Verificationcondition = (isVerification, resumeApplication) => {
  if (isVerification) {
    return "Verify OTP";
  } else if (resumeApplication) {
    return "Resume";
  } else {
    return "Proceed";
  }
};

export const tempUser = {
  userId: 1,
  name: "daniyal",
};
