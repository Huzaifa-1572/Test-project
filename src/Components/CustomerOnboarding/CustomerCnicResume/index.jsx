import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import CNICICON from 'src/Assets/Icons/resumeIcon.png';
import CNIC_UNDRAW from "src/Assets/images/resumeUndraw.svg";
import CNIC_UNDRAW_SM from "src/Assets/images/resumeUndraw-sm.svg";
import CustomButton from "src/Common/CustomButton";
import Loader from "src/Common/Loader";
import { CaptchaField, CustomInputField } from "src/Components/FormFields";
import ValidationError from "src/Components/ValidationError";
import useGetGeoCoordinates from "src/Hooks/useGetGeoCoordinates";
import WizardLayout from "src/Layout/WizardLayout";
import { isSmallScreen } from "src/Utils/Helpers";

const CustomerCnicResume = ({ control, setValue, getValues, errors }) => {
    const { locationStatus, fetchLocation } = useGetGeoCoordinates({ setValue, getValues });


    const handleProceed = () => {
        const LOCATION = getValues("KEY_GEO_COORDINATES");
        if (!LOCATION) {
            fetchLocation();
            return;
        }
    }

    return (
        <>
            {locationStatus === "loading" && <Loader />}
            <WizardLayout
                Icon={CNICICON}
                title={"Resume Application"}
                description={"Enter your CNIC number to retrieve your application details and proceed from where you left."}
                heroImage={isSmallScreen() ? CNICICON : CNIC_UNDRAW}
            >
                <Grid container spacing={2}>

                    <Grid item xs={12} lg={6}>
                        <CustomInputField
                            name={"customerCnic"}
                            control={control}
                            format={"#####-#######-#"}
                            label="Please Enter Your CNIC"
                            placeholder="xxxxx-xxxxxxx-x"
                            inputMode="numeric"
                            type="tel"
                        />
                        {errors?.customerCnic ? (<ValidationError message={errors?.customerCnic?.message} />) : null}
                    </Grid>

                    <Grid item xs={12}>
                        <Box sx={{ display: 'flex', justifyContent: { xs: 'center', sm: 'flex-start' } }}>
                            <CaptchaField
                                name={'googleCaptcha'}
                                control={control}
                                siteKey={import.meta.env.VITE_REACT_APP_GOOGLE_CAPTCHA_KEY}
                            />
                        </Box>
                        <Box sx={{ color: 'white', padding: '5px', textAlign: { xs: 'center', sm: 'left' } }}>
                            {errors?.googleCaptcha ? (<ValidationError message={errors?.googleCaptcha?.message} />) : null}
                        </Box>

                    </Grid>


                    <Grid item xs={12} lg={6}>
                        <CustomButton label="Resume" onClick={handleProceed} />
                    </Grid>

                </Grid>
            </WizardLayout>
        </>
    );
};

export default CustomerCnicResume;