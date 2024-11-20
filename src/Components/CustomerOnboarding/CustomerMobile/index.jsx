import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { CustomInputField, SelectField } from "src/Components/FormFields";
import ValidationError from "src/Components/ValidationError";
import { retrieveMobileNumber, storeTokenToIndexDb, updateIndexDbData } from "src/Utils/Helpers";
import { useDispatch } from "react-redux";
import { OPERATOR_OPTION } from "src/Utils/Constants";
import usePostDataToServer from "src/Hooks/usePostdataToServer";
import CustomButton from "src/Common/CustomButton";

const CustomerMobile = ({
  control,
  errors,
  watch,
}) => {
  const dispatch = useDispatch();
  const [isValidNumber, setIsValidNumber] = useState(false);
  const currentMobileValue = watch("customerMobile");

  const { mutate: handleCustomerMobile } = usePostDataToServer({ onPostReqSuccess: onSuccessfullCustomerMobile, dispatch });

  useEffect(() => {
    const number = retrieveMobileNumber(currentMobileValue);
    const isValid = number.length === 11 && number.startsWith("03");
    setIsValidNumber(isValid);
  }, [currentMobileValue]);

  const handleProceedButton = (e) => {
    e.preventDefault();
    const API_URL = "http://192.168.20.101:8080/api/dao/v1/otp/sendsms";
    const BODY = {
      mobileNumber: "03459872345",
      isResumeApplication: false,
      custIdentityKey: "011",
      custIdentityValue: "1398765412345",
      channelCode: "09",
    };

    handleCustomerMobile({ BODY, API_URL });
  };

  async function onSuccessfullCustomerMobile(response) {
    console.log('jhbchjsdbhcjd', response.data.data.token);
    await updateIndexDbData('scr_mobileVerification')
    localStorage.setItem('tokenMobile',response?.data?.data?.token)
    // await storeTokenToIndexDb(response?.data?.data?.token);
    location.reload();
  }

  return (
    <CustomerOnboardingLayout
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
        onClick={handleProceedButton}
        disabled={!isValidNumber}
        label={"Proceed"}
      />
    </CustomerOnboardingLayout>
  );
};

export default CustomerMobile;
