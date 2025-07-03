import React from "react";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { GO_BACK_HANDLER } from "src/Utils/CommonFunctions/COFormSubmission";
import { useDispatch, useSelector } from "react-redux";
import usePostDataToServer from "src/Hooks/usePostdataToServer";
import postRequestSuccess from "src/Utils/CommonFunctions/postRequestSuccess";
import { IoChevronBack } from "react-icons/io5";
import { updateCurrentScreen } from "src/Redux/Reducers/CurrentScreenState";
import { IoMdArrowRoundBack } from "react-icons/io";
import { isWebview, redirectToMobileApp } from "src/Utils/Helpers";


const GoBack = ({ setValue, getValues }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const PREV_SCREEN = useSelector((state) => state?.prevScreenState);
    const CURRENT_SCREEN = useSelector((state) => state?.currentScreenState);


    const { mutate } = usePostDataToServer({ onPostReqSuccess: onSuccessfullSubmission, dispatch });

    const handleBack = () => {
        if (isWebview() && window.location.pathname === '/') {
            redirectToMobileApp();
            return;
        }
        if (CURRENT_SCREEN === 'scr_deviceLocation' || CURRENT_SCREEN === 'scr_customerCnicResume') {
            navigate('/')
            return
        }

        if (CURRENT_SCREEN === 'scr_customerCnic') {
            const NEXT_SCREEN = "scr_deviceLocation";
            dispatch(updateCurrentScreen(NEXT_SCREEN));
            return
        }
        // wanted to show different loader for cnic back screen proceed because OCR takes time
        // but on go back it was also showing the same loader to tackle this we are setting a flag in local storage
        if (CURRENT_SCREEN === 'scr_uploadCnicBack') {
            localStorage.setItem('GOING_BACK_FROM_CNIC_BACK', true);
        }
        const customerCnic = getValues('customerCnic')
        const { BODY, API_URL } = GO_BACK_HANDLER({ PREV_SCREEN, customerCnic, dispatch });
        mutate({ BODY, API_URL, dispatch });
    };

    function onSuccessfullSubmission(response) {
        postRequestSuccess({ response, dispatch, navigate, setValue });
    }

    return (
        <>
            {/* FOR LARGER SCREEN */}
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                <Button
                    size="large"
                    variant="contained"
                    onClick={handleBack}
                    sx={{ fontSize: "14px", height: "44px", backgroundColor: "#407ec9", letterSpacing: '1px' }}
                    startIcon={<IoChevronBack />}
                >
                    Back
                </Button>
            </Box>

            {/* FOR SMALLER SCREENS */}
            <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                <IoMdArrowRoundBack
                    style={{ cursor: 'pointer' }}
                    onClick={handleBack}
                    size={'35px'}
                    color='black'
                />
            </Box>
        </>
    );
};

export default GoBack;
