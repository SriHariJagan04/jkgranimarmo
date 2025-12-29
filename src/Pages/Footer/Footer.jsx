import React from "react";
import styles from "./footer.module.css";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";

const navLinks = [
  "Home",
  "About Us",
  "Products",
  "Testimonials",
  "Contact Us",
  "Site Map",
];

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.navLinks}>
        {navLinks.map((link, i) => (
          <span key={i} className={styles.navItem}>
            {link}
            {i < navLinks.length - 1 && <span className={styles.pipe}>|</span>}
          </span>
        ))}
      </div>

      <div className={styles.associatedSection}>
        <h4>Sister Concerns :</h4>
        <ul className={styles.associatedList}>
          <li>PRIYA MARBLES <span className={styles.pipe}>|</span></li> 
          <li>AKSHAY MARBLE SUPPLIERS <span className={styles.pipe}>|</span></li>
          <li>SHRI KRISHNA STONEX <span className={styles.pipe}>|</span></li>
          <li>SHUBHAM MARBLES <span className={styles.pipe}>|</span></li>
          <li>MONU MARBLES <span className={styles.pipe}>|</span></li>
        </ul>
      </div>

      <div className={styles.mapSection}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3566.704267410353!2d74.84740807488508!3d26.625924472357507!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396bf1834ac2a471%3A0xbb07b44f710466d7!2sJK%20Grani%20Marmo!5e0!3m2!1sen!2sin!4v1752230576881!5m2!1sen!2sin"
          width="100%"
          height="350"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="JK Grani Marmo Location"
        ></iframe>
      </div>

      <div className={styles.bottomFooter}>
        <div className={styles.bottomBar}>
          <p>
            All Rights Reserved. <strong>JK GRANI MARMO</strong>
          </p>
          <p>
            Developed & Managed By{" "}
            <a
              href="https://nayadrishiti.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              NayaDrishti
            </a>
          </p>
        </div>

        <div className={styles.socialWrapper}>
          <div className={styles.socialIcons}>

             <a
              href="https://in.linkedin.com/in/jk-grani-marmo-38239926a"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className={`${styles.iconCircle} ${styles.linkedin}`}
            >
              <Linkedin size={24} />
            </a>

            <a
              href="https://www.youtube.com/@JKGranimarmo"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className={`${styles.iconCircle} ${styles.youtube}`}
            >
              <Youtube size={24} />
            </a>

            <a
              href="https://www.facebook.com/JKgranimarmo"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="facebook"
              className={`${styles.iconCircle} ${styles.linkedin}`}
            >
              <Facebook size={24} />
            </a>

            <a
              href="https://www.instagram.com/jkgranimarmo"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="instagram"
              className={`${styles.iconCircle} ${styles.instagram}`}
            >
              <Instagram size={24} />
            </a>
          </div>
        </div>

        <p className={styles.copyright}>
          © {new Date().getFullYear()} JK Grani Marmo - All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
