import { Box } from "@mui/material";
import CNICICON from 'src/Assets/images/cnicIcon.png';
import CustomButton from "src/Common/CustomButton";
import { CaptchaField, CustomInputField } from "src/Components/FormFields";
import ValidationError from "src/Components/ValidationError";
import WizardLayout from "src/Layout/WizardLayout";
import styles from "./index.module.scss";
import UNDRAW from 'src/Assets/images/cnicundraw.svg';
import TEST from 'src/Assets/images/test.svg';




const CustomerCnic = ({ control, errors }) => {
  return (
    <WizardLayout
      Icon={TEST}
      title={"CNIC Verification"}
      description={"Please enter your CNIC to start your online application."}
    >
      <Box sx={{ margin: "20px 0px" }}>
        <CustomInputField
          name={"customerCnic"}
          control={control}
          format={"#####-#######-#"}
          label="CNIC"
          placeholder="xxxxx-xxxxxxx-x"
          inputMode="numeric"
          autoFocus={true}
        />
        {errors?.customerCnic ? (<ValidationError message={errors?.customerCnic?.message} />) : null}
      </Box>

      <CustomButton label="verify" />

      <Box className={styles.robotStyles}>
        <Box sx={{ width: "100%", maxWidth: "400px" }}>
          <CaptchaField
            name={'googleCaptcha'}
            control={control}
            siteKey={import.meta.env.VITE_REACT_APP_GOOGLE_CAPTCHA_KEY}
          />
          {errors?.googleCaptcha ? (<ValidationError message={errors?.googleCaptcha?.message} />) : null}
        </Box>
      </Box>
    </WizardLayout>
  );
};

export default CustomerCnic;