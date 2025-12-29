import React, { useState } from 'react';
import styles from './newsletter.module.css';

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      console.log("Subscribed with:", email);
      setEmail("");
    }
  };

  return (
    <section className={styles.newsletterSection}>
      <h2>Newsletter</h2>
      <form className={styles.form} onSubmit={handleSubscribe}>
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </section>
  );
};

export default Newsletter;
