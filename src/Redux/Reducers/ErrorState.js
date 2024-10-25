import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    errorBody: '',
    showErrorModal: false
}

export const ERROR_STATE = createSlice({
    name: 'ERROR_STATE',
    initialState,
    reducers: {
        showErrorModal: (state, action) => {
            return action.payload
        },
        closeErrorModal: (state, action) => {
            return action.payload
        },
    }
})

// Action creators are generated for each case reducer function
export const { showErrorModal, closeErrorModal } = ERROR_STATE.actions

export default ERROR_STATE.reducer