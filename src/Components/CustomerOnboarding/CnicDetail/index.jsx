import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import CustomButton from "src/Common/CustomButton";
import { FormBuilder } from "src/Components/FormBuilder";
import { getScreenData } from "src/Utils/Helpers";
import WizardLayout from "src/Layout/WizardLayout";
import { BiSolidUserDetail } from "react-icons/bi";


const CnicDetail = ({
  control,
  setValue,
  errors,
  watch,
}) => {
  const { TITLE, DESCRIPTION, FIELDS } = getScreenData()
  const CNIC_LIFE_TIME = watch("KEY_CNIC_LIFETIME");
  const EXPIRY_DATE = watch("KEY_CNIC_EXPIRY_DATE");

  // Watch for changes to KEY_CNIC_LIFETIME and KEY_CNIC_EXPIRY_DATE
  useEffect(() => {
    if (EXPIRY_DATE && CNIC_LIFE_TIME) {
      setValue("KEY_CNIC_EXPIRY_DATE", null);
    }
  }, [CNIC_LIFE_TIME, EXPIRY_DATE]);

  // Function to check field should be disabled
  const getFieldDisabled = (fieldKuid) => {
    const EXPIRY_DATE = fieldKuid === "KEY_CNIC_EXPIRY_DATE";
    return (EXPIRY_DATE && CNIC_LIFE_TIME);
  };

  return (
    <WizardLayout
      Icon={BiSolidUserDetail}
      title={TITLE}
      description={DESCRIPTION}
    >
      <Grid container sx={{ gap: "24px" }}>
        {
          FIELDS?.map(field => (
            <Grid key={field?.kuid} item xs={12} md={6} lg={4}>
              <FormBuilder field={field} control={control} errors={errors} watch={watch} disabled={getFieldDisabled(field?.kuid)} />
            </Grid>
          ))
        }
      </Grid>
      <CustomButton label={"Proceed"} />
    </WizardLayout>
  );
};

export default CnicDetail;
