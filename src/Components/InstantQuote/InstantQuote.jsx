import React, { useState } from "react";
import styles from "./instantQuote.module.css";
import { CircleX } from "lucide-react";
import { URLS } from "../../urls";

const InstantQuote = ({ onClose }) => {
  const [formData, setFormData] = useState({
    product: "",
    name: "",
    email: "",
    mobile: "",
    description: "",
    type: "instantquote",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // ================= Validation =================
  const validateForm = () => {
    const newErrors = {};

    if (!formData.product.trim()) newErrors.product = "Please enter product name.";

    if (!formData.name.trim()) newErrors.name = "Please enter your name.";
    else if (!/^[a-zA-Z\s]+$/.test(formData.name))
      newErrors.name = "Name can contain letters and spaces only.";

    if (!formData.email.trim()) newErrors.email = "Please enter your email.";
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email))
      newErrors.email = "Please enter a valid email address.";

    if (!formData.mobile.trim()) newErrors.mobile = "Please enter mobile number.";
    else if (!/^\+?[0-9]{10,15}$/.test(formData.mobile))
      newErrors.mobile =
        "Please enter a valid mobile number (10 digits, optional +).";

    if (!formData.description.trim()) newErrors.description = "Please write a message.";
    else if (formData.description.length > 500)
      newErrors.description = "Message cannot exceed 500 characters.";

    return newErrors;
  };
  // ==============================================

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccess("");

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(URLS.enquiryEmail, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errData = await res.json();
        setErrors({ form: errData?.message || "Something went wrong." });
        return;
      }

      const data = await res.json();
      setSuccess(data.message || "Instant Quote sent successfully!");
      setFormData({
        product: "",
        name: "",
        email: "",
        mobile: "",
        description: "",
        type: "instantquote",
      });
    } catch (err) {
      console.error(err);
      setErrors({ form: "Network error. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>
          <CircleX size={24} />
        </button>
        <h2>Get Instant Quote</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.row}>
            <div className={styles.inputGroup}>
              <label htmlFor="product">Name of Product *</label>
              <input
                id="product"
                type="text"
                placeholder="Type to search..."
                value={formData.product}
                onChange={handleChange}
              />
              {errors.product && <p className={styles.error}>{errors.product}</p>}
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="name">Your Name *</label>
              <input
                id="name"
                type="text"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <p className={styles.error}>{errors.name}</p>}
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="email">Email *</label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className={styles.error}>{errors.email}</p>}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="mobile">Mobile *</label>
            <input
              id="mobile"
              type="tel"
              placeholder="Mobile number"
              value={formData.mobile}
              onChange={handleChange}
            />
            {errors.mobile && <p className={styles.error}>{errors.mobile}</p>}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              rows="4"
              placeholder="Write your message"
              value={formData.description}
              onChange={handleChange}
            />
            {errors.description && <p className={styles.error}>{errors.description}</p>}
          </div>

          {errors.form && <p className={styles.error}>{errors.form}</p>}
          {success && <p className={styles.success}>{success}</p>}

          <button type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default InstantQuote;
