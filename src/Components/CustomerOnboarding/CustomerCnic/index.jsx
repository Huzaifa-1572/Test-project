import Grid from "@mui/material/Grid";
import CNICICON from 'src/Assets/images/cnicIcon.png';
import CustomButton from "src/Common/CustomButton";
import { CaptchaField, CustomInputField } from "src/Components/FormFields";
import ValidationError from "src/Components/ValidationError";
import WizardLayout from "src/Layout/WizardLayout";

const CustomerCnic = ({ control, errors }) => {
  return (
    <WizardLayout
      Icon={CNICICON}
      title={"CNIC Verification"}
      description={"Please Enter Your CNIC To Start Your Online Application"}
    >

      <Grid container spacing={2}>

        <Grid item xs={12}>
          <CaptchaField
            name={'googleCaptcha'}
            control={control}
            siteKey={import.meta.env.VITE_REACT_APP_GOOGLE_CAPTCHA_KEY}
          />
          {errors?.googleCaptcha ? (<ValidationError message={errors?.googleCaptcha?.message} />) : null}
        </Grid>

        <Grid item xs={12} lg={6}>
          <CustomInputField
            name={"customerCnic"}
            control={control}
            format={"#####-#######-#"}
            label="Please Enter Your CNIC #"
            placeholder="xxxxx-xxxxxxx-x"
            inputMode="numeric"
            autoFocus={true}
            type="tel"
          />
          {errors?.customerCnic ? (<ValidationError message={errors?.customerCnic?.message} />) : null}
        </Grid>

        <Grid item xs={12} lg={6}>
          <CustomInputField
            name={"customerCnic"}
            control={control}
            format={"#####-#######-#"}
            label="Name As Per CNIC"
            placeholder="xxxxx-xxxxxxx-x"
            inputMode="numeric"
            autoFocus={true}
          />
          {errors?.customerCnic ? (<ValidationError message={errors?.customerCnic?.message} />) : null}
        </Grid>


        <Grid item xs={12} lg={6}>
          <CustomButton label="Proceed" />
        </Grid>

      </Grid>

    </WizardLayout>
  );
};

export default CustomerCnic;