import React from "react";
import styles from "./footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles["footer"]}>
      <div>
        <div>
          <p>CONTACT</p>
        </div>
        <div>
          <p>DEVELOPER</p>
          <p>GITHUB</p>
          <p>GITHUB</p>
          <p>GITHUB</p>
        </div>
        <div>
          <p>ARTIST</p>
          <p>INSTAGRAM</p>
          <p>INSTAGRAM</p>
          <p>INSTAGRAM</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
