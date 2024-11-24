import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { showErrorModal } from "src/Redux/Reducers/ErrorState";
import { closeLoader, showLoader } from "src/Redux/Reducers/LoaderState";
import { clearIndexDb } from "src/Utils/Helpers";

const POST_REQUEST = async ({ BODY, API_URL, HEADERS, dispatch }) => {
  dispatch(showLoader());
  return axios.post(API_URL, BODY, { headers: HEADERS });
};

const usePostDataToServer = ({ onPostReqSuccess, dispatch }) => {
  return useMutation({
    mutationFn: (variables) => POST_REQUEST({ ...variables, dispatch }),
    onSuccess: (data) => {
      onPostReqSuccess(data);
    },
    onError: (error) => {
      let code = ''
      let message = ''
      if (error?.status === 403) {
        code = "Access Denied-403";
        message = "Your session has expired due to inactivity.You do not have permission to access this resource."
        localStorage.clear();
        clearIndexDb();
      }
      else {
        code = (error?.response?.data?.code && `Error-${error?.response?.data?.code}`) || "Error";
        message = error?.response?.data?.message || "Something went wrong, try again later.";
      }

      dispatch(showErrorModal({ errorCode: code, errorMessage: message, isError: true })
      );
    },
    onSettled: () => {
      dispatch(closeLoader());
    },
  });
};

export default usePostDataToServer;