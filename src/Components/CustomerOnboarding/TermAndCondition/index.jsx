import { Box } from "@mui/material";
import { CaptchaField, CheckboxField } from "src/Components/FormFields";
import React from "react";
import CustomButton from "src/Common/CustomButton";
import ValidationError from "src/Components/ValidationError";
import TermAndConditionData from "src/Mock/TermAndCondition.json";
import PrivacyPolicyData from "src/Mock/PrivacyPolicy.json";
import styles from "./index.module.scss";

const TermAndCondition = ({
  control,
  errors,
}) => {
  return (
    <Box sx={{ paddingTop: "16px" }}>
      <Box>
        <div>
          <h1 className={styles.topHeading}>Terms And Conditions</h1>
        </div>
        <div className={styles.termContainer}>
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
        </div>
      </Box>
      <Box>
        <div>
          <h1 className={styles.topHeading}> Declaration and Acceptance</h1>
        </div>
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
      <CustomButton label={"Submit"} />
    </Box>
  );
};

export default TermAndCondition;
