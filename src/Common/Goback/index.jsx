import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { GO_BACK_HANDLER } from "src/Utils/CommonFunctions/COFormSubmission";
import { useDispatch, useSelector } from "react-redux";
import usePostDataToServer from "src/Hooks/usePostdataToServer";
import postRequestSuccess from "src/Utils/CommonFunctions/postRequestSuccess";
import { IoChevronBack } from "react-icons/io5";
import { updateCurrentScreen } from "src/Redux/Reducers/CurrentScreenState";

const GoBack = ({ setValue, getValues }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const PREV_SCREEN = useSelector((state) => state?.prevScreenState);
    const CURRENT_SCREEN = useSelector((state) => state?.currentScreenState);

    const { mutate } = usePostDataToServer({ onPostReqSuccess: onSuccessfullSubmission, dispatch });

    const handleBack = () => {
        if (CURRENT_SCREEN === 'scr_deviceLocation' || CURRENT_SCREEN === 'scr_customerCnicResume') {
            navigate('/')
            return
        }

        if (CURRENT_SCREEN === 'scr_customerCnic') {
            const NEXT_SCREEN = "scr_deviceLocation";
            dispatch(updateCurrentScreen(NEXT_SCREEN));
            return
        }

        const customerCnic = getValues('customerCnic')
        const { BODY, API_URL } = GO_BACK_HANDLER({ PREV_SCREEN, customerCnic, dispatch });
        mutate({ BODY, API_URL, dispatch });
    };

    function onSuccessfullSubmission(response) {
        postRequestSuccess({ response, dispatch, navigate, setValue });
    }

    return (
        <Button
            size="large"
            variant="contained"
            onClick={handleBack}
            sx={{ fontSize: "14px", height: "44px", backgroundColor: "#407ec9", letterSpacing: '1px' }}
            startIcon={<IoChevronBack />}
        >
            Back
        </Button>
    );
};

export default GoBack;
