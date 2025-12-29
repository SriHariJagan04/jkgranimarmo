import React from "react";
import styles from "./contact.module.css";
import ContactForm from "../ContactForm/ContactForm";

const Contact = () => {
  return (
    <div className={styles.contactWrapper}>
      <div className={styles.contactContainer}>
        <div className={styles.imageSection}>
          <img src="/Images/customer-support.png" alt="Contact" />
        </div>
        <div className={styles.formSection}>
          <h2>
            <span className={styles.highlight}>Quick</span> Enquiry
          </h2>
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default Contact;
