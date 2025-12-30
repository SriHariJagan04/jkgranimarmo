import React, { useState, useEffect } from "react";
import styles from "./TestimonialForm.module.css";
import { useTestimonials } from "../../Store/useContext";

export default function TestimonialForm({ initialData = null, onClose }) {
  const { addTestimonial, updateTestimonial } = useTestimonials();

  const [formData, setFormData] = useState({
    name: "",
    company: "",
    review: "",
    rating: 5,
    linkedin: "",
    website: "",
    twitter: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        company: initialData.company || "",
        review: initialData.review || initialData.message || "",
        rating: initialData.rating || 5,
        linkedin: initialData.linkedin || "",
        website: initialData.website || "",
        twitter: initialData.twitter || "",
      });
    } else {
      setFormData({
        name: "",
        company: "",
        review: "",
        rating: 5,
        linkedin: "",
        website: "",
        twitter: "",
      });
    }
    setErrors({});
    setSuccess(null);
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "rating" ? Number(value) : value,
    }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
    if (success) setSuccess(null);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Please enter your name.";
    if (!formData.company.trim()) newErrors.company = "Please enter company/place.";
    if (!formData.review.trim()) newErrors.review = "Please write your review.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setErrors({});
    setSuccess(null);

    try {
      let result;
      if (initialData && initialData.id) {
        result = await updateTestimonial({ id: initialData.id, ...formData });
      } else {
        result = await addTestimonial(formData);
      }

      if (result.success) {
        setSuccess(initialData ? "Testimonial updated successfully!" : "Testimonial submitted successfully!");
        if (!initialData) {
          setFormData({
            name: "",
            company: "",
            review: "",
            rating: 5,
            linkedin: "",
            website: "",
            twitter: "",
          });
        }
        if (onClose) onClose();
      } else {
        setErrors({ form: result.error || "Failed to save testimonial." });
      }
    } catch (err) {
      setErrors({ form: "Failed to save testimonial. Try again." });
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <h2 className={styles.title}>{initialData ? "Edit Testimonial" : "Submit Testimonial"}</h2>

      <div className={styles.inputGroup}>
        <input
          type="text"
          name="name"
          placeholder="Name *"
          value={formData.name}
          onChange={handleChange}
          className={styles.input}
        />
        {errors.name && <p className={styles.error}>{errors.name}</p>}
      </div>

      <div className={styles.inputGroup}>
        <input
          type="text"
          name="company"
          placeholder="Company/place *"
          value={formData.company}
          onChange={handleChange}
          className={styles.input}
          maxLength={250}
        />
        {errors.company && <p className={styles.error}>{errors.company}</p>}
      </div>

      <div className={styles.inputGroup}>
        <textarea
          name="review"
          placeholder="Write your review *"
          value={formData.review}
          onChange={handleChange}
          className={styles.textarea}
        />
        {errors.review && <p className={styles.error}>{errors.review}</p>}
      </div>

      <label htmlFor="ratingInput">Rating: {formData.rating} ⭐</label>
      <input
        type="range"
        id="ratingInput"
        name="rating"
        min="1"
        max="5"
        value={formData.rating}
        onChange={handleChange}
        className={styles.input}
      />

      <input
        type="url"
        name="linkedin"
        placeholder="LinkedIn URL"
        value={formData.linkedin}
        onChange={handleChange}
        className={styles.input}
      />
      <input
        type="url"
        name="website"
        placeholder="Website URL"
        value={formData.website}
        onChange={handleChange}
        className={styles.input}
      />
      <input
        type="url"
        name="twitter"
        placeholder="Twitter URL"
        value={formData.twitter}
        onChange={handleChange}
        className={styles.input}
      />

      <div style={{ marginTop: "1rem" }} className={styles.btns}>
        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? (initialData ? "Saving..." : "Submitting...") : initialData ? "Update" : "Submit"}
        </button>
      </div>

      {errors.form && <p style={{ color: "red", marginTop: "0.5rem" }}>{errors.form}</p>}
      {success && <p style={{ color: "green", marginTop: "0.5rem" }}>{success}</p>}
    </form>
  );
}
