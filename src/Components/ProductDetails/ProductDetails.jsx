import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./productDetails.module.css";
import { productData, subproductBlogData } from "../../data";
import categoryStructure from "../../Constant/categories.json";
import ProductSkeleton from "./ProductSkeleton/ProductSkeleton";
import ProductsBlog from "../ProductsBlog/ProductsBlog";

/* =========================
   HELPERS
========================= */
const shuffleArray = (array) => [...array].sort(() => Math.random() - 0.5);

const ProductDetails = ({ setProductDetails, openForm }) => {
  const { category, subcategory } = useParams();
  const navigate = useNavigate();

  const blogData = subproductBlogData[category]?.[subcategory];

  /* =========================
     STATE
  ========================= */
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoomStyle, setZoomStyle] = useState({});

  const videoRef = useRef(null);

  /* =========================
     DATA LOAD
  ========================= */
  const loadProduct = useCallback((cat, subcat) => {
    setLoading(true);

    setTimeout(() => {
      const fetchedProduct = productData?.[cat]?.[subcat] || null;
      setProduct(fetchedProduct);

      const subCatName = findSubcategoryName(cat, subcat);
      let related = [];

      if (subCatName) {
        const subKeys = findSubcategoryKeys(cat, subCatName);
        related = subKeys
          .filter((key) => key !== subcat)
          .map((key) => ({
            key,
            name: productData[cat][key].name,
            image: productData[cat][key].images[0],
            thickness: productData[cat][key].thickness,
            origin: productData[cat][key].origin,
          }));
      }

      if (related.length === 0) {
        related = Object.entries(productData[cat])
          .filter(([key]) => key !== subcat)
          .map(([key, value]) => ({
            key,
            name: value.name,
            image: value.images[0],
            thickness: value.thickness,
            origin: value.origin,
          }));

        related = shuffleArray(related);
      }

      setSimilarProducts(related);
      setCurrentIndex(0);
      setLoading(false);
    }, 300);
  }, []);

  useEffect(() => {
    loadProduct(category, subcategory);
  }, [category, subcategory, loadProduct]);

  /* =========================
     CATEGORY HELPERS
  ========================= */
  function findSubcategoryName(cat, subcatKey) {
    const catData = categoryStructure.find(
      (c) => c.name.toLowerCase().replace(/\s+/g, "") === cat.toLowerCase()
    );
    if (!catData) return null;

    for (const sub of catData.subcategories) {
      if (sub.children) {
        const match = sub.children.find((child) =>
          subcatKey
            .toLowerCase()
            .includes(child.toLowerCase().replace(/\s+/g, ""))
        );
        if (match) return sub.name;
      } else {
        if (
          subcatKey
            .toLowerCase()
            .includes(sub.name.toLowerCase().replace(/\s+/g, ""))
        ) {
          return sub.name;
        }
      }
    }
    return null;
  }

  function findSubcategoryKeys(cat, subCatName) {
    const catData = categoryStructure.find(
      (c) => c.name.toLowerCase().replace(/\s+/g, "") === cat.toLowerCase()
    );
    if (!catData) return [];

    const sub = catData.subcategories.find(
      (s) =>
        s.name.toLowerCase().replace(/\s+/g, "") ===
        subCatName.toLowerCase().replace(/\s+/g, "")
    );

    if (!sub) return [];

    if (sub.children) {
      return sub.children
        .map((child) =>
          Object.keys(productData[cat]).find((k) =>
            k.toLowerCase().includes(child.toLowerCase().replace(/\s+/g, ""))
          )
        )
        .filter(Boolean);
    }

    return Object.keys(productData[cat]).filter((k) =>
      k.toLowerCase().includes(sub.name.toLowerCase().replace(/\s+/g, ""))
    );
  }

  /* =========================
     MEDIA HANDLING
  ========================= */
  const currentMedia = useMemo(
    () => product?.images?.[currentIndex],
    [product, currentIndex]
  );

  const isVideo = useMemo(
    () => currentMedia?.toLowerCase().endsWith(".mp4"),
    [currentMedia]
  );

  useEffect(() => {
    if (!isVideo || !videoRef.current) return;

    videoRef.current.play().catch(() => {});
    return () => {
      videoRef.current?.pause();
      if (videoRef.current) videoRef.current.currentTime = 0;
    };
  }, [isVideo, currentIndex]);

  /* =========================
     IMAGE ZOOM
  ========================= */
  const handleMouseMove = useCallback((e) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();

    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: "scale(2)",
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setZoomStyle({ transform: "scale(1)" });
  }, []);

  if (loading) return <ProductSkeleton />;
  if (!product) return null;

  /* =========================
     RENDER
  ========================= */
  return (
    <>
      <div className={styles.detailsWrapper}>
        <div className={styles.mainCard}>
          <div className={styles.mediaWrapper}>
            <div className={styles.mainMedia}>
              {isVideo ? (
                <video
                  ref={videoRef}
                  controls
                  muted
                  className={styles.carouselMedia}
                >
                  <source src={currentMedia} type="video/mp4" />
                </video>
              ) : (
                <img
                  src={currentMedia}
                  alt={product.name}
                  className={styles.carouselMedia}
                  style={zoomStyle}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  onError={(e) => {
                    e.target.src = "/Images/imgNotFound.avif";
                  }}
                />
              )}
            </div>

            <div className={styles.thumbnailStrip}>
              {product.images.map((media, idx) => (
                <div
                  key={idx}
                  className={`${styles.thumbnail} ${
                    idx === currentIndex ? styles.activeThumbnail : ""
                  }`}
                  onClick={() => setCurrentIndex(idx)}
                >
                  {media.endsWith(".mp4") ? (
                    <video muted>
                      <source src={media} type="video/mp4" />
                    </video>
                  ) : (
                    <img src={media} alt={`Thumbnail ${idx}`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className={styles.infoSection}>
            <h1 className={styles.productTitle}>{product.name}</h1>

            {/* Product Attributes */}
            <div className={styles.productAttributes}>
              {Object.entries(product)
                .filter(
                  ([key]) =>
                    !["name", "images", "description"].includes(key) &&
                    product[key]
                )
                .map(([key, value]) => (
                  <div key={key} className={styles.attributeItem}>
                    <span className={styles.attributeKey}>
                      {key.toUpperCase()}:
                    </span>
                    <span className={styles.attributeValue}>{value}</span>
                  </div>
                ))}
            </div>

            {/* Product Description */}
            {product.description && (
              <div className={styles.productDescription}>
                {product.description}
              </div>
            )}

            <button
              className={styles.sendEnquiryBtn}
              onClick={() => {
                setProductDetails({ ...product, category, subcategory });
                openForm();
              }}
            >
              Send Enquiry
            </button>
          </div>
        </div>

        <div className={styles.similarWrapper}>
          <h2>Similar Products</h2>
          <div className={styles.relatedGrid}>
            {similarProducts.map((item) => (
              <div
                key={item.key}
                className={styles.relatedCard}
                onClick={() => navigate(`/${category}/${item.key}`)}
              >
                <img src={item.image} alt={item.name} />
                <p>{item.name}</p>
                <p>{item.thickness}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {blogData && <ProductsBlog categoryData={blogData} />}
    </>
  );
};

export default ProductDetails;
