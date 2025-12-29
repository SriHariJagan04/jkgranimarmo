import React, { useEffect, useState } from "react";
import styles from "./ourWebsite.module.css";
import { ArrowBigRightDash } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { generatePath } from "../../Utils/generatePath";
import categoryStructure from "../../Constant/categories.json";
import { productData } from "../../data"; // your actual product details

// helper for random selection
const randomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

const OurWebsite = ({ setProductDetails, openForm }) => {
  const navigate = useNavigate();
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    const randomProducts = [];
    const usedKeys = new Set();

    while (randomProducts.length < 4) {
      const category = randomItem(categoryStructure);
      const categoryKey = category.name.toLowerCase().replace(/\s+/g, "");

      const subcategory = randomItem(category.subcategories);
      let productKey = subcategory.name;
      let childKey = null;

      if (subcategory.children) {
        childKey = randomItem(subcategory.children);
        productKey = childKey;
      }

      const normalizedKey = productKey.toLowerCase().replace(/\s+/g, "");
      const uniqueId = `${categoryKey}-${normalizedKey}`;
      if (usedKeys.has(uniqueId)) continue;

      const product = productData?.[categoryKey]?.[normalizedKey];
      if (product) {
        usedKeys.add(uniqueId);
        randomProducts.push({
          ...product,
          category: categoryKey,
          subcategory: subcategory.name,
          child: childKey,
          image: product.images[0],
        });
      }
    }

    setProductList(randomProducts);
  }, []);

  return (
    <section className={styles.container}>
      {/* Welcome Card */}
      <motion.div
        className={styles.cardContainer}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <motion.div
          className={styles.cardImage}
          initial={{ scale: 0.95, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <img
            src="/Images/whyUs.png"
            alt="Why choose our company"
            width="600"
            height="400"
            loading="lazy"
            decoding="async"
          />
        </motion.div>

        <motion.div
          className={styles.cardDescription}
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h1>About Us</h1>
          <p>
            JK GRANI MARMO is a trusted manufacturer, exporter and supplier of
            premium granites including 3D Black, Jeerawal, Coral Pink, Rajasthan
            Black, Tiger Skin, Viscon White and more. We deliver unmatched
            quality, variety and service to meet your architectural and interior
            needs.
          </p>
          <button
            className={styles.viewMoreBtn}
            onClick={() => navigate("/aboutus")}
          >
            <ArrowBigRightDash size={25} className={styles.icon} />
            View More
          </button>
        </motion.div>
      </motion.div>

      {/* Popular Products */}
      <div className={styles.popularProductsContainer}>
        <div className={styles.popularProductsHero}>
          <h1 className="pageTitle">
            <b style={{ color: "var(--highlight-color)" }}>Popular</b> Products
          </h1>
        </div>

        <div className={styles.popularProductsCardContainer}>
          {productList.map((product, index) => (
            <motion.div
              key={index}
              className={styles.productCard}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <img
                src={product.image}
                alt={product.name}
                width={600}
                height={400}
                loading="eager"
                fetchpriority="high"
                decoding="async"
              />

              <h3>{product.name}</h3>
              <div className={styles.cardActions}>
                <button
                  className={styles.enquiryBtn}
                  onClick={() => {
                    setProductDetails(product);
                    openForm();
                  }}
                >
                  Enquiry Now
                </button>
                <button
                  className={styles.viewBtn}
                  onClick={() =>
                    navigate(
                      generatePath(
                        product.category,
                        product.subcategory,
                        product.child
                      )
                    )
                  }
                >
                  View More
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurWebsite;
