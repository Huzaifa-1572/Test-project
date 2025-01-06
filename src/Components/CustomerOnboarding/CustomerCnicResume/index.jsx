import Grid from "@mui/material/Grid";
import CNICICON from 'src/Assets/images/cnicIcon.png';
import CustomButton from "src/Common/CustomButton";
import { CaptchaField, CustomInputField } from "src/Components/FormFields";
import ValidationError from "src/Components/ValidationError";
import WizardLayout from "src/Layout/WizardLayout";
import CNIC_UNDRAW from "src/Assets/images/abcd.svg"
import useGetGeoCoordinates from "src/Hooks/useGetGeoCoordinates";
import Loader from "src/Common/Loader";

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
                title={"CNIC Verification"}
                description={"Please Enter your CNIC to continue with your online onboarding."}
                heroImage={CNIC_UNDRAW}
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
                        <CaptchaField
                            name={'googleCaptcha'}
                            control={control}
                            siteKey={import.meta.env.VITE_REACT_APP_GOOGLE_CAPTCHA_KEY}
                        />
                        {errors?.googleCaptcha ? (<ValidationError message={errors?.googleCaptcha?.message} />) : null}
                    </Grid>


                    <Grid item xs={12} lg={6}>
                        <CustomButton label="Proceed" onClick={handleProceed} />
                    </Grid>

                </Grid>

            </WizardLayout>
        </>
    );
};

export default CustomerCnicResume;