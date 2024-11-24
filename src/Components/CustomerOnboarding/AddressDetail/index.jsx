import { Grid } from "@mui/material";
import { BiBuildingHouse } from "react-icons/bi";
import CustomButton from "src/Common/CustomButton";
import { FormBuilder } from "src/Components/FormBuilder";
import WizardLayout from "src/Layout/WizardLayout";
import { getScreenData } from "src/Utils/Helpers";


const AddressDetail = ({
  control,
  errors,
  watch
}) => {
  const { TITLE, DESCRIPTION, FIELDS } = getScreenData()

  return (
    <WizardLayout
      Icon={BiBuildingHouse}
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
