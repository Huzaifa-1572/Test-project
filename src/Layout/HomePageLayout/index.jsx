import React from "react";
import styles from "./index.module.scss";
import Header from "src/Layout/Header";

const HomePageLayout = ({ children }) => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.overlay}></div>
        <div className={styles.content}>
          <Header />
          {children}
        </div>
      </div>
    </>
  );
};

export default HomePageLayout;
