import { HiTerminal } from "react-icons/hi";
import { MdFactCheck } from "react-icons/md";
import { Box } from "@mui/material";
import ReCAPTCHA from "react-google-recaptcha";
import { CheckboxField } from "src/Components/FormFields";
import styles from "./index.module.scss";
import React, { useState } from "react";
import VerificationButton from "src/Common/VerificationButton/VerificationButton";
import AccountOpeningSuccessModal from "src/Components/Modal/AccountOpeningSuccessModal";
import { useNavigate } from "react-router-dom";

const robotStyles = {
  marginTop: "3px",
  maxWidth: "400px",
  height: "120px",
  display: "flex",
};

const TermAndCondition = ({
  title,
  content,
  control,
  getValues,
  errors,
  setValue,
  watch,
  handleSubmit,
  submitFormData,
}) => {
  const navigate = useNavigate();
  const recaptchaRef = React.createRef();
  const [openSuccessModal, setOpenSuccessModal] = useState(false);

  const onCaptchaChange = (value) => {
    recaptchaValue.current = value;
    if (value) {
      setIsBot(false);
    } else {
      setIsBot(true);
    }
  };

  const handleSuccessModalClose = () => {
    setOpenSuccessModal(false);
    navigate("/");
  };

  const handleSuccessModalOpen = () => setOpenSuccessModal(true);

  const handleProceedButton = (e) => {
    e.preventDefault();
    handleSuccessModalOpen();
  };

  return (
    <>
      <Box>
        <Box
          sx={{ display: "flex", alignItems: "center", marginBottom: "12px" }}
        >
          <MdFactCheck
            style={{ color: "#5093e0", marginRight: "15px", fontSize: "32px" }}
          />
          <Box
            sx={{
              fontSize: "clamp(16px,4vw,36px)",
              textTransform: "capitalize",
              color: "#484e53",
            }}
          >
            Terms And Conditions
          </Box>
        </Box>
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
        <Box
          sx={{ display: "flex", alignItems: "center", marginBottom: "12px" }}
        >
          <MdFactCheck
            style={{ color: "#5093e0", marginRight: "15px", fontSize: "32px" }}
          />
          <Box
            sx={{
              fontSize: "clamp(16px,4vw,36px)",
              textTransform: "capitalize",
              color: "#484e53",
            }}
          >
            Declaration and Acceptance
          </Box>
        </Box>

        <div className={styles.checkboxContainer}>
          <CheckboxField name={"customerCnicLTE"} control={control} />
          <label htmlFor={"customerCnicLTE"} className={styles.checkboxLabel}>
            I hereby undertake and confirm that:
          </label>
        </div>

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
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={import.meta.env.VITE_REACT_APP_GOOGLE_CAPTCHA_KEY}
              onChange={onCaptchaChange}
            />
          </Box>
        </Box>

        <VerificationButton onClick={handleProceedButton} label={"Submit"} />

        {openSuccessModal && (
          <AccountOpeningSuccessModal
            open={openSuccessModal}
            handleClose={handleSuccessModalClose}
          />
        )}
      </Box>
    </>
  );
};

export default TermAndCondition;
