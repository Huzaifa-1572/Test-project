import { Grid } from '@mui/material';
import React from 'react'
import CustomButton from 'src/Common/CustomButton';
import WizardLayout from 'src/Layout/WizardLayout'
import { MdCreditCard } from "react-icons/md";



const HasValidEmail = ({ setValue }) => {

    const handleYes = () => {
        setValue("isValidEmail", "YES");
    };

    const handleNo = () => {
        setValue("isValidEmail", "NO");
    };

    return (
        <WizardLayout
            Icon={MdCreditCard}
            title={"Email Validation Check"}
            description={"Confirm if you have a valid email by selecting 'Yes' or 'No' below."}
        >
            <Grid container sx={{ gap: "24px" }}>
                <Grid item xs={12} md={6} lg={4}>
                    <CustomButton label="YES" onClick={handleYes} />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                    <CustomButton label="NO" onClick={handleNo} />
                </Grid>
            </Grid>
        </WizardLayout>
    )
}

export default HasValidEmail