import axios from "axios";
import { useMutation } from "react-query";
// import { showErrorModal } from "src/Reducers/errorState";
// import { closeLoader, showLoader } from "src/Reducers/loaderState";

const POST_REQUEST = ({ BODY, API_URL, HEADERS, dispatch }) => {
    console.log('BODYBODY', BODY)
    // dispatch(showLoader())
    return axios.post(`${API_URL}`, BODY, { headers: HEADERS })
}

const usePostDataToServer = ({ onPostReqSuccess, dispatch }) => {
    return useMutation(POST_REQUEST, {
        onSuccess: data => onPostReqSuccess(data),
        onError: error => {
            console.log(error)
            const code = error?.response?.data?.res?.['error-code'] || 'Error'
            const message = error?.response?.data?.res?.['error-message'] || 'Something went wrong, try again later.'
            // dispatch(showErrorModal({ errorCode: code, errorMessage: message, isError: true }))
        },
        onSettled: () => {
            // dispatch(closeLoader())
        },
    })
}
export default usePostDataToServer