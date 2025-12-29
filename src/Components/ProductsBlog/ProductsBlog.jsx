import React from "react";
import styles from "./ProductsBlog.module.css";

const ProductsBlog = ({ categoryData }) => {
  if (!categoryData) return null;

  return (
    <section className={styles.blogSection}>
      <div className={styles.container}>
        {/* Blog Title */}
        <h2 className={styles.blogTitle}>{categoryData.title}</h2>

        {/* Intro Paragraphs */}
        {categoryData.intro &&
          categoryData.intro.map((paragraph, idx) => (
            <p key={idx} className={styles.blogIntro}>
              {paragraph}
            </p>
          ))}

        {/* Sections */}
        {categoryData.sections.map((section, idx) => (
          <div key={idx} className={styles.section}>
            {section.title && <h2 className={styles.sectionTitle}>{section.title}</h2>}

            {/* Section Content Paragraphs */}
            {section.content &&
              section.content.map((paragraph, pIdx) => (
                <p key={pIdx} className={styles.sectionContent}>
                  {paragraph}
                </p>
              ))}

            {/* Points List */}
            {section.points && section.points.length > 0 && (
              <ul className={styles.pointsList}>
                {section.points.map((point, ptIdx) => (
                  <li key={ptIdx} className={styles.pointItem}>
                    {point}
                  </li>
                ))}
              </ul>
            )}

            {/* Text */}
            {section.text &&
              section.text.map((paragraph, pIdx) => (
                <p key={pIdx} className={styles.sectionText}>
                  {paragraph}
                </p>
              ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductsBlog;
