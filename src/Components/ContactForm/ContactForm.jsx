import React, { useState, useEffect } from "react";
import styles from "./contactForm.module.css";
import { URLS } from "../../urls";

const ContactForm = () => {
  const [form, setForm] = useState({
    product: "",
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};

    // Product / Service
    if (!form.product.trim()) {
      newErrors.product = "Please enter the name of Product / Service.";
    }

    // Name
    if (!form.name.trim()) {
      newErrors.name = "Please enter your name.";
    } else if (!/^[a-zA-Z\s]+$/.test(form.name)) {
      newErrors.name = "Name can contain letters and spaces only.";
    }

    // Email
    if (!form.email.trim()) {
      newErrors.email = "Please enter your email.";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email)
    ) {
      newErrors.email = "Please enter a valid email address.";
    }

    // Phone / Mobile
    if (!form.phone.trim()) {
      newErrors.phone = "Please enter your mobile number.";
    } else if (!/^\+?[0-9]{10,15}$/.test(form.phone)) {
      newErrors.phone =
        "Please enter a valid mobile number (10 digits, optional +).";
    }

    // Message (optional but max 500 chars)
    if (form.message.length > 500) {
      newErrors.message = "Message cannot exceed 500 characters.";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const payload = {
      type: "enquiry",
      product: form.product,
      name: form.name,
      email: form.email,
      mobile: form.phone,
      description: form.message,
    };

    try {
      setLoading(true);
      setSuccess("");
      setErrors({});

      const res = await fetch(URLS.enquiryEmail, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        setErrors(errorData);
        throw new Error("Failed to send enquiry");
      }

      const data = await res.json();
      setSuccess(data.message);
      setForm({
        product: "",
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <input
          type="text"
          name="product"
          placeholder="Product / Service Looking for"
          value={form.product}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          required
        />
      </div>
      {errors.product && <p className={styles.error}>{errors.product}</p>}
      {errors.name && <p className={styles.error}>{errors.name}</p>}

      <div className={styles.row}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone / Mobile"
          value={form.phone}
          onChange={handleChange}
        />
      </div>
      {errors.email && <p className={styles.error}>{errors.email}</p>}
      {errors.phone && <p className={styles.error}>{errors.phone}</p>}

      <textarea
        name="message"
        placeholder="Leave a Message for us"
        value={form.message}
        onChange={handleChange}
        required
        maxLength="500"
      />
      {errors.message && <p className={styles.error}>{errors.message}</p>}

      <button type="submit" className={styles.submitBtn} disabled={loading}>
        {loading ? "Sending..." : "Send Message"}
      </button>

      {success && <p className={styles.success}>{success}</p>}
    </form>
  );
};

export default ContactForm;
