import { Box } from "@mui/material";
import React from "react";
import { TextInputField } from "src/Components/FormFields";
import ValidationError from "src/Components/ValidationError";
import WizardLayout from "src/Layout/WizardLayout";
import CustomButton from "src/Common/CustomButton";

const CustomerEmail = ({
  control,
  errors,
}) => {
  return (
    <WizardLayout
      icon={'MdOutlineMail'}
      title={"Email Verification"}
      description={'Please enter Your email address.'}
    >
      <Box sx={{ marginTop: "20px 0px" }}>
        <TextInputField
          name={"customerEmail"}
          control={control}
          label="Email Address"
          placeholder="abc@gmail.com"
          type="mail"
        />
        {errors?.customerEmail ? (
          <ValidationError message={errors?.customerEmail?.message} />
        ) : null}
      </Box>

      <CustomButton
        label={"Verify Email"}
      />
    </WizardLayout>
  );
};

export default CustomerEmail;
