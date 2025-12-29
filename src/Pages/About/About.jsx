import React from "react";
import styles from "./about.module.css";

const About = () => {
  return (
    <div className={styles.aboutPage}>
      <section className={styles.heroSection}>
        <h1 className={styles.heroTitle}>About Us</h1>
      </section>

      <section className={styles.introSection}>
        <div className={styles.textBlock}>
          <h2>Welcome to JK GRANI MARMO</h2>
          <p>
            At JK Granimarmo, we breathe life into stone – offering premium
            Granite, Marble (Indian & Imported), Sandstone, and Tiles that blend
            timeless beauty with modern durability. With over 20 years of
            legacy, we are proud to be a trusted name among architects,
            builders, and homeowners across India. Whether it’s Italian
            elegance, Rajasthan’s richness, or contemporary tiles, our curated
            collections elevate every design vision. We deliver factory-direct
            pricing, unmatched craftsmanship, and end-to-end solutions for
            floors and walls
          </p>
          <span>✨ JK Granimarmo – where natural stone becomes soulful art.</span>
        </div>
        <img src="/Images/about-as.jpg" alt="JK Grani Marmo Factory" />
      </section>

      <section className={styles.highlightSection}>
        <div className={styles.card}>
          <img src="/Images/visionImg.jpg" alt="Vision" />
          <h3>Our Vision</h3>
          <p>
            To be the leading provider of innovative and reliable products and
            services that exceed customer expectations.
          </p>
        </div>
        <div className={styles.card}>
          <img src="/Images/missionImg.jpg" alt="Mission" />
          <h3>Our Mission</h3>
          <p>
            To deliver the highest quality products and services, cultivating a
            culture of excellence, ethics, and continuous innovation.
          </p>
        </div>
      </section>

      <section className={styles.facilitySection}>
        <img src="/Images/facilityImg.jpg" alt="Manufacturing Facility" />
        <div className={styles.textBlock}>
          <h2>Our Manufacturing Facility</h2>
          <p>
            Our facility is equipped with state-of-the-art machinery, employing
            advanced cutting and polishing techniques to produce durable and
            aesthetically superior granite slabs. Staffed by skilled
            professionals, we ensure every product meets global quality
            standards.
          </p>
        </div>
      </section>

      <section className={styles.teamSection}>
        <div className={styles.textBlock}>
          <h2>Meet Our Leadership</h2>
          <p>
            Mr. Sandeep Kumar Mehta and Mr. Nand Kishore Vaishnav are the
            visionaries behind JK GRANI MARMO. Their experience and mentorship
            have built a company culture rooted in quality, trust, and
            continuous growth.
          </p>
        </div>
        <img src="/Images/teamImg.jpg" alt="Our Team" />
      </section>

      <section className={styles.factsSection}>
        <h2 className={styles.tableTitle}>Quick Facts</h2>
        <div className={styles.tableContainer}>
          <table className={styles.factsTable}>
            <tbody>
              <tr>
                <th>Nature of Business</th>
                <td>Manufacturers, Exporters, Supplier</td>
              </tr>
              <tr>
                <th>Number of Employees</th>
                <td>50 People</td>
              </tr>
              <tr>
                <th>Year of Establishment</th>
                <td>2022</td>
              </tr>
              <tr>
                <th>Market Covered</th>
                <td>Worldwide</td>
              </tr>
              <tr>
                <th>Founders</th>
                <td>Mr. Sandeep Kumar Mehta, Mr. Nand Kishore Vaishnav</td>
              </tr>
              <tr>
                <th>GST No</th>
                <td>08AAQFJ7778J1ZD</td>
              </tr>
              <tr>
                <th>Annual Turnover</th>
                <td>10 Crore Approx</td>
              </tr>
              <tr>
                <th>Legal Status of Firm</th>
                <td>Partnership</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default About;
