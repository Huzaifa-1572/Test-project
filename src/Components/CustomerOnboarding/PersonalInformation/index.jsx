import React from "react";
import { Grid } from "@mui/material";
import WizardLayout from "src/Layout/WizardLayout";
import CustomButton from "src/Common/CustomButton";
import { getScreenData } from "src/Utils/Helpers";
import { FormBuilder } from "src/Components/FormBuilder";
import { FaUser } from "react-icons/fa";


const PersonalInformation = ({ control, errors }) => {
  const { TITLE, DESCRIPTION, FIELDS } = getScreenData()

  return (
    <WizardLayout
      Icon={FaUser}
      title={TITLE}
      description={DESCRIPTION}
    >
      <Grid container sx={{ gap: "24px" }}>
        {
          FIELDS?.map(field => (
            <Grid key={field?.kuid} item xs={12} md={6} lg={4}>
              <FormBuilder field={field} control={control} errors={errors} />
            </Grid>
          ))
        }
      </Grid>

      <CustomButton label={"Proceed"} />
    </WizardLayout>
  );
};

export default PersonalInformation;
