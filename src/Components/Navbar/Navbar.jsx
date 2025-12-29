// Navbar.jsx
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import classNames from "classnames";
import {
  Menu,
  Search,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  ChevronRight,
  Sun,
  Moon,
  X,
} from "lucide-react";
import styles from "./navbar.module.css";
import categories from "../../Constant/categories.json";
import { toLowerCase } from "../../Utils/toLowerCase";

// Animation variants
const dropdownVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
};
const childDropdownVariants = {
  initial: { opacity: 0, x: 10 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 10 },
};
const mobileMenuVariants = {
  initial: { x: "100%" },
  animate: { x: 0 },
  exit: { x: "100%" },
};
const overlayVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};
const searchInputVariants = {
  initial: { width: 0, opacity: 0 },
  animate: { width: 250, opacity: 1 },
  exit: { width: 0, opacity: 0 },
};

// Hooks
const useScrollDirection = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  const lastScrollY = useRef(0);
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return showNavbar;
};

const useClickOutside = (ref, callback) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [ref, callback]);
};

const useBodyScrollLock = (isLocked) => {
  useEffect(() => {
    if (isLocked) {
      document.body.classList.add(styles.noScroll);
    } else {
      document.body.classList.remove(styles.noScroll);
    }
    return () => document.body.classList.remove(styles.noScroll);
  }, [isLocked]);
};

const useTheme = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    if (saved !== null) {
      return JSON.parse(saved);
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    if (darkMode) {
      document.body.classList.add("dark-theme");
    } else {
      document.body.classList.remove("dark-theme");
    }
  }, [darkMode]);
  const toggleTheme = useCallback(() => {
    setDarkMode((prev) => !prev);
  }, []);
  return { darkMode, toggleTheme };
};

// Utility
const generatePath = (category, subcategory = null, child = null) => {
  let path = `/${category.toLowerCase().replace(/\s+/g, "-")}`;
  if (subcategory) {
    path += `/${subcategory.toLowerCase().replace(/\s+/g, "-")}`;
  }
  if (child) {
    path += `-${child.toLowerCase().replace(/\s+/g, "-")}`;
  }
  return path;
};

