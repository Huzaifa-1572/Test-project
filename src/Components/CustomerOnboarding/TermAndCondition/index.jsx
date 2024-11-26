import { Box } from "@mui/material";
import { CaptchaField, CheckboxField } from "src/Components/FormFields";
import React from "react";
import CustomButton from "src/Common/CustomButton";
import ValidationError from "src/Components/ValidationError";
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
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            fontSize: "16px",
            color: "#484e53",
            padding: "10px 20px",
            fontWeight: "500px",
          }}
        >
          <Box>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis est
            ratione eligendi voluptate inventore, fugiat et odit excepturi rem
            aliquid ut nulla quod voluptates in nisi, porro nihil magni enim.
            Necessitatibus quaerat quasi voluptatibus?
          </Box>
          <Box>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugiat
            voluptatem distinctio doloribus modi, velit incidunt dignissimos at,
            eum maiores molestias odit aspernatur expedita sapiente, totam
            officiis quidem vero nobis. Perspiciatis ex porro quaerat hic, magni
            delectus exercitationem omnis. Harum odit est dicta corporis
            repellat molestias fugit obcaecati officia in! Tenetur doloremque
            deserunt rerum magni eaque, officiis tempore optio illo beatae
            minima atque voluptatem amet, cumque adipisci dolores! Quas totam
            deserunt, quos exercitationem, ab fugiat reprehenderit iure illo
            incidunt, officiis explicabo? Adipisci eligendi fugit distinctio,
            nostrum sit accusantium incidunt numquam velit eius totam nesciunt
            repellat? Quod quidem reiciendis soluta nobis ipsa eligendi suscipit
            atque possimus cupiditate nam at aut adipisci earum dicta fugiat,
            molestias hic. Quos rem sequi necessitatibus nam nesciunt.
          </Box>
          <Box>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Placeat,
            accusamus porro eaque amet exercitationem explicabo asperiores!
          </Box>
        </Box>
      </Box>
      <Box>
        <div>
          <h1 className={styles.topHeading}> Declaration and Acceptance</h1>
        </div>
        <CheckboxField name={"isAccepted"} label={"I hereby undertake and confirm that:"} control={control} />
        {errors?.isAccepted && (<ValidationError message={errors?.isAccepted?.message} />)}
        <ol
          style={{
            fontSize: "16px",
            color: "#484e53",
            padding: "10px 20px",
            fontWeight: "600px",
            margin: "0px",
          }}
        >
          <li>
            {" "}
            Information provided above is true and correct in all aspects.
          </li>
          <li>
            {" "}
            Any changes in the provided information shall be notified
            immediately.
          </li>
          <li>
            {" "}
            All applicable laws, rules, regulations, procedures, guidelines and
            instructions, as amended from time to time, shall be adhered to.
          </li>
        </ol>

        <Box className={styles.robotStyles}>
          <Box sx={{ width: "100%", maxWidth: "400px" }}>
            <CaptchaField
              name={'googleCaptchaReviewApplication'}
              control={control}
              siteKey={import.meta.env.VITE_REACT_APP_GOOGLE_CAPTCHA_KEY}
            />
            {errors?.googleCaptchaReviewApplication && (<ValidationError message={errors?.googleCaptchaReviewApplication?.message} />)}
          </Box>
        </Box>

        <CustomButton label={"Submit"} />
      </Box>
    </Box>
  );
};

export default TermAndCondition;
