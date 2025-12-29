// OurCompany.jsx
import React, { useState } from "react";
import styles from "./ourCompany.module.css";
import {
  ArrowBigRightDash,
  Building,
  Rocket,
  ShieldCheck,
  Briefcase,
  Users,
  CalendarDays,
  Globe2,
  BadgeInfo,
  CircleX,
} from "lucide-react";
import TestimonialForm from "../../Components/TestimonialForm/TestimonialForm";
import Testimonials from "../../Components/Testimonials/Testimonials";

const OurCompany = () => {
  const [testimonial, setTestimonial] = useState(false);

  const infoCards = [
    {
      icon: <Building size={32} />,
      heading: "Our Manufacturing Facility",
      description:
        "Our facility is equipped with the latest technology and machinery to ensure the highest quality of granite slabs.",
    },
    {
      icon: <ShieldCheck size={32} />,
      heading: "Quality Assurance",
      description:
        "JK GRANI MARMO ensures top-tier quality using cutting-edge tools and expert supervision throughout the production process.",
    },
    {
      icon: <Rocket size={32} />,
      heading: "Mission",
      description:
        "To provide customers with high-quality products that exceed expectations while fostering a culture of excellence.",
    },
  ];

  const stats = [
    {
      icon: <Briefcase size={40} strokeWidth={1.5} />,
      title: "Nature of Business",
      value: "Manufacturers, Exporters, Supplier",
    },
    {
      icon: <Users size={40} strokeWidth={1.5} />,
      title: "Number of Employees",
      value: "50 People",
    },
    {
      icon: <CalendarDays size={40} strokeWidth={1.5} />,
      title: "Year of Establishment",
      value: "2022",
    },
    {
      icon: <Globe2 size={40} strokeWidth={1.5} />,
      title: "Market Covered",
      value: "Worldwide",
    },
    {
      icon: <BadgeInfo size={40} strokeWidth={1.5} />,
      title: "Name of Founder",
      value: "Mr. Sandeep Kumar Mehta, Mr. Nand Kishore Vaishnav",
    },
  ];

  const clients = [
    {
      name: "JKPCC Department (The J&K Projects Construction Corporation Ltd.)",
      location: "Jammu & Kashmir",
    },
    { name: "SMVD Trust (Shri Mata Vaishno Devi)", location: "Katra, J&K" },
    { name: "Kashmir Assembly", location: "Jammu & Kashmir" },
    { name: "Jammu High Court Complex", location: "Jammu" },
    { name: "Swarn Marble and Granites", location: "Jammu" },
    { name: "Rajesh Marble House", location: "Jammu" },
    { name: "Randhawa Marble and Granites", location: "Jammu" },
    { name: "Dhillon Tiles and Granites", location: "Amritsar" },
    { name: "Narsingh Marble and Granites", location: "Amritsar" },
    { name: "Jai Durga Marble", location: "Meerut" },
    { name: "Madhav Marble", location: "Meerut" },
    { name: "Dockland Corporation", location: "Ahmedabad" },
  ];

  return (
    <div className={styles.companySection}>
      {testimonial && (
        <div className="enquiryOverlay" onClick={() => setTestimonial(false)}>
          <div className="enquiryModal" onClick={(e) => e.stopPropagation()}>
            <button id="closeBtn" onClick={() => setTestimonial(false)}>
              <CircleX size={30} />
            </button>
            <TestimonialForm />
          </div>
        </div>
      )}

      {/* Top Info Cards */}
      <div className={styles.cardRow}>
        {infoCards.map((card, index) => (
          <div className={styles.card} key={index}>
            <span className={styles.cardIcon}>{card.icon}</span>
            <div>
              <h3>{card.heading}</h3>
              <p>{card.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Testimonial Section */}
      <div className={styles.testimonialBanner}>
        <p>
          <em>
            In promotion and advertising, a testimonial consists of a person’s
            experience in a written statement extolling the integrity of a
            product or services.
          </em>
        </p>
        <button
          className={styles.testimonialBtn}
          onClick={() => setTestimonial(true)}
        >
          Post Your Testimonials{" "}
          <ArrowBigRightDash className={styles.arrow} size={20} />
        </button>
      </div>

      {/* Glimpse Section */}
      <div className={styles.glimpse}>
        <h2 className="pageTitle">
          <span style={{ color: "var(--highlight-color)" }}>Glimpse</span> of
          Our Company
        </h2>
        <div className={styles.statsGrid}>
          {stats.map((stat, i) => (
            <div key={i} className={styles.statBox}>
              <div className={styles.icon}>{stat.icon}</div>
              <h4>{stat.title}</h4>
              <p>{stat.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Our Clients Scrolling Marquee */}
      <div className={styles.clientScrollerWrapper}>
        <h2 className="pageTitle" style={{ marginBottom: "3rem" }}>
          <span style={{ color: "var(--highlight-color)" }}>Our</span> Clients
        </h2>

        <div className={styles.clientScroller}>
          <div className={styles.clientTrack}>
            {[...clients, ...clients].map((client, i) => (
              <div className={styles.clientLogo} key={i}>
                <p>
                  <strong>{client.name}</strong>
                </p>
                <p>— {client.location}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Testimonials />
    </div>
  );
};

export default OurCompany;
