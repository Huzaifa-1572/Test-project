import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { showErrorModal } from "src/Redux/Reducers/ErrorState";
import { closeLoader } from "src/Redux/Reducers/LoaderState";

const POST_REQUEST = async ({ BODY, API_URL, HEADERS }) => {
    console.log("Request BODY:", BODY);
    return axios.post(API_URL, BODY, { headers: HEADERS });
};

const usePostDataToServer = ({ onPostReqSuccess, dispatch }) => {
    return useMutation({
        mutationFn: POST_REQUEST,
        onSuccess: (data) => {
            onPostReqSuccess(data);
        },
        onError: (error) => {
            console.error('error?.response', error?.response);
            const code = error?.response?.data?.code && `Error-${error?.response?.data?.code}` || "Error";
            const message = error?.response?.data?.message || "Something went wrong, try again later.";
            dispatch(showErrorModal({ errorCode: code, errorMessage: message, isError: true }));
        },
        onSettled: () => {
            // Optionally close a loader
            dispatch(closeLoader());
        },
    });
};

export default usePostDataToServer;
