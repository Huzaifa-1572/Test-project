import { Box } from "@mui/material";
import EMAIL_ICON from "src/Assets/images/emailIcon.png";
import CustomButton from "src/Common/CustomButton";
import { TextInputField } from "src/Components/FormFields";
import ValidationError from "src/Components/ValidationError";
import WizardLayout from "src/Layout/WizardLayout";
import EMAIL_UNDRAW from "src/Assets/images/emailUndraw.svg"


const CustomerEmail = ({ control, errors }) => {
  return (
    <WizardLayout
      Icon={EMAIL_ICON}
      title={"Email Verification"}
      description={'Kindly provide a valid email address to proceed further.'}
      heroImage={EMAIL_UNDRAW}
    >
      <Box>
        <TextInputField
          name={"customerEmail"}
          control={control}
          label="Email Address"
          placeholder="abc@gmail.com"
          type="mail"
          maxLength={50}
        />
        {errors?.customerEmail ? (<ValidationError message={errors?.customerEmail?.message} />) : null}
      </Box>

      <CustomButton label={"Continue"} />
    </WizardLayout>
  );
};

export default CustomerEmail;
