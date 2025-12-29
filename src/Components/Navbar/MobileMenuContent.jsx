import React from "react";
import { NavLink, generatePath } from "react-router-dom";
import { X, ChevronRight, ArrowLeft } from "lucide-react";
import styles from "./navbar.module.css";

// Mobile Menu Content
const MobileMenuContent = ({
  activeMobileCategory,
  activeMobileSubcategory,
  setActiveMobileCategory,
  setActiveMobileSubcategory,
  setMobileOpen,
  staticLinks,
  categories,
  location,
  handleSubLinkClick,
}) => {
  if (!activeMobileCategory) {
    return (
      <ul className={styles.mobileList}>
        <li className={styles.closeButton}>
          <X size={30} onClick={() => setMobileOpen(false)} />
        </li>
        {staticLinks.map((link) => (
          <li key={link}>
            <NavLink
              to={
                link === "Home"
                  ? "/"
                  : `/${link.toLowerCase().replace(/\s+/g, "-")}`
              }
              className={({ isActive }) =>
                isActive ? styles.activeLink : undefined
              }
              onClick={handleSubLinkClick}
            >
              {link}
            </NavLink>
          </li>
        ))}
        {categories.map((cat) => {
          const catPath = `/${cat.name.toLowerCase().replace(/\s+/g, "")}`;
          const isActive = location.pathname.startsWith(catPath);
          return (
            <li
              key={cat.name}
              onClick={() => {
                if (cat.subcategories && cat.subcategories.length > 0) {
                  setActiveMobileCategory(cat);
                } else {
                  handleSubLinkClick();
                }
              }}
              className={isActive ? styles.activeLink : ""}
            >
              {cat.name}
              {cat.subcategories && cat.subcategories.length > 0 && (
                <ChevronRight size={16} />
              )}
            </li>
          );
        })}
        <li>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? styles.activeLink : undefined
            }
            onClick={handleSubLinkClick}
          >
            Contact Us
          </NavLink>
        </li>
      </ul>
    );
  }

  if (!activeMobileSubcategory) {
    return (
      <ul className={styles.mobileList}>
        <li
          onClick={() => setActiveMobileCategory(null)}
          className={styles.backArrow}
        >
          <ArrowLeft size={22} /> Back
        </li>
        {activeMobileCategory.subcategories.map((sub) => (
          <li key={sub.name}>
            {sub.children && sub.children.length > 0 ? (
              <span
                onClick={() => setActiveMobileSubcategory(sub)}
                className={styles.subcategoryLabel}
              >
                {sub.name}
                <ChevronRight size={16} />
              </span>
            ) : (
              <NavLink
                to={generatePath(activeMobileCategory.name, sub.name)}
                className={({ isActive }) =>
                  isActive ? styles.activeLink : undefined
                }
                onClick={handleSubLinkClick}
              >
                {sub.name}
              </NavLink>
            )}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className={styles.mobileList}>
      <li
        onClick={() => setActiveMobileSubcategory(null)}
        className={styles.backArrow}
      >
        <ArrowLeft size={22} /> Back
      </li>
      {activeMobileSubcategory.children.map((child) => (
        <li key={child} onClick={handleSubLinkClick}>
          <NavLink
            to={generatePath(
              activeMobileCategory.name,
              activeMobileSubcategory.name,
              child
            )}
            className={({ isActive }) =>
              isActive ? styles.activeLink : undefined
            }
          >
            <span className={styles.subcategoryLabel}>{child}</span>
          </NavLink>
        </li>
      ))}
    </ul>
  );
};


export default MobileMenuContent;