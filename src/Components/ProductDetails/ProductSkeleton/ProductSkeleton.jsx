import styles from './ProductSkeleton.module.css'

// Skeleton Loader
const ProductSkeleton = () => (
  <div className={styles.detailsWrapper}>
    <div className={styles.mainCard}>
      <div className={`${styles.imageSection} ${styles.skeletonBox}`} />
      <div className={styles.infoSection}>
        <div className={styles.skeletonTitle} />
        <div className={styles.skeletonLine} />
        <div className={styles.skeletonLine} />
        <div className={styles.gridDetails}>
          {Array(8)
            .fill(0)
            .map((_, i) => (
              <div key={i} className={styles.skeletonLineSmall} />
            ))}
        </div>
        <div className={styles.actions}>
          <div className={styles.skeletonBtn} />
          <div className={styles.skeletonBtn} />
          <div className={styles.skeletonBtn} />
        </div>
      </div>
    </div>
  </div>
);


export default ProductSkeleton;