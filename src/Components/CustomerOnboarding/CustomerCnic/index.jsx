import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import CNICICON from 'src/Assets/Icons/PersonalInfo.png';
import CNIC_UNDRAW from "src/Assets/images/customerCnicUndraw.svg";
import CustomButton from "src/Common/CustomButton";
import { CaptchaField, CustomInputField, NumberInputField, TextInputField } from "src/Components/FormFields";
import ValidationError from "src/Components/ValidationError";
import WizardLayout from "src/Layout/WizardLayout";
import { isSmallScreen } from "src/Utils/Helpers";

const CustomerCnic = ({ control, errors }) => {

  return (
    <WizardLayout
      Icon={CNICICON}
      title={"Personal Information"}
      // description={"Please enter your CNIC to continue with your online onboarding."}
      heroImage={isSmallScreen() ? CNICICON : CNIC_UNDRAW}
    >

      <Grid container spacing={2}>

        <Grid item xs={12} lg={6}>
          <TextInputField
            name={"KEY_NAME"}
            control={control}
            label="Please enter your name as per CNIC"
            input_type="text"
          />
          {errors?.KEY_NAME ? (<ValidationError message={errors?.KEY_NAME?.message} />) : null}
        </Grid>

        <Grid item xs={12} lg={6}>
          <CustomInputField
            name={"customerCnic"}
            control={control}
            format={"#####-#######-#"}
            label="Please enter your CNIC Number"
            placeholder="xxxxx-xxxxxxx-x"
            inputMode="numeric"
            type="tel"
          />
          {errors?.customerCnic ? (<ValidationError message={errors?.customerCnic?.message} />) : null}
        </Grid>

        <Grid item xs={12} lg={6}>
          <NumberInputField
            name={"referrerReferralCode"}
            control={control}
            label={"Enter your referral code (optional)"}
            maxLength={6}
            inputMode="numeric"
            type="tel"
            placeholder={"if you have been referred by someone."}
          />
          {errors?.referrerReferralCode ? (<ValidationError message={errors?.referrerReferralCode?.message} />) : null}
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: { xs: 'center', sm: 'flex-start' } }}>
            <CaptchaField
              name={'googleCaptcha'}
              control={control}
              siteKey={import.meta.env.VITE_REACT_APP_GOOGLE_CAPTCHA_KEY}
            />
          </Box>
          <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
            {errors?.googleCaptcha ? (<ValidationError message={errors?.googleCaptcha?.message} />) : null}
          </Box>
        </Grid>

        <Grid item xs={12} lg={6}>
          <CustomButton label="Continue" />
        </Grid>

      </Grid>

    </WizardLayout>
  );
};

export default CustomerCnic;