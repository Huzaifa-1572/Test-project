import { Box } from "@mui/material";
import CustomButton from "src/Common/CustomButton";
import { CustomInputField, SelectField } from "src/Components/FormFields";
import ValidationError from "src/Components/ValidationError";
import WizardLayout from "src/Layout/WizardLayout";
import { OPERATOR_OPTION } from "src/Utils/Lovs";
import { TbDeviceMobile } from "react-icons/tb";
import Grid from "@mui/material/Grid";



const CustomerMobile = ({ control, errors }) => {

  return (
    <WizardLayout
      Icon={TbDeviceMobile}
      title={"Mobile Verification"}
      description={'Please enter your mobile number.'}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} lg={6}>
          <CustomInputField
            name={"customerMobile"}
            control={control}
            format={"####-#######"}
            label="Mobile Number"
            placeholder="03xx-xxxxxxx"
            inputMode="numeric"
          />
          {errors?.customerMobile ? (<ValidationError message={errors?.customerMobile?.message} />) : null}
        </Grid>

        <Grid item xs={12} lg={6}>
          <SelectField
            name={"customerOperator"}
            control={control}
            label={"Operator"}
            placeholder="Select Operator"
            options={OPERATOR_OPTION}
          />
          {errors?.customerOperator ? (<ValidationError message={errors?.customerOperator?.message} />) : null}
        </Grid>

        <Grid item xs={12} lg={6}>
          <CustomButton label={"Proceed"} />
        </Grid>
      </Grid>
    </WizardLayout >
  );
};

export default CustomerMobile;
