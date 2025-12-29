import React, { useState, useRef, useEffect } from "react";
import styles from "./enquiryForm.module.css";
import { URLS } from "../urls";

const productHierarchy = [
  {
    name: "Marble",
    subcategories: [
      { name: "Talai white" },
      { name: "Wonder White" },
      { name: "Banswara White" },
      { name: "Jhanjhar White" },
      { name: "Agaria White" },
      { name: "Morwad White" },
      {
        name: "Makrana",
        children: ["makrana white chakdungri", "makrana white albetta"],
      },
    ],
  },
  {
    name: "Imported Marble",
    subcategories: [
      {
        name: "Grey",
        children: [
          "Peitra Grey",
          "Grey William",
          "Fastasy Grey",
          "Drift Grey",
          "Cosmic Grey",
          "Grey Dyna",
          "Kandla Grey",
          "Iceberg Grey",
          "Mount Grey",
        ],
      },
      {
        name: "Beige",
        children: [
          "Dyna Beige",
          "Bracia Beige",
          "Bottochino Beige",
          "Agora Beige",
          "Azule Beige",
          "Bellissiomo Beige",
          "Travertine Beige",
          "Regal Beige",
        ],
      },
      {
        name: "White",
        children: [
          "Vietnam White",
          "Statuario White",
          "Signature White",
          "Opus White",
          "Lilac White",
          "Iranian White",
          "Carara White",
          "Bianco Lasa White",
        ],
      },
    ],
  },
  {
    name: "Granites",
    subcategories: [
      {
        name: "North Indian",
        children: [
          "Jirawal White",
          "Z Black",
          "Tiger Skin",
          "Tan Brown",
          "R.Black",
          "Majestik Black",
          "Cherry Red",
          "Cateyes",
          "3D finish",
          "Multi Red",
          "K White",
          "Olivier Green",
          "Thunder Brown",
          "Zidane Black",
        ],
      },
      {
        name: "Alaska Granites",
        children: [
          "Alaska Pink",
          "Alaska Black",
          "Alaska Gold",
          "Alaska White",
          "Alaska Blue Dunes",
          "Alphonso Brown Alaska",
        ],
      },
      {
        name: "South Indian",
        children: [
          "Astoria",
          "Burgundy White",
          "Burgundy Gold",
          "Ferraro White",
          "Lavender Blue",
          "Moon White",
          "Multi Red",
          "Mundari Gold",
          "Paradizzo",
          "Statuario Gold",
          "Statuario White",
          "Vizag Blue",
        ],
      },
    ],
  },
  {
    name: "Tiles",
    subcategories: [
      { name: "choco" },
      { name: "crema" },
      { name: "grey" },
      { name: "snow white" },
      { name: "super white" },
      { name: "terrazzo verde" },
      { name: "z black" },
      { name: "jaisalmer" },
      { name: "dark grey matt" },
      { name: "light grey" },
      { name: "mushroom" },
      { name: "spgrey" },
      { name: "sproyalverde" },
      { name: "steel grey matt" },
    ],
  },
  {
    name: "Sandstone",
    subcategories: [
      { name: "ITA Gold" },
      { name: "Jaisalmer Yellow" },
      { name: "Khatu Tickwood" },
      { name: "Paradizzo Leather" },
      { name: "Gwalior Mint" },
      { name: "Red" },
      { name: "Pink" },
      { name: "Rainbow" },
    ],
  },
  
];

// Flatten hierarchy into searchable list
const flattenProducts = () => {
  const results = [];
  productHierarchy.forEach((cat) => {
    cat.subcategories.forEach((sub) => {
      if (sub.children) {
        sub.children.forEach((child) =>
          results.push({
            label: `${cat.name} > ${sub.name} > ${child}`,
            category: cat.name,
            subcategory: sub.name,
            product: child,
          })
        );
      } else {
        results.push({
          label: `${cat.name} > ${sub.name}`,
          category: cat.name,
          subcategory: sub.name,
          product: sub.name,
        });
      }
    });
  });
  return results;
};

const allProducts = flattenProducts();



