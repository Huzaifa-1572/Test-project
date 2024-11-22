import { Grid } from "@mui/material";
import CustomButton from "src/Common/CustomButton";
import { FormBuilder } from "src/Components/FormBuilder";
import WizardLayout from "src/Layout/WizardLayout";
import { getScreenData } from "src/Utils/Helpers";

const AdditionalInformation = ({
  control,
  errors,
}) => {
  const { TITLE, DESCRIPTION, FIELDS } = getScreenData()

  return (
    <WizardLayout
      icon={"IoMdInformationCircleOutline"}
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

export default AdditionalInformation;
