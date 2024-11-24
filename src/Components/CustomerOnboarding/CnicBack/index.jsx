import { Box } from "@mui/material";
import React from "react";
import CustomButton from "src/Common/CustomButton";
import WizardLayout from "src/Layout/WizardLayout";
import { getScreenData } from "src/Utils/Helpers";
import { FormBuilder } from "src/Components/FormBuilder";
import { BiBuildingHouse } from "react-icons/bi";


const CnicBack = ({
  control,
  getValues,
  errors,
  setValue,
}) => {
  const { TITLE, DESCRIPTION, FIELDS } = getScreenData()

  return (
    <WizardLayout
      Icon={BiBuildingHouse}
      title={TITLE}
      description={DESCRIPTION}
    >
      {
        FIELDS?.map(field => (
          <Box key={field?.kuid} sx={{ maxWidth: "500px", width: "100%" }}>
            <FormBuilder field={field} control={control} errors={errors} setValue={setValue} getValues={getValues} />
          </Box>
        ))
      }
      <CustomButton label={"Proceed"} />
    </WizardLayout>
  );
};

export default CnicBack;