// Desktop Dropdown
const DesktopDropdown = ({
  category,
  categoryIndex,
  hoveredCategory,
  hoveredSubcategory,
  setHoveredCategory,
  setHoveredSubcategory,
  location,
}) => {
  const catPath = `/${category.name.toLowerCase().replace(/\s+/g, "-")}`;
  const isCategoryActive = location.pathname.startsWith(catPath);

  return (
    <div className={styles.dropdownWrapperOuter}>
      <li
        onMouseEnter={() => setHoveredCategory(categoryIndex)}
        className={styles.dropdownWrapper}
      >
        <span
          className={classNames(styles.dropdownTitle, {
            [styles.activeLink]: isCategoryActive,
          })}
        >
          <span className={styles.hoverElement} onClick={() =>setHoveredCategory(null)}>
            <Link to={catPath}> {category.name}</Link>
            {hoveredCategory === categoryIndex ? (
              <ChevronUp size={16} />
            ) : (
              <ChevronDown size={16} />
            )}
          </span>
        </span>

        <AnimatePresence>
          {hoveredCategory === categoryIndex &&
            category.subcategories &&
            category.subcategories.length > 0 && (
              <motion.ul
                variants={dropdownVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className={styles.dropdown}
              >
                <div className={styles.addBar}>
                  {category.subcategories.map((sub, subIdx) => (
                    <div key={sub.name} className={styles.subcategoryWrapper}>
                      <li
                        className={classNames(styles.subcategoryItem, {
                          [styles.activeSubcategory]:
                            hoveredSubcategory === subIdx,
                        })}
                        onClick={() => {
                          if (sub.children && sub.children.length > 0) {
                            setHoveredSubcategory(
                              hoveredSubcategory === subIdx ? null : subIdx
                            );
                          } else {
                            setHoveredCategory(null);
                          }
                        }}
                      >
                        {sub.children && sub.children.length > 0 ? (
                          <span className={styles.subcategoryLabel}>
                            {toLowerCase(sub.name)}
                            <ChevronRight
                              size={14}
                              className={styles.chevronRight}
                            />
                          </span>
                        ) : (
                          <NavLink
                            to={generatePath(category.name, sub.name)}
                            className={({ isActive }) =>
                              isActive ? styles.activeLink : undefined
                            }
                            onClick={() => setHoveredCategory(null)}
                          >
                            <span className={styles.hoverElement}>
                              {toLowerCase(sub.name)}
                            </span>
                          </NavLink>
                        )}
                      </li>

                      <AnimatePresence>
                        {hoveredSubcategory === subIdx &&
                          sub.children &&
                          sub.children.length > 0 && (
                            <motion.ul
                              variants={childDropdownVariants}
                              initial="initial"
                              animate="animate"
                              exit="exit"
                              className={styles.childrenDropdown}
                            >
                              {sub.children.map((child) => (
                                <li key={child}>
                                  <NavLink
                                    to={generatePath(
                                      category.name,
                                      sub.name,
                                      child
                                    )}
                                    className={({ isActive }) =>
                                      isActive ? styles.activeLink : undefined
                                    }
                                    onClick={() => setHoveredCategory(null)}
                                  >
                                    <span className={styles.hoverElement}>
                                      {toLowerCase(child)}
                                    </span>
                                  </NavLink>
                                </li>
                              ))}
                            </motion.ul>
                          )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </motion.ul>
            )}
        </AnimatePresence>
      </li>
    </div>
  );
};



// Mobile Menu Content
// ==========================
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
  const [mobileSearch, setMobileSearch] = useState("");
  const [mobileResults, setMobileResults] = useState([]);

  const navigate = useNavigate();

  // ✅ Handle search inside mobile
  const handleMobileSearch = (e) => {
    const term = e.target.value;
    setMobileSearch(term);

    if (term.trim().length < 2) {
      setMobileResults([]);
      return;
    }

    const lowerTerm = term.toLowerCase();
    const results = [];

    categories.forEach((cat) => {
      Array.isArray(cat.subcategories) &&
        cat.subcategories.forEach((sub) => {
          if (Array.isArray(sub.children)) {
            sub.children.forEach((child) => {
              if (child.toLowerCase().includes(lowerTerm)) {
                results.push({
                  name: child,
                  path: generatePath(cat.name, sub.name, child),
                });
              }
            });
          }
        });
    });

    setMobileResults(results);
  };

  // ✅ Root Level
  if (!activeMobileCategory) {
    return (
      <ul className={styles.mobileList}>
        <li className={styles.closeButton}>
          <X size={28} onClick={() => setMobileOpen(false)} />
        </li>

        {/* 🔍 Search input with suggestions */}
        {/* <li className={styles.searchWrapper}>
          <input
            type="text"
            value={mobileSearch}
            onChange={handleMobileSearch}
            placeholder="Search products..."
            className={styles.searchInput}
          />
          <Search size={18} />

          {mobileSearch && mobileResults.length > 0 && (
            <ul className={styles.suggestionsList}>
              {mobileResults.map((item, idx) => (
                <li
                  key={idx}
                  onClick={() => {
                    navigate(item.path);
                    handleSubLinkClick();
                    setMobileSearch("");
                    setMobileResults([]);
                  }}
                >
                  {item.name}
                </li>
              ))}
            </ul>
          )}
        </li> */}

        {/* Static Links */}
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

        {/* Categories */}
        {categories.map((cat) => {
          const catPath = `/${cat.name.toLowerCase().replace(/\s+/g, "")}`;
          const isActive = location.pathname.startsWith(catPath);
          return (
            <li
              key={cat.name}
              onClick={() => {
                if (
                  Array.isArray(cat.subcategories) &&
                  cat.subcategories.length > 0
                ) {
                  setActiveMobileCategory(cat);
                } else {
                  handleSubLinkClick();
                  navigate(catPath);
                }
              }}
              className={isActive ? styles.activeLink : ""}
            >
              {cat.name}
              {Array.isArray(cat.subcategories) &&
                cat.subcategories.length > 0 && <ChevronRight size={16} />}
            </li>
          );
        })}

        {/* Contact */}
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

  // ✅ Subcategory Level
  if (activeMobileCategory && !activeMobileSubcategory) {
    return (
      <ul className={styles.mobileList}>
        <li
          onClick={() => setActiveMobileCategory(null)}
          className={styles.backButton}
        >
          <ArrowLeft size={20} /> Back
        </li>
        {Array.isArray(activeMobileCategory.subcategories) &&
          activeMobileCategory.subcategories.map((sub) => {
            const subPath = generatePath(activeMobileCategory.name, sub.name);
            const isActive = location.pathname.startsWith(subPath);
            return (
              <li
                key={sub.name}
                onClick={() => {
                  if (Array.isArray(sub.children) && sub.children.length > 0) {
                    setActiveMobileSubcategory(sub);
                  } else {
                    handleSubLinkClick();
                    navigate(subPath);
                  }
                }}
                className={isActive ? styles.activeLink : ""}
              >
                {sub.name}
                {Array.isArray(sub.children) && sub.children.length > 0 && (
                  <ChevronRight size={16} />
                )}
              </li>
            );
          })}
      </ul>
    );
  }

  // ✅ Children Level
  if (activeMobileSubcategory) {
    return (
      <ul className={styles.mobileList}>
        <li
          onClick={() => setActiveMobileSubcategory(null)}
          className={styles.backButton}
        >
          <ArrowLeft size={20} /> Back
        </li>
        {Array.isArray(activeMobileSubcategory.children) &&
          activeMobileSubcategory.children.map((child) => {
            const childPath = generatePath(
              activeMobileCategory.name,
              activeMobileSubcategory.name,
              child
            );
            const isActive = location.pathname === childPath;
            return (
              <li
                key={child}
                onClick={() => {
                  handleSubLinkClick();
                  navigate(childPath);
                }}
                className={isActive ? styles.activeLink : ""}
              >
                {child}
              </li>
            );
          })}
      </ul>
    );
  }

  return null;
};

// Main Navbar
const Navbar = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMobileCategory, setActiveMobileCategory] = useState(null);
  const [activeMobileSubcategory, setActiveMobileSubcategory] = useState(null);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [hoveredSubcategory, setHoveredSubcategory] = useState(null);

  const navbarRef = useRef(null);
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const searchRef = useRef(null);

  const showNavbar = useScrollDirection();
  const { darkMode, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const staticLinks = useMemo(() => ["Home", "About Us", "Our Products"], []);

  // ✅ Close desktop dropdown on outside click
  useClickOutside(dropdownRef, () => {
    setHoveredCategory(null);
    setHoveredSubcategory(null);
  });

  useClickOutside(searchRef, () => {
    if (searchOpen) {
      setSearchOpen(false);
      setSearchTerm("");
      setSearchResults([]);
      setHoveredCategory(null);
      setHoveredSubcategory(null);
    }
  });

  // ✅ Close mobile menu on outside click
  useClickOutside(mobileMenuRef, () => {
    if (mobileOpen) {
      setMobileOpen(false);
      setActiveMobileCategory(null);
      setActiveMobileSubcategory(null);
    }
  });

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (!term.trim()) {
      setSearchResults([]);
      return;
    }

    const lowerTerm = term.toLowerCase();
    const results = [];

    categories.forEach((cat) => {
      cat.subcategories.forEach((sub) => {
        if (sub.children) {
          sub.children.forEach((child) => {
            if (child.toLowerCase().includes(lowerTerm)) {
              results.push({
                name: child, // Only product name
                path: generatePath(cat.name, sub.name, child),
              });
            }
          });
        }
      });
    });

    setSearchResults(results);
  };

  return (
    <nav
      ref={navbarRef}
      className={classNames(styles.navbar, {
        [styles.navHidden]: !showNavbar,
      })}
    >
      <div className={styles.logo}>
        <Link to="/">
          <img
            src="/Images/logo2.png"
            alt="Company logo"
            width="200"
            height="40"
            fetchpriority="high"
            decoding="sync"
          />
        </Link>
      </div>

      <div className={styles.desktopNav} ref={dropdownRef}>
        <ul className={styles.navList}>
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

                onClick={() => setHoveredCategory(null)}
              >
                {link}
              </NavLink>
            </li>
          ))}

          {categories.map((cat, catIdx) => (
            <DesktopDropdown
              key={cat.name}
              category={cat}
              categoryIndex={catIdx}
              hoveredCategory={hoveredCategory}
              hoveredSubcategory={hoveredSubcategory}
              setHoveredCategory={setHoveredCategory}
              setHoveredSubcategory={setHoveredSubcategory}
              location={location}
            />
          ))}

          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive ? styles.activeLink : undefined
              }
               onClick={() => setHoveredCategory(null)}
            >
              Contact Us
            </NavLink>
          </li>

          <li className={styles.searchIcon} ref={searchRef}>
            <AnimatePresence>
              {searchOpen && (
                <motion.div style={{ position: "relative" }} className={styles.searchContainer}>
                  <motion.input
                    variants={searchInputVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.2 }}
                    className={styles.searchInput}
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    autoFocus
                  />
                  {searchResults.length > 0 && (
                    <ul className={styles.searchDropdown}>
                      {searchResults.map((item, idx) => (
                        <li
                          key={idx}
                          onClick={() => {
                            navigate(item.path);
                            setSearchOpen(false);
                            setSearchTerm("");
                            setSearchResults([]);
                          }}
                        >
                          {item.name}
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
            <Search size={20} onClick={() => setSearchOpen((p) => !p)} className={styles.searchIcon} />
          </li>

          <li className={styles.themeToggle} onClick={toggleTheme}>
            {darkMode ? <Sun size={22} /> : <Moon size={22} />}
          </li>
        </ul>
      </div>

      {/* Mobile Navigation */}
      <div className={styles.mobileNav}>
        <Menu size={30} onClick={() => setMobileOpen(true)} />
        <span onClick={toggleTheme}>
          {darkMode ? <Sun size={22} /> : <Moon size={22} />}
        </span>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              className={styles.overlay}
              variants={overlayVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.2 }}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              className={styles.mobileMenu}
              ref={mobileMenuRef}
              variants={mobileMenuVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <MobileMenuContent
                activeMobileCategory={activeMobileCategory}
                activeMobileSubcategory={activeMobileSubcategory}
                setActiveMobileCategory={setActiveMobileCategory}
                setActiveMobileSubcategory={setActiveMobileSubcategory}
                setMobileOpen={setMobileOpen}
                staticLinks={staticLinks}
                categories={categories}
                location={location}
                handleSubLinkClick={() => {
                  setActiveMobileCategory(null);
                  setActiveMobileSubcategory(null);
                  setMobileOpen(false);
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
