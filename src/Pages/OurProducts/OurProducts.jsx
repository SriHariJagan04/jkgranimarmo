import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ourproducts.module.css";
import { productData } from "../../data";
import { generatePath } from "../../Utils/generatePath";

const OurProducts = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("marble"); // default

  const handleCategoryClick = (category) => {
    setActiveCategory((prev) => (prev === category ? "" : category));
  };

  return (
    <>
      <div className={styles.container}>
        {Object.keys(productData).map((category) => (
          <div key={category} className={styles.categoryBlock}>
            {/* Category Header */}
            <div
              className={`${styles.categoryHeader} ${
                activeCategory === category ? styles.active : ""
              }`}
              onClick={() => handleCategoryClick(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </div>

            {/* Products inside */}
            {activeCategory === category && (
              <div className={styles.productGrid}>
                {Object.entries(productData[category]).map(
                  ([subKey, product]) => (
                    <div
                      key={subKey}
                      className={styles.productCard}
                      onClick={() =>
                        navigate(generatePath(category, subKey))
                      }
                    >
                      <div className={styles.imageWrapper}>
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className={styles.productImage}
                        />
                      </div>
                      <div className={styles.productInfo}>
                        <h4>{product.name}</h4>
                        <p>{product.color}</p>
                      </div>
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default OurProducts;
