import { Box } from "@mui/material";
import { useMemo } from "react";
import CARD_ICON from 'src/Assets/Icons/customerCnicIcon.png';
import CARD_UNDRAW from 'src/Assets/images/cardUndraw.svg';
import CARD_UNDRAW_SM from 'src/Assets/images/cardUndraw_sm.svg';
import CustomButton from "src/Common/CustomButton";
import Guidelines from "src/Common/Guidelines";
import { CNIC_UPLOAD_GUIDELINES } from "src/Common/Guidelines/guideline";
import { FormBuilder } from "src/Components/FormBuilder";
import WizardLayout from "src/Layout/WizardLayout";
import { getScreenData, isSmallScreen } from "src/Utils/Helpers";


const CnicFrontForWeb = ({ control, getValues, errors, setValue }) => {
  const { TITLE, DESCRIPTION, FIELDS } = getScreenData()
  const guidelinePoints = useMemo(() => CNIC_UPLOAD_GUIDELINES, [])


  return (
    <WizardLayout
      Icon={CARD_ICON}
      title={"Upload CNIC Front" || TITLE}
      description={"Upload a clear image of the front of your CNIC to proceed" || DESCRIPTION}
      heroImage={isSmallScreen() ? CARD_ICON : CARD_UNDRAW}
    >
      {
        FIELDS?.map(field => (
          <Box key={field?.kuid} sx={{ maxWidth: "500px", width: "100%" }}>
            <FormBuilder field={field} control={control} errors={errors} setValue={setValue} getValues={getValues} />
          </Box>
        ))
      }

      <Guidelines guidelinePoints={guidelinePoints} />

      <CustomButton label={"Proceed"} />
    </WizardLayout>
  );
};

export default CnicFrontForWeb;
