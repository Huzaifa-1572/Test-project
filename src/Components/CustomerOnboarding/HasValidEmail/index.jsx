import { Grid } from '@mui/material';
import { IoMdCheckmark, IoMdClose } from "react-icons/io";
import EMAIL_ICON from 'src/Assets/images/emailIcon.png';
import HAS_VALID_EMAIL_UNDRAW from 'src/Assets/images/validEmailUndraw.svg';
import CustomButton from 'src/Common/CustomButton';
import WizardLayout from 'src/Layout/WizardLayout';

const HasValidEmail = ({ setValue }) => {

    const handleYes = () => {
        setValue("isValidEmail", "YES");
    };

    const handleNo = () => {
        setValue("isValidEmail", "NO");
    };

    return (
        <WizardLayout
            Icon={EMAIL_ICON}
            title={"Do You Have a Valid Email Address?"}
            description={"Providing a valid email ensures you stay updated with essential notifications."}
            heroImage={HAS_VALID_EMAIL_UNDRAW}
        >
            <Grid container sx={{ gap: "24px" }}>
                <Grid item xs={12} sm={4}>
                    <CustomButton label="YES" onClick={handleYes} Icon={<IoMdCheckmark />} />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <CustomButton label="NO" onClick={handleNo} Icon={<IoMdClose />} />
                </Grid>
            </Grid>
        </WizardLayout>
    )
}

export default HasValidEmail