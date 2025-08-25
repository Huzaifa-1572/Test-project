import Grid from "@mui/material/Grid";
import CustomButton from "src/Common/CustomButton";
import { CustomInputField, SelectField } from "src/Components/FormFields";
import ValidationError from "src/Components/ValidationError";
import WizardLayout from "src/Layout/WizardLayout";
import { OPERATOR_OPTION } from "src/Utils/Lovs";
import MOBILE_ICON from 'src/Assets/images/mobileIcon.png'
import MOBILE_UNDRAW from 'src/Assets/images/mobileUndraw.svg'
import MOBILE_UNDRAW_SM from 'src/Assets/images/mobileUndraw_sm.svg'
import { isSmallScreen } from "src/Utils/Helpers";
import { useEffect } from "react";


const UpdateCnic = ({ control, errors, setValue }) => {

    useEffect(() => {
        const CNIC_FROM_OCR_SERVICE = localStorage.getItem('customer_reference_key_ocr') || '';
        setValue('cnicExtractedFromOCR', CNIC_FROM_OCR_SERVICE);
    }, []);



    return (
        <WizardLayout
            Icon={MOBILE_ICON}
            title={"Update CNIC"}
            description={"Please provide your new CNIC number to update your account information."}
            heroImage={isSmallScreen() ? MOBILE_UNDRAW_SM : MOBILE_UNDRAW}
        >
            <Grid container spacing={2}>
                <Grid item xs={12} lg={6}>
                    <CustomInputField
                        name={"customerCnic"}
                        control={control}
                        format={"#####-#######-#"}
                        label="CNIC Number (during registration)"
                        placeholder="#####-########-#"
                        inputMode="numeric"
                        type="tel"
                        disabled={true}
                    />
                </Grid>

                <Grid item xs={12} lg={6}>
                    <CustomInputField
                        name={"cnicExtractedFromOCR"}
                        control={control}
                        format={"#####-#######-#"}
                        label="Detected CNIC (from image)"
                        placeholder="#####-########-#"
                        inputMode="numeric"
                        type="tel"
                        disabled={true}
                    />
                </Grid>

                <Grid item xs={12} lg={6}>
                    <CustomInputField
                        name={"updateCustomerCnic"}
                        control={control}
                        format={"#####-#######-#"}
                        label="Update CNIC"
                        placeholder="#####-########-#"
                        inputMode="numeric"
                        type="tel"
                    />
                    {errors?.updateCustomerCnic ? (<ValidationError message={errors?.updateCustomerCnic?.message} />) : null}
                </Grid>

                <Grid item xs={12} lg={6}>
                    <CustomButton label={"Update"} />
                </Grid>
            </Grid>
        </WizardLayout >
    );
};

export default UpdateCnic;
