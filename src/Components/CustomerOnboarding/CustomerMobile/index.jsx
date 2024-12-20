import { Box } from "@mui/material";
import CustomButton from "src/Common/CustomButton";
import { CustomInputField, SelectField } from "src/Components/FormFields";
import ValidationError from "src/Components/ValidationError";
import WizardLayout from "src/Layout/WizardLayout";
import { OPERATOR_OPTION } from "src/Utils/Lovs";
import { TbDeviceMobile } from "react-icons/tb";


const CustomerMobile = ({ control, errors }) => {

  return (
    <WizardLayout
      Icon={TbDeviceMobile}
      title={"Mobile Verification"}
      description={'Please enter your mobile number.'}
    >
      <Box sx={{ margin: "15px 0px" }}>
        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: { xs: "center", sm: "start" }, gap: "20px", margin: "20px 0px" }}>
          <CustomInputField
            name={"customerMobile"}
            control={control}
            format={"####-#######"}
            label="Mobile Number"
            placeholder="03xx-xxxxxxx"
            inputMode="numeric"
          />
          {errors?.customerMobile ? (<ValidationError message={errors?.customerMobile?.message} />) : null}

          <SelectField
            name={"customerOperator"}
            control={control}
            label={"Operator"}
            placeholder="Select Operator"
            options={OPERATOR_OPTION}
          />
          {errors?.customerOperator ? (<ValidationError message={errors?.customerOperator?.message} />) : null}
        </Box>
      </Box>

      <CustomButton label={"Proceed"} />

    </WizardLayout>
  );
};

export default CustomerMobile;
