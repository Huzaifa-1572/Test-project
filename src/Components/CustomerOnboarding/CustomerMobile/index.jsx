import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { CustomInputField, SelectField } from "src/Components/FormFields";
import ValidationError from "src/Components/ValidationError";
import { retrieveMobileNumber } from "src/Utils/Helpers";
import { OPERATOR_OPTION } from "src/Utils/Constants";
import CustomButton from "src/Common/CustomButton";
import WizardLayout from "src/Layout/WizardLayout";

const CustomerMobile = ({
  control,
  errors,
  watch,
}) => {
  const currentMobileValue = watch("customerMobile");
  const [isValidNumber, setIsValidNumber] = useState(false);

  useEffect(() => {
    const number = retrieveMobileNumber(currentMobileValue);
    const isValid = number.length === 11 && number.startsWith("03");
    setIsValidNumber(isValid);
  }, [currentMobileValue]);

  return (
    <WizardLayout
      icon={'TbDeviceMobile'}
      title={"Mobile Verification"}
      description={'Please enter your mobile number.'}
    >
      {/* TEXT */}
      <Box sx={{ margin: "15px 0px" }}>
        {/* PHONE INPUT */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: { xs: "center", sm: "start" },
            gap: "20px",
            margin: "20px 0px",
          }}
        >
          <CustomInputField
            name={"customerMobile"}
            control={control}
            format={"####-#######"}
            label="Mobile Number"
            placeholder="03xx-xxxxxxx"
            inputMode="numeric"
          />
          {errors?.customerMobile ? (
            <ValidationError message={errors?.customerMobile?.message} />
          ) : null}

          <SelectField
            name={"customerOperator"}
            control={control}
            label={"Operator"}
            placeholder="Select Operator"
            options={OPERATOR_OPTION}
          />
          {errors?.customerOperator ? (
            <ValidationError message={errors?.customerOperator?.message} />
          ) : null}
        </Box>
      </Box>

      <CustomButton
        disabled={!isValidNumber}
        label={"Proceed"}
      />
    </WizardLayout>
  );
};

export default CustomerMobile;
