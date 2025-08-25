import { Box, Container } from "@mui/material";
import TERMS_AND_CONDITION_UNDRAW from 'src/Assets/images/termsAndConditionsUndraw.svg';
import TERMS_AND_CONDITION_UNDRAW_SM from 'src/Assets/images/termsAndConditionsUndraw_sm.svg';
import CustomButton from "src/Common/CustomButton";
import { CheckboxField } from "src/Components/FormFields";
import ValidationError from "src/Components/ValidationError";
import { PayvayTerms } from 'src/Utils/Constants/PayvayTerms';
import { getUUID, isSmallScreen } from "src/Utils/Helpers";
import styles from "./index.module.scss";

const TermAndCondition = ({ control, errors }) => {

  // Function to render the detail content
  const renderDetail = (content) => {
    if (typeof content === 'function') {
      return content();
    }
    return content;
  };

  return (
    <>
      {/* FOR LARGE SCREENS */}
      <Box sx={{ display: { xs: 'none', md: 'block' }, width: '100%', paddingTop: "16px" }}>
        <Box sx={{ margin: '20px 0px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <h1 className={styles.topHeading}>Terms & Conditions</h1>
            <img src={isSmallScreen() ? TERMS_AND_CONDITION_UNDRAW_SM : TERMS_AND_CONDITION_UNDRAW} alt='' height='100px' width='100px' />
          </Box>

          <Box className={styles.termContainer}>
            <ol className={styles.list}>
              {PayvayTerms?.map((item, index) => (
                <li key={index}>
                  <h4 className={styles.listItemTitle}>{item.title}:</h4>
                  {item.content && <span className={styles.content}>{renderDetail(item.content)}</span>}
                </li>
              ))}
            </ol>
          </Box>
        </Box>

        <Box sx={{ marginTop: '16px' }}>
          <CheckboxField name={"isAccepted"} label={"I acknowledge and accept the Terms and Conditions."} control={control} />
          {errors?.isAccepted && (<ValidationError message={errors?.isAccepted?.message} />)}
        </Box>
        <CustomButton label={"Submit Application"} />
      </Box>

      {/* FOR SMALL DEVICES */}
      <Container maxWidth='md' sx={{ padding: '0 !important', margin: '0 !important', display: { xs: 'block', md: 'none' } }}>
        <Box sx={{ margin: '20px 0px' }}>
          <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }} className={styles.topHeading}>Terms & Conditions</Box>
        </Box>
        <Box className={styles.termContainer}>
          <ol className={styles.list}>
            {PayvayTerms?.map((item, index) => (
              <li key={index}>
                <h4 className={styles.listItemTitle}>{item.title}:</h4>
                {item.content && <span className={styles.content}>{renderDetail(item.content)}</span>}
              </li>
            ))}
          </ol>
        </Box>
        <Box sx={{ marginTop: '16px' }}>
          <CheckboxField name={"isAccepted"} label={"I acknowledge and accept the Terms and Conditions."} control={control} />
          {errors?.isAccepted && (<ValidationError message={errors?.isAccepted?.message} />)}
        </Box>
        <CustomButton label={"Submit Application"} />
      </Container>
    </>
  );
};

export default TermAndCondition;
