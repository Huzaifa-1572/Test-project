import { Grid } from "@mui/material";
import ADDITIONAL_UNDRAW from "src/Assets/images/additionalUndraw.svg";
import ADDITIONAL_UNDRAW_SM from "src/Assets/images/additionalUndraw-sm.svg";
import ADDITIONAL_ICON from "src/Assets/images/additionalIcon.png";
import CustomButton from "src/Common/CustomButton";
import { FormBuilder } from "src/Components/FormBuilder";
import WizardLayout from "src/Layout/WizardLayout";
import { getScreenData, isSmallScreen } from "src/Utils/Helpers";



const AdditionalInformation = ({ control, errors }) => {
  const { TITLE, DESCRIPTION, FIELDS } = getScreenData()

  return (
    <WizardLayout
      Icon={ADDITIONAL_ICON}
      title={TITLE}
      description={DESCRIPTION}
      heroImage={isSmallScreen() ? ADDITIONAL_UNDRAW_SM : ADDITIONAL_UNDRAW}
    >
      <Grid container sx={{ gap: "24px" }}>
        {
          FIELDS?.map(field => (
            <Grid key={field?.kuid} item xs={12} lg={5}>
              <FormBuilder field={field} control={control} errors={errors} />
            </Grid>
          ))
        }
      </Grid>

      <CustomButton label={"Continue"} />
    </WizardLayout>
  );
};

export default AdditionalInformation;
