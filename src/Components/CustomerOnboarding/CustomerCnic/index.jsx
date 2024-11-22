import { Box } from "@mui/material";
import CustomButton from "src/Common/CustomButton";
import { CaptchaField, CustomInputField } from "src/Components/FormFields";
import ValidationError from "src/Components/ValidationError";
import WizardLayout from "src/Layout/WizardLayout";
import styles from "./index.module.scss";
import { MdCreditCard } from "react-icons/md";


const CustomerCnic = ({ control, errors }) => {
  return (
    <WizardLayout
      Icon={MdCreditCard}
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