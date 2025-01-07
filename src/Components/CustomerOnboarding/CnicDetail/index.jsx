import { Grid } from "@mui/material";
import dayjs from "dayjs";
import { useEffect } from "react";
import CARD_ICON from 'src/Assets/images/cardIcon.png';
import CNIC_DETAIL_UNDRAW from 'src/Assets/images/cnicDetailUndraw.svg';
import CustomButton from "src/Common/CustomButton";
import { FormBuilder } from "src/Components/FormBuilder";
import WizardLayout from "src/Layout/WizardLayout";
import { getScreenData } from "src/Utils/Helpers";


const CnicDetail = ({ control, setValue, errors, watch }) => {
  const { TITLE, DESCRIPTION, FIELDS } = getScreenData()
  const CNIC_LIFE_TIME = watch("KEY_CNIC_LIFETIME");

  // Watch for changes to KEY_CNIC_LIFETIME and KEY_CNIC_EXPIRY_DATE
  useEffect(() => {
    if (CNIC_LIFE_TIME) {
      setValue("KEY_CNIC_EXPIRY_DATE", dayjs('2999-01-01').format('YYYY-MM-DD'));
    }
  }, [CNIC_LIFE_TIME]);

  // Function to check field should be disabled
  const getFieldDisabled = (fieldKuid) => {
    const EXPIRY_DATE = fieldKuid === "KEY_CNIC_EXPIRY_DATE";
    return (EXPIRY_DATE && CNIC_LIFE_TIME);
  };

  return (
    <WizardLayout
      Icon={CARD_ICON}
      title={TITLE}
      description={'Kindly review and confirm the details of your CNIC to proceed with the process.' || DESCRIPTION}
      heroImage={CNIC_DETAIL_UNDRAW}
    >
      <Grid container sx={{ gap: "24px" }}>
        {
          FIELDS?.map(field => (
            <Grid key={field?.kuid} item xs={12} lg={5}>
              <FormBuilder field={field} control={control} errors={errors} watch={watch} disabled={getFieldDisabled(field?.kuid)} />
            </Grid>
          ))
        }
      </Grid>
      <CustomButton label={"Proceed"} />
    </WizardLayout>
  );
};

export default CnicDetail;
