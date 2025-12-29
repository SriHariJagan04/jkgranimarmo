import React from 'react';
import styles from './newContactPage.module.css';
import ContactForm from '../../Components/ContactForm/ContactForm';
import { MapPin, Mail, Phone, Globe, CircleUser } from 'lucide-react';

const NewContactPage = () => {
  return (
    <section className={styles.contactWrapper}>
      <div className={styles.contactContainer}>
        {/* Left Column: Business Info */}
        <div className={styles.leftSection}>
          <p className={styles.subheading}>Welcome to</p>
          <h2 className={styles.title}>JK GRANI MARMO</h2>
          {/* <p className={styles.description}>
            Behind RK Indian Oil Petrol Pump, Makrana Road, Kishangarh,<br />
            Ajmer, Rajasthan, India - 305801
          </p> */}

          <div className={styles.contactDetails}>
            <div className={styles.detailItem}>
              <CircleUser size={24} className={styles.icon} />
              <div>
                <h4>Contact Person</h4>
                <p>Shubham Vaishnav</p>
                <p>Sunil Mehta</p>
              </div>
            </div>
            <hr />
            <div className={styles.detailItem}>
              <MapPin size={24} className={styles.icon} />
              <div>
                <h4>Address</h4>
                <p>Behind RK Indian Oil Petrol Pump, Makrana Road, Kishangarh, Ajmer, Rajasthan, India - 305801</p>
              </div>
            </div>
            <hr />
            <div className={styles.detailItem}>
              <Mail size={24} className={styles.icon} />
              <div>
                <h4>Email</h4>
                <p>
                  <a href="mailto:jkgranimarmoksg@gmail.com">jkgranimarmoksg@gmail.com</a>
                </p>
              </div>
            </div>
            <hr />
            <div className={styles.detailItem}>
              <Phone size={24} className={styles.icon} />
              <div>
                <h4>Phone</h4>
                <p> (+91)77421-74777 / (+91) 89208-24291</p>
                <p></p>
              </div>
            </div>
            <hr />
            <div className={styles.detailItem}>
              <Globe size={24} className={styles.icon} />
              <div>
                <h4>Websites</h4>
                <p>
                  <a href="https://jkgranimarmo.in" target="_blank" rel="noreferrer">
                    https://jkgranimarmo.in/
                  </a>
                  <br />
                  {/* <a href="https://www.exportersindia.com/shubham-marbles/" target="_blank" rel="noreferrer">
                    ExportersIndia
                  </a>
                  <br />
                  <a href="https://www.indianyellowpages.com/ajmer/shubham-marbles-kishangarh-ajmer-5734427/" target="_blank" rel="noreferrer">
                    YellowPages
                  </a> */}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className={styles.rightSection}>
          <h3 className={styles.formHeading}>Drop us a message</h3>
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default NewContactPage;
