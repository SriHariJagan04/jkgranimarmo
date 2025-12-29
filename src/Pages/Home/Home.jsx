import React, { useEffect, useRef } from "react";
import styles from "./home.module.css";
import { Link } from "react-router-dom";

const Home = () => {
  const contentRef = useRef(null);

  // Scroll hide effect (optimized)
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          el.classList.toggle(styles.hide, window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Defer video loading (LCP win)
  useEffect(() => {
    const video = document.getElementById("heroVideo");
    if (video) {
      video.src = "/Videos/homeVideo.mp4";
      video.load();
    }
  }, []);

  return (
    <section className={styles.heroSection}>
      <div className={styles.overlay} />

      <video
        id="heroVideo"
        className={styles.video}
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        poster="/Images/video-poster.webp"
      />

      {/* LCP CONTENT – NO ANIMATION ON LOAD */}
      <div ref={contentRef} className={styles.content}>
        <h1>✨ JK Granimarmo – where natural stone becomes soulful art</h1>
        <p data-lcp="true">
          At JK Granimarmo, we breathe life into stone – offering premium
          Granite, Marble (Indian & Imported), Sandstone, and Tiles that blend
          timeless beauty with modern durability. With over 20 years of legacy,
          we are proud to be a trusted name among architects, builders, and
          homeowners across India. Whether it’s Italian elegance, Rajasthan’s
          richness, or contemporary tiles, our curated collections elevate every
          design vision. We deliver factory-direct pricing, unmatched
          craftsmanship, and end-to-end solutions for floors and walls.
        </p>

        {/* CTA BUTTON */}
        <Link to="/our-products" className={styles.ctaBtn}>
          View Products
        </Link>
      </div>
    </section>
  );
};

export default Home;