const EnquiryForm = ({ closeForm, productDetails }) => {
  const [form, setForm] = useState({
    product: productDetails?.name || "",
    description: "",
    name: "",
    mobile: "",
    email: "",
    type: "enquiry",
    category: productDetails?.category || "",
    subcategory: productDetails?.subcategory || "",
  });

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [status, setStatus] = useState("idle"); // idle | sending | sent
  const [errors, setErrors] = useState({});
  const dropdownRef = useRef(null);

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      product: productDetails?.name || "",
      category: productDetails?.category || "",
      subcategory: productDetails?.subcategory || "",
    }));
  }, [productDetails]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    if (e.target.name === "product") {
      const input = e.target.value.toLowerCase();
      const filtered = allProducts.filter((p) =>
        p.label.toLowerCase().includes(input)
      );
      setFilteredProducts(filtered);
    }
  };

  const handleFocus = () => {
    if (!form.product) setFilteredProducts(allProducts);
  };

  const handleSelectProduct = (item) => {
    setForm({
      ...form,
      product: item.product,
      category: item.category,
      subcategory: item.subcategory,
    });
    setFilteredProducts([]);
  };

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setFilteredProducts([]);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ===================== Validation =====================
  const validateForm = () => {
    const newErrors = {};

    // Product
    if (!form.product.trim()) newErrors.product = "Please select a product.";

    // Name
    if (!form.name.trim()) newErrors.name = "Please enter your name.";
    else if (!/^[a-zA-Z\s]+$/.test(form.name))
      newErrors.name = "Name can contain letters and spaces only.";

    // Email
    if (!form.email.trim()) newErrors.email = "Please enter your email.";
    else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email)
    )
      newErrors.email = "Please enter a valid email address.";

    // Mobile
    if (!form.mobile.trim()) newErrors.mobile = "Please enter mobile number.";
    else if (!/^\+?[0-9]{10,15}$/.test(form.mobile))
      newErrors.mobile =
        "Please enter a valid mobile number (10 digits, optional +).";

    // Description
    if (!form.description.trim()) newErrors.description = "Please write a message.";
    else if (form.description.length > 500)
      newErrors.description = "Message cannot exceed 500 characters.";

    return newErrors;
  };
  // ======================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setStatus("sending");

    try {
      const res = await fetch(URLS.enquiryEmail, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to send enquiry");

      setStatus("sent");

      setTimeout(() => {
        closeForm();
        setStatus("idle");
      }, 2000);
    } catch (err) {
      console.error("Error:", err);
      alert("Failed to send enquiry");
      setStatus("idle");
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.title}>Get Started</h2>

      <div className={styles.row}>
        <div className={styles.inputGroup} ref={dropdownRef}>
          <label>Name of Product *</label>
          <input
            type="text"
            name="product"
            value={form.product}
            onChange={handleChange}
            onFocus={handleFocus}
            placeholder="Type to search..."
            autoComplete="off"
          />
          {errors.product && <p className={styles.error}>{errors.product}</p>}
          {filteredProducts.length > 0 && (
            <ul className={styles.dropdown}>
              {filteredProducts.map((item, idx) => (
                <li key={idx} onClick={() => handleSelectProduct(item)}>
                  {item.label}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className={styles.inputGroup}>
          <label>Your Name *</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your name"
          />
          {errors.name && <p className={styles.error}>{errors.name}</p>}
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.inputGroup}>
          <label>Email *</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
          />
          {errors.email && <p className={styles.error}>{errors.email}</p>}
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.inputGroup}>
          <label>Mobile *</label>
          <input
            type="text"
            name="mobile"
            value={form.mobile}
            onChange={handleChange}
            placeholder="Mobile number"
          />
          {errors.mobile && <p className={styles.error}>{errors.mobile}</p>}
        </div>
      </div>

      <div className={styles.inputGroup}>
        <label>Description *</label>
        <textarea
          name="description"
          rows={4}
          value={form.description}
          onChange={handleChange}
          placeholder="Write your message"
        />
        {errors.description && (
          <p className={styles.error}>{errors.description}</p>
        )}
      </div>

      {/* Hidden fields */}
      <input type="hidden" name="category" value={form.category} />
      <input type="hidden" name="subcategory" value={form.subcategory} />

      <button
        type="submit"
        className={styles.button}
        disabled={status === "sending"}
      >
        {status === "idle" && "Send Message"}
        {status === "sending" && "Sending..."}
        {status === "sent" && "Sent ✅"}
      </button>
    </form>
  );
};

export default EnquiryForm;