import React from "react";
import { Grid } from "@mui/material";
import CustomButton from "src/Common/CustomButton";
import { FormBuilder } from "src/Components/FormBuilder";
import { getScreenData } from "src/Utils/Helpers";
import WizardLayout from "src/Layout/WizardLayout";

const CnicDetail = ({
  control,
  errors,
  watch,
}) => {
  const { TITLE, DESCRIPTION, FIELDS } = getScreenData()

  return (
    <WizardLayout
      icon={"BiSolidUserDetail"}
      title={TITLE}
      description={DESCRIPTION}
    >
      <Grid container sx={{ gap: "24px" }}>
        {
          FIELDS?.map(field => (
            <Grid key={field?.kuid} item xs={12} md={6} lg={4}>
              <FormBuilder field={field} control={control} errors={errors} watch={watch} />
            </Grid>
          ))
        }
      </Grid>
      <CustomButton label={"Proceed"} />
    </WizardLayout>
  );
};

export default CnicDetail;
