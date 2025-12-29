import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "./latestProducts.module.css";
import { ChevronsRight } from "lucide-react";
import EnquiryModal from "../../Components/InstantQuote/InstantQuote";
import categoryStructure from "../../Constant/categories.json";
import { productData } from "../../data"; // your main product details
import { useNavigate } from "react-router-dom";
import { generatePath } from "../../Utils/generatePath";

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
  }),
};

// Helper to get a random element from an array
const randomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

const LatestProducts = ({ setProductDetails, openForm }) => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleViewMore = (product) => {
    navigate(generatePath(product.category, product.subcategory));
  };

  useEffect(() => {
    const randomProducts = [];
    const usedKeys = new Set(); // to avoid duplicates

    while (randomProducts.length < 6) {
      const category = randomItem(categoryStructure);
      const categoryKey = category.name.toLowerCase().replace(/\s+/g, "");

      const subcategory = randomItem(category.subcategories);
      let productKey = subcategory.name;

      if (subcategory.children) {
        productKey = randomItem(subcategory.children);
      }

      const normalizedKey = productKey.toLowerCase().replace(/\s+/g, "");
      const uniqueId = `${categoryKey}-${normalizedKey}`;

      if (usedKeys.has(uniqueId)) continue; // skip if already picked

      const product = productData?.[categoryKey]?.[normalizedKey];

      if (product) {
        usedKeys.add(uniqueId);
        randomProducts.push({
          ...product,
          category: categoryKey,
          subcategory: normalizedKey,
          image: product.images[0],
        });
      }
    }

    setProducts(randomProducts);
  }, []);

  const handleCardTap = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className={styles.container}>
      {showModal && <EnquiryModal onClose={() => setShowModal(false)} />}
      <h1 className="pageTitle">
        <b style={{ color: "var(--highlight-color)" }}>Latest</b> Products
      </h1>

      <motion.div
        className={styles.wrapper}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {products.map((product, index) => (
          <motion.div
            className={styles.card}
            key={index}
            custom={index}
            variants={cardVariants}
          >
            <div className={styles.imageWrapper}>
              <img src={product.image} alt={product.name} />
              <motion.div
                className={styles.detailsOverlay}
                initial={{ opacity: 0 }}
                animate={
                  activeIndex === index ? { opacity: 1 } : { opacity: 0 }
                }
                whileHover={{ opacity: 1 }}
                onClick={() => handleCardTap(index)}
                transition={{ duration: 0.3 }}
              >
                <h3>{product.name}</h3>
                <p>
                  <strong>Category:</strong> {product.category}
                </p>
                <p>
                  <strong>Subcategory:</strong> {product.subcategory}
                </p>
                <p>
                  <strong>Thickness:</strong> {product.thickness}
                </p>
                <p>
                  <strong>Origin:</strong> {product.origin}
                </p>

                <div className={styles.buttons}>
                  <button
                    className={`${styles.btn} ${styles.secondary}`}
                    onClick={() => {
                      setProductDetails({
                        ...product,
                        category: product.category,
                        subcategory: product.subcategory,
                      });
                      openForm();
                    }}
                  >
                    Enquiry Now
                  </button>
                  <button
                    className={`${styles.btn} ${styles.primary}`}
                    onClick={() => handleViewMore(product)}
                  >
                    View More
                  </button>
                </div>
              </motion.div>
            </div>
            <div className={styles.productName}>{product.name}</div>
          </motion.div>
        ))}
      </motion.div>

      <div className={styles.pageEnd}>
        <h2>
          We will send you the <b>Best Price Possible </b>
        </h2>
        <button onClick={() => setShowModal(true)}>
          Get Instant Quote <ChevronsRight className={styles.icon} />
        </button>
      </div>
    </div>
  );
};

export default LatestProducts;
