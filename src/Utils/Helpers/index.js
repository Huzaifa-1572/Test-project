import Axios from "axios";

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

// check camera access
export function checkCameraPermission() {
  return new Promise((resolve, reject) => {
    // Check if the browser supports navigator.mediaDevices
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      reject("getUserMedia is not supported in this browser");
    }

    // Check camera permission
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        // Camera permission granted
        stream.getTracks().forEach((track) => track.stop()); // Stop the stream
        resolve("Camera permission granted");
      })
      .catch((error) => {
        // Camera permission denied or error
        reject("Camera permission denied or error: " + error);
      });
  });
}

export const tempUser = {
  userId: 1,
  name: "daniyal",
};


// SETUP REQUEST INTERCEPTOR
export const setupRequestInterceptor = () => {
  Axios.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem("token");
      if (!!token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    function (error) {
      console.error('Request Interceptor Error:', error);
      return Promise.reject(error);
    }
  );
};

// SETUP RESPONSE INTERCEPTOR
export const setupResponseInterceptor = () => {
  Axios.interceptors.response.use(
    function (response) {
      const authorizationHeader = response?.config?.headers?.Authorization;
      if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
        // Remove the 'Bearer ' prefix from the token
        const token = authorizationHeader.replace('Bearer ', '');
        localStorage.setItem('token', token);
        console.log('Token without Bearer:', token);
      }
      return response; // Always return the response or modify it
    },
    function (error) {
      console.error('Response Interceptor Error:', error);
      // You can add additional error-handling logic here
      return Promise.reject(error);
    }
  );
};


// GET SCREEN
export const getScreen = (data) => {
  const screen = data?.next_screen?.screenViewObj?.screen_kuid || data?.next_screen?.screen_kuid || ''
  return screen
}
