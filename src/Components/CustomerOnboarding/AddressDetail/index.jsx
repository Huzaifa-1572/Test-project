import { Grid } from "@mui/material";
import ADDRESS_DETAIL_UNDRAW from "src/Assets/images/addressDetailUndraw.svg";
import LOCATION_ICON from "src/Assets/images/locationIcon.png";
import CustomButton from "src/Common/CustomButton";
import { FormBuilder } from "src/Components/FormBuilder";
import WizardLayout from "src/Layout/WizardLayout";
import { getScreenData } from "src/Utils/Helpers";


const AddressDetail = ({ control, errors, watch }) => {
  const { TITLE, DESCRIPTION, FIELDS } = getScreenData()

  return (
    <WizardLayout
      Icon={LOCATION_ICON}
      title={TITLE}
      description={DESCRIPTION}
      heroImage={ADDRESS_DETAIL_UNDRAW}
    >
      <Grid container spacing={2}>
        {
          FIELDS?.map(field => {
            return (
              <Grid key={field?.kuid} item xs={12} lg={field?.kuid === 'KEY_ADDRESS_LINE_1' ? 12 : 4}>
                <FormBuilder field={field} control={control} errors={errors} watch={watch} />
              </Grid>
            )

          })
        }
      </Grid>
      <CustomButton label={"Proceed"} />
    </WizardLayout>
  );
};

export default AddressDetail;
