import Grid from "@mui/material/Grid";
import CNICICON from 'src/Assets/images/cnicIcon.png';
import CustomButton from "src/Common/CustomButton";
import { CaptchaField, CustomInputField, TextInputField } from "src/Components/FormFields";
import ValidationError from "src/Components/ValidationError";
import WizardLayout from "src/Layout/WizardLayout";
import CNIC_UNDRAW from "src/Assets/images/customerCnicUndraw.svg"
import { Box } from "@mui/material";

const CustomerCnic = ({ control, errors }) => {
  return (
    <WizardLayout
      Icon={CNICICON}
      title={"CNIC Verification"}
      description={"Please enter your CNIC to continue with your online onboarding."}
      heroImage={CNIC_UNDRAW}
    >

      <Grid container spacing={2}>

        <Grid item xs={12} lg={6}>
          <TextInputField
            name={"KEY_NAME"}
            control={control}
            label="Name As Per CNIC"
            input_type="text"
          />
          {errors?.KEY_NAME ? (<ValidationError message={errors?.KEY_NAME?.message} />) : null}
        </Grid>

        <Grid item xs={12} lg={6}>
          <CustomInputField
            name={"customerCnic"}
            control={control}
            format={"#####-#######-#"}
            label="Please Enter Your CNIC"
            placeholder="#####-########-#"
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

            {errors?.googleCaptcha ? (<ValidationError message={errors?.googleCaptcha?.message} />) : null}
          </Box>
        </Grid>

        <Grid item xs={12} lg={6}>
          <CustomButton label="Proceed" />
        </Grid>

      </Grid>

    </WizardLayout>
  );
};

export default CustomerCnic;