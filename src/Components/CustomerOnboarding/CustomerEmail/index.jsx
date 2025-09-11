import { Box, Grid } from "@mui/material";
import EMAIL_ICON from "src/Assets/Icons/emailIcon.png";
import CustomButton from "src/Common/CustomButton";
import { TextInputField } from "src/Components/FormFields";
import ValidationError from "src/Components/ValidationError";
import WizardLayout from "src/Layout/WizardLayout";
import EMAIL_UNDRAW from "src/Assets/images/emailUndraw.svg"
import EMAIL_UNDRAW_SM from "src/Assets/images/emailUndraw_sm.svg"
import { isSmallScreen } from "src/Utils/Helpers";
import { MdSkipNext } from "react-icons/md";



const CustomerEmail = ({ control, errors, setValue }) => {

  const handleContinue = () => {
    setValue("isValidEmail", true);
  };

  const handleSkip = () => {
    setValue("isValidEmail", false);
  };

  return (
    <WizardLayout
      Icon={EMAIL_ICON}
      title={"Email Verification"}
      description={'Please enter your email ID.'}
      heroImage={isSmallScreen() ? EMAIL_ICON : EMAIL_UNDRAW}
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
      {/* <CustomButton label={"Continue"} /> */}
      <Grid container sx={{ gap: "24px" }}>
        <Grid item xs={12} sm={4}>
          <CustomButton label="Continue" onClick={handleContinue} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <CustomButton label="Skip" onClick={handleSkip} Icon={<MdSkipNext />} />
        </Grid>
      </Grid>
    </WizardLayout>
  );
};

export default CustomerEmail;
