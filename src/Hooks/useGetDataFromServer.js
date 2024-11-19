import axios from "axios"
import { useQuery } from "react-query"
// import { closeLoader, showLoader } from "src/Reducers/loaderState";


const GET_REQUEST = ({ API_URL, HEADERS, dispatch }) => {
    dispatch(showLoader())
    return axios.get(`${API_URL}`, { headers: HEADERS })
}

const useGetDataFromServer = ({ API_URL, HEADERS, QUERY_NAME, QUERY_ID, onGetReqSuccess, dispatch, configOptions }) => {
    return useQuery(QUERY_ID ? [QUERY_NAME, QUERY_ID] : QUERY_NAME, () => GET_REQUEST({ API_URL, HEADERS }), {
        ...(onGetReqSuccess) && { onSuccess: (data) => onGetReqSuccess(data) },
        onError: error => {
            console.log(error)
            const code = error?.response?.data?.res?.['error-code'] || 'Error'
            const message = error?.response?.data?.res?.['error-message'] || 'Something went wrong, try again later.'
            // dispatch(showErrorModal({ errorCode: code, errorMessage: message, isError: true }))
        },
        onSettled: () => {
            // dispatch(closeLoader())
        },
        select: ({ data }) => structureApiData ? structureApiData(data) : data,
        ...configOptions
    })
}

export default useGetDataFromServer