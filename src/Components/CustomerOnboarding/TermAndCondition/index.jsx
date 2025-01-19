import { Box } from "@mui/material";
import CustomButton from "src/Common/CustomButton";
import { CheckboxField } from "src/Components/FormFields";
import ValidationError from "src/Components/ValidationError";
import PrivacyPolicyData from "src/Mock/PrivacyPolicy.json";
import TermAndConditionData from "src/Mock/TermAndCondition.json";
import styles from "./index.module.scss";
import TERMS_AND_CONDITION_UNDRAW from 'src/Assets/images/termsAndConditionsUndraw.svg'
import DECLARATION_UNDRAW from 'src/Assets/images/declarationUndraw.svg'


const TermAndCondition = ({ control, errors }) => {
  return (
    <Box sx={{ width: '100%', paddingTop: "16px" }}>
      {/* TERM & CONDITION */}
      <Box sx={{ margin: '20px 0px' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <h1 className={styles.topHeading}>Terms & Conditions</h1>
          <img src={TERMS_AND_CONDITION_UNDRAW} alt='' height='100px' width='100' />
        </Box>

        <Box className={styles.termContainer}>
          <ol className={styles.list}>
            {TermAndConditionData.map((item, index) => (
              <li key={index}>
                <h4 className={styles.listItemTitle}>{item.title}:</h4>
                {item.content && <span className={styles.content}>{item.content}</span>}
                {item.subList && (
                  <ul className={styles.subList}>
                    {item.subList.map((subItem, subIndex) => (
                      <li key={subIndex}>
                        {subItem.subTitle && (
                          <span className={styles.subTitle}>{subItem.subTitle}: </span>
                        )}
                        <span className={styles.content}>{subItem.subContent}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ol>
        </Box>
      </Box>
      {/* DECLARATION & ACCEPTANCE */}
      <Box sx={{ margin: '20px 0px' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <h1 className={styles.topHeading}>Declaration and Acceptance</h1>
          <img src={DECLARATION_UNDRAW} alt='' height='100px' width='100' />
        </Box>

        <div className={styles.termContainer}>
          <ul className={styles.list}>
            {PrivacyPolicyData.map((item, index) => (
              <li key={index}>
                <h4 className={styles.listItemTitle}>{item.title}:</h4>
                {item.content && <span className={styles.content}>{item.content}</span>}
                {item.subList && (
                  <ul className={styles.subList}>
                    {item.subList.map((subItem, subIndex) => (
                      <li key={subIndex}>
                        {subItem.subTitle && (
                          <span className={styles.subTitle}>{subItem.subTitle}: </span>
                        )}
                        <span className={styles.content}>{subItem.subContent}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </Box>
      <Box sx={{ marginTop: '16px' }}>
        <CheckboxField name={"isAccepted"} label={"I acknowledge and accept the Terms and Conditions."} control={control} />
        {errors?.isAccepted && (<ValidationError message={errors?.isAccepted?.message} />)}
      </Box>
      <CustomButton label={"Submit Application"} />
    </Box>
  );
};

export default TermAndCondition;
