import React, { useState } from "react";
import styles from "./contactInfoCards.module.css";
import { MapPin, Phone, Mail, Monitor } from "lucide-react";
import { URLS } from "../../urls";

const cards = [
  {
    icon: <MapPin size={20} />,
    label: "Location",
    value: "Kishangarh, Ajmer, Rajasthan",
    cardClass: styles.locationCard,
    iconClass: styles.locationIcon,
  },
  {
    icon: <Phone size={20} />,
    label: "Mobile",
    value: <span><u>(+91) 77421-74777</u></span>,
    cardClass: styles.mobileCard,
    iconClass: styles.mobileIcon,
  },
  {
    icon: <Mail size={20} />,
    label: "Email",
    value: "jkgranimarmoksg@gmail.com",
    cardClass: styles.emailCard,
    iconClass: styles.emailIcon,
  },
  {
    icon: <Monitor size={20} />,
    label: "Web",
    value: "https://jkgranimarmo.in/",
    cardClass: styles.webCard,
    iconClass: styles.webIcon,
  },
];

const ContactInfoCards = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    try {
      const res = await fetch(URLS.newsletterEmail, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Subscription sent successfully!");
        setEmail("");
      } else {
        alert(data.error || "Something went wrong");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to send subscription");
    } finally {
      setLoading(false);
    }
  };

  const getLink = (label, value) => {
    switch (label) {
      case "Location":
        return "https://www.google.com/maps/place/JK+Grani+Marmo/@26.62592,74.849983,16z";
      case "Mobile":
        return `tel:${value.replace(/<[^>]*>?/gm, "")}`;
      case "Email":
        return `mailto:${value}`;
      case "Web":
        return `https://${value}`;
      default:
        return null;
    }
  };

  return (
    <div className={styles.contactInfoContainer}>
      <section className={styles.infoSection}>
        <div className={styles.cardsWrapper}>
          {cards.map((card, index) => {
            const link = getLink(card.label, String(card.value));
            return (
              <div
                key={index}
                className={`${styles.card} ${card.cardClass}`}
                onClick={() => link && window.open(link, "_blank")}
                style={{ cursor: link ? "pointer" : "default" }}
              >
                <div className={`${styles.iconWrapper} ${card.iconClass}`}>
                  {card.icon}
                </div>
                <h3>{card.label}</h3>
                <p>{card.value}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className={styles.newsletterSection}>
        <div>
          <h2>Newsletter</h2>
          <form className={styles.form} onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" disabled={loading}>
              {loading ? "Sending..." : "Submit"}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default ContactInfoCards;
