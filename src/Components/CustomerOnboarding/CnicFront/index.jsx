import { Box } from "@mui/material";
import CARD_ICON from 'src/Assets/images/cardIcon.png';
import CARD_UNDRAW from 'src/Assets/images/cardUndraw.svg';
import CustomButton from "src/Common/CustomButton";
import { FormBuilder } from "src/Components/FormBuilder";
import WizardLayout from "src/Layout/WizardLayout";
import { getScreenData } from "src/Utils/Helpers";


const CnicFront = ({ control, getValues, errors, setValue }) => {
  const { TITLE, DESCRIPTION, FIELDS } = getScreenData()

  return (
    <WizardLayout
      Icon={CARD_ICON}
      title={"Upload CNIC Front Image" || TITLE}
      description={"Kindly upload a clear image of the front side of your CNIC to proceed." || DESCRIPTION}
      heroImage={CARD_UNDRAW}
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

export default CnicFront;
