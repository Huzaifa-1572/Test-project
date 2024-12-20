import Axios from "axios";
import Dexie from "dexie";
import { v4 as uuidv4 } from "uuid";
import DOMPurify from 'dompurify';
import { useSelector } from "react-redux";
import { LIST_OF_POB, LIST_OF_PROVINCES } from "../Lovs";
import dayjs from "dayjs";
import { OPERATOR_MAP } from "../Constants";

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

export function formatMobileNumber(mobileNum) {
  mobileNum = mobileNum.replace(/[-\s]/g, '');
  if (mobileNum.length === 11) {
    return mobileNum.slice(0, 4) + '-' + mobileNum.slice(4, 11);
  }
  return mobileNum
}

export const retrieveMobileNumber = (mobileNum) => {
  return mobileNum.replace(/[-_]/g, "");
};

export function formatCNIC(cnic) {
  cnic = cnic.replace(/[-\s]/g, '');
  return cnic.slice(0, 5) + '-' + cnic.slice(5, 12) + '-' + cnic.slice(12);
}

export function retrieveCNIC(cnic) {
  return cnic.replace(/[-\s]/g, "");
}

export function retrieveDate(date) {
  return dayjs(date).format("YYYY-MM-DD")
}

export function getCurrentDate(){
  return dayjs().format("YYYY-MM-DD HH:mm:ss.SSS");
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

// UUID
export const getUUID = () => {
  return uuidv4();
};

// FOR PREVENTING XSS ATTACKS
export const sanitizer = (htmlElement) => {
  return DOMPurify.sanitize(htmlElement)
}

// GET SCREEN
export const getScreen = (data) => {
  const screen = data?.nextScreenPayload?.screen_kuid || "No Screen Found";
  return screen;
};

// GET PREV SCREEN
export const getPrevScreen = (data) => {
  const screen = data?.prev_screen_kuid || "No Previous Screen Found";
  return screen;
}

// GET SCREEN DATA FOR DASHBOARD
export const getScreenData = () => {
  const SCREEN_DATA = useSelector((state) => state.screenDataState);
  const [{ title, description, fields }] = SCREEN_DATA?.content_group || [{}];

  return {
    TITLE: title || "",
    DESCRIPTION: description || "",
    FIELDS: fields || [],
  };
};

export const getProvince = (value) => {
  const province = LIST_OF_PROVINCES.find((province) => province?.value == value)
  return province?.label || 'N/A'
}

export const getCity = (value) => {
  const city = LIST_OF_POB.find((city) => city?.value == value)
  return city?.label || 'N/A'
}

export const getReviewApplicationData = () => {
  const SCREEN_DATA = useSelector((state) => state.screenDataState);
  const { title, description, discrepantMessage, sections } = SCREEN_DATA
  return {
    TITLE: title || "",
    DESCRIPTION: description || "",
    DISCREPANT_MESSAGE: discrepantMessage || "",
    SECTIONS: sections || [],
  };
};

// FOR REVIEW PAGE
export const generateFieldValue = (field) => {
  if (field['value-type'] === 'cnic') {
    return `${field?.value?.slice(0, 5)}-${field?.value?.slice(5, 12)}-${field?.value?.slice(12)}`
  }
  else if (field['value-type'] === 'date') {
    return field?.value?.split?.('T')?.[0] || 'N/A'
  }
  else if (field["kuid"] === "KEY_PROVINCE") {
    return getProvince(field?.value)
  }
  else if (field["kuid"] === "KEY_PLACE_OF_BIRTH" || field["kuid"] === "KEY_CITY_CODE") {
    return getCity(field?.value)
  }
  else if (field["kuid"] === "KEY_CNIC_LIFETIME"){
    return field?.value === 'true' ? 'Yes' : 'No'
  } else if (field["kuid"] === "KEY_MOBILE_OPERATOR"){
    return OPERATOR_MAP[field?.value] || field?.value 
  }
  else {
    return field?.value || 'N/A'
  }
}

export const clearAppData = () => {
  localStorage.clear();
  clearIndexDb();
};

// INDEX DB SETUP
const db = new Dexie("store");
db.version(1).stores({
  data: "id, appData",
});

// Function to store initial data
export async function storeDataToIndexDb(data) {
  await db.data.put({ id: 1, appData: data });
}

// Function to update data on beforeunload
export async function updateIndexDbData(data) {
  await db.data.update(1, { appData: data });
}

// Function to retrieve stored data
export async function getDataFromIndexDb() {
  const storedData = await db.data.get(1);
  return storedData;
}

// Function to clear all data from the IndexedDB table
export async function clearIndexDb() {
  await db.data.clear();
}
