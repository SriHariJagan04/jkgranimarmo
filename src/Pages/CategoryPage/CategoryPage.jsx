import React, { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./CategoryPage.module.css";
import { productData } from "../../data";
import ProductsBlog from "../../Components/ProductsBlog/ProductsBlog";
import { productsBlogData } from "../../data";

const CategoryPage = () => {
  const { category } = useParams();
  const navigate = useNavigate();

  const products = useMemo(() => {
    return productData?.[category] ? Object.entries(productData[category]) : [];
  }, [category]);

  if (!products.length) {
    return <h2 className={styles.notFound}>Category not found</h2>;
  }

  // Function to format category like "importedmarble" => "Imported Marble"
  const formatCategory = (category) => {
    const keywords = ["marble", "imported", "granite", "tiles", "sandstone"];
    let formatted = category;

    keywords.forEach((word) => {
      const regex = new RegExp(word, "i");
      formatted = formatted.replace(regex, (match) => {
        return match.charAt(0).toUpperCase() + match.slice(1);
      });
    });

    formatted = formatted.replace(/([a-z])([A-Z])/g, "$1 $2");

    return formatted
      .split(/[\s-]+/)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  };

  return (
    <section className={styles.wrapper}>
      <h1 className={styles.title}>
        <span className={styles.subtitle}>Our Collection</span>
        {formatCategory(category)}
      </h1>

      <div className={styles.grid}>
        {products.map(([key, product]) => (
          <article
            key={key}
            className={styles.card}
            onClick={() => navigate(`/${category}/${key}`)}
          >
            <figure className={styles.imageWrap}>
              <img
                src={product.images[0]}
                alt={product.name}
                loading="lazy"
                width="320"
                height="240"
              />
            </figure>

            <div className={styles.cardBody}>
              <h3>{product.name}</h3>
            </div>
          </article>
        ))}
      </div>

      {/* Add Products Blog */}
      {productsBlogData[category] && (
        <ProductsBlog categoryData={productsBlogData[category]} />
      )}
    </section>
  );
};

export default CategoryPage;
