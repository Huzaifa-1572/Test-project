import { Grid } from "@mui/material";
import React from "react";
import WizardLayout from "src/Layout/WizardLayout";
import CustomButton from "src/Common/CustomButton";
import { getScreenData } from "src/Utils/Helpers";
import { FormBuilder } from "src/Components/FormBuilder";
import { LIST_OF_CITIES, LIST_OF_PROVINCES } from "src/Utils/Constants";

const AddressDetail = ({
  control,
  errors,
  watch
}) => {
  const { TITLE, DESCRIPTION, FIELDS } = getScreenData()

  return (
    <WizardLayout
      icon={"BiBuildingHouse"}
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

export default AddressDetail;
