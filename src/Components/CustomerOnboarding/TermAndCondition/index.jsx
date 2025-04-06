import { Box, Container } from "@mui/material";
import DECLARATION_UNDRAW from 'src/Assets/images/declarationUndraw.svg';
import TERMS_AND_CONDITION_UNDRAW from 'src/Assets/images/termsAndConditionsUndraw.svg';
import Accordion from "src/Common/Accordion";
import CustomButton from "src/Common/CustomButton";
import { CheckboxField } from "src/Components/FormFields";
import ValidationError from "src/Components/ValidationError";
import { getUUID } from "src/Utils/Helpers";
import styles from "./index.module.scss";
import { PayvayTerms } from 'src/Utils/Constants/PayvayTerms'




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
            <img src={TERMS_AND_CONDITION_UNDRAW} alt='' height='100px' width='100px' />
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
        {
          PayvayTerms?.map((data) => (
            <Box key={getUUID()}>
              <Accordion summary={data?.title} detail={data?.content} />
            </Box>
          ))
        }
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
