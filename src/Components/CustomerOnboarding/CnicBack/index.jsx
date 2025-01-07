import { Box } from "@mui/material";
import CARD_ICON from 'src/Assets/images/cardIcon.png';
import CARD_UNDRAW from 'src/Assets/images/cardUndraw.svg';
import CustomButton from "src/Common/CustomButton";
import { FormBuilder } from "src/Components/FormBuilder";
import WizardLayout from "src/Layout/WizardLayout";
import { getScreenData } from "src/Utils/Helpers";


const CnicBack = ({ control, getValues, errors, setValue }) => {
  const { TITLE, DESCRIPTION, FIELDS } = getScreenData()

  return (
    <WizardLayout
      Icon={CARD_ICON}
      title={TITLE}
      description={DESCRIPTION}
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

export default CnicBack;
