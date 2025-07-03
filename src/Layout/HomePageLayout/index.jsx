import { Box } from "@mui/material";
import Header from "src/Layout/Header";
import styles from "./index.module.scss";


const HomePageLayout = ({ children }) => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.content}>
          <Header
            SHOW_BACK_BUTTON={true}
          />
          <Box sx={{ height: 'calc(100dvh - 65px)', width: "100%" }}>
            {children}
          </Box>
        </div>
      </div>
    </>
  );
};

export default HomePageLayout;
