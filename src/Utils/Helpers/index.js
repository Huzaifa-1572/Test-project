import Axios from "axios";
import Dexie from "dexie";

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

export function retrieveCNIC(cnic) {
  return cnic.replace(/[-\s]/g, "");
}

//handle file size of img
export const validateFileSize = (file) => {
  const fileSizeInMB = file.size / (1024 * 1024);
  const sizeLimit = 2; // Size limit in MB
  return fileSizeInMB <= sizeLimit;
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
      const token = localStorage.getItem("referenceKey");
      if (!!token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    function (error) {
      console.error("Request Interceptor Error:", error);
      return Promise.reject(error);
    }
  );
};

// SETUP RESPONSE INTERCEPTOR
export const setupResponseInterceptor = () => {
  Axios.interceptors.response.use(
    function (response) {
      const authorizationHeader = response?.config?.headers?.Authorization;
      if (authorizationHeader && authorizationHeader.startsWith("Bearer ")) {
        // Remove the 'Bearer ' prefix from the token
        const token = authorizationHeader.replace("Bearer ", "");
        localStorage.setItem("referenceKey", token);
        console.log("Token without Bearer:", token);
      }
      return response; // Always return the response or modify it
    },
    function (error) {
      console.error("Response Interceptor Error:", error);
      // You can add additional error-handling logic here
      return Promise.reject(error);
    }
  );
};

const db = new Dexie("store");
db.version(1).stores({
  data: "id, currentScreen",
  tokens: "id, token",
});

// Function to store initial data
export async function storeDataToIndexDb(data) {
  await db.data.put({ id: 1, currentScreen: data });
}

// Function to update data on beforeunload
export async function updateIndexDbData(data) {
  await db.data.update(1, { currentScreen: data });
}

// Function to retrieve stored data
export async function getDataFromIndexDb() {
  const storedData = await db.data.get(1);
  return storedData || {}; // Return default value if no data found
}

// Function to store token
export async function storeTokenToIndexDb(data) {
  await db.tokens.put({ id: 1, token: data });
}

// Function to update token on beforeunload
export async function updateIndexDbToken(data) {
  await db.tokens.update(1, { token: data });
}

// Function to retrieve stored token
export async function getTokenFromIndexDb() {
  const storedData = await db.tokens.get(1);
  return storedData || {};
}

// Function to clear all data from the IndexedDB table
export async function clearIndexDb() {
  await db.data.clear();
  await db.tokens.clear();
}

// GET SCREEN
export const getScreen = (data) => {
  const screen = data?.data?.nextScreenPayload?.screen_kuid || "";
  return screen;
};
