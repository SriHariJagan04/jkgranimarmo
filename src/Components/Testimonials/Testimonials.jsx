import React, { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";
import styles from "./testimonials.module.css";
import { Star } from "lucide-react";
import { useTestimonials } from "../../Store/useContext";
import TestimonialForm from "../TestimonialForm/TestimonialForm";
import { isTokenValid } from "../../Utils/isTokenValid";

// Dummy fallback testimonials
const dummyTestimonials = [
  {
    id: 1,
    name: "Sandeep Mehta",
    logo: "https://www.pngplay.com/wp-content/uploads/12/User-Avatar-Profile-Transparent-Clip-Art-PNG.png",
    message:
      "JK Grani Marmo exceeded our expectations. Truly committed to quality and excellence.",
    linkedin: "https://linkedin.com",
    website: "https://example.com",
    twitter: "https://twitter.com",
    rating: 5,
  },
  {
    id: 2,
    name: "Nand Kishore",
    logo: "https://www.iconpacks.net/icons/1/free-user-group-icon-296-thumb.png",
    message:
      "Great experience working with the team. Professional and dedicated.",
    linkedin: "https://linkedin.com",
    website: "https://example.com",
    twitter: "https://twitter.com",
    rating: 4,
  },
  {
    id: 3,
    name: "Priya Sharma",
    logo: "https://www.pngplay.com/wp-content/uploads/12/User-Avatar-Profile-Transparent-Clip-Art-PNG.png",
    message:
      "The product quality is top-notch, and the support is outstanding. Highly recommend!",
    linkedin: "https://linkedin.com",
    website: "https://example.com",
    twitter: "https://twitter.com",
    rating: 5,
  },
];

const Testimonials = () => {
  const DEFAULT_AVATAR =
    "https://www.pngplay.com/wp-content/uploads/12/User-Avatar-Profile-Transparent-Clip-Art-PNG.png";

  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const { testimonials, deleteTestimonial } = useTestimonials();
  const [fetchedTestimonials, setFetchedTestimonials] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  // Simulated logged-in check (replace with your real check)
  const token = localStorage.getItem("token");
  const isLoggedIn = isTokenValid(token);

  useEffect(() => {
    if (testimonials) {
      setFetchedTestimonials(testimonials);
    } else {
      setFetchedTestimonials(dummyTestimonials);
    }
  }, [testimonials]);

  const testimonialsToShow = fetchedTestimonials || dummyTestimonials;

  // Auto-rotate slides every 3 seconds if not paused
  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonialsToShow.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [paused, testimonialsToShow.length]);

  // Swipe handlers using react-swipeable
  const handlers = useSwipeable({
    onSwipedLeft: () =>
      setActiveIndex((prev) => (prev + 1) % testimonialsToShow.length),
    onSwipedRight: () =>
      setActiveIndex((prev) =>
        prev === 0 ? testimonialsToShow.length - 1 : prev - 1
      ),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const handleEdit = (testimonial) => {
    setEditingTestimonial(testimonial);
    setShowForm(true);
  };

  const handleDelete = (testimonialId) => {
    if (window.confirm("Are you sure you want to delete this testimonial?")) {
      deleteTestimonial(testimonialId);
    }
  };

  if (fetchedTestimonials === null) {
    return <p>Loading testimonials...</p>;
  }

  return (
    <div className={styles.testimonialsSection}>
      {showForm && (
        <div
          className={styles.modalOverlay}
          onClick={() => {
            setShowForm(false);
            setEditingTestimonial(null);
          }}
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <TestimonialForm
              initialData={editingTestimonial}
              onClose={() => {
                setShowForm(false);
                setEditingTestimonial(null);
              }}
            />
          </div>
        </div>
      )}

      <h2 className="pageTitle">
        What{" "}
        <span style={{ color: "var(--highlight-color)" }}>Our Clients </span>{" "}
        Say
      </h2>

      <div
        {...handlers}
        className={styles.slider}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {testimonialsToShow.map((t, i) => (
          <div
            key={t.id}
            className={`${styles.testimonialCard} ${
              i === activeIndex ? styles.active : ""
            }`}
            style={{ display: i === activeIndex ? "block" : "none" }}
          >
            <div className={styles.topRow}>
              <img
                src={t.logo || DEFAULT_AVATAR}
                alt={t.name}
                className={styles.logo}
              />
              <div className={styles.titleBlock}>
                <h4>{t.name}</h4>
                {t.company && <p className={styles.role}>{t.company}</p>}
                <div className={styles.stars}>
                  {Array(Number(t.rating) || 0)
                    .fill(0)
                    .map((_, idx) => (
                      <Star
                        key={idx}
                        size={16}
                        fill="#ffc107"
                        color="#ffc107"
                      />
                    ))}
                </div>
              </div>
            </div>

            <p className={styles.message}>“{t.message || t.review}”</p>

            <div className={styles.links}>
              {t.linkedin && (
                <a href={t.linkedin} target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
              )}
              {t.website && (
                <a href={t.website} target="_blank" rel="noopener noreferrer">
                  Website
                </a>
              )}
              {t.twitter && (
                <a href={t.twitter} target="_blank" rel="noopener noreferrer">
                  Twitter
                </a>
              )}
            </div>

            {isLoggedIn && (
              <div className={styles.actions}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEdit(t);
                  }}
                  className={styles.editBtn}
                >
                  Edit
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(t.id);
                  }}
                  className={styles.deleteBtn}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className={styles.dots}>
        {testimonialsToShow.map((_, i) => (
          <span
            key={i}
            className={`${styles.dot} ${
              i === activeIndex ? styles.activeDot : ""
            }`}
            onClick={() => setActiveIndex(i)}
          />
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
