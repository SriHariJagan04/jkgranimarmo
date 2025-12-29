import React, { useState, lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ArrowBigDownDash, CircleX } from "lucide-react";

import LoadingScreen from "./Components/LoadingScreen";
import ErrorBoundary from "./Components/ErrorBoundary";
import EnquiryForm from "./EnquiryForm/EnquiryForm";
import ScrollToTop from "./Utils/ScrollToTop";
import usePageSEO from "./Utils/usePageSEO.JS";

/* =========================
   LAZY IMPORTS
========================= */
const Navbar = lazy(() => import("./Components/Navbar/Navbar"));
const Footer = lazy(() => import("./Pages/Footer/Footer"));

const Home = lazy(() => import("./Pages/Home/Home"));
const LatestProducts = lazy(() =>
  import("./Pages/LatestProducts/LatestProducts")
);
const OurWebsite = lazy(() => import("./Pages/OurWebsite/OurWebsite"));
const OurCompany = lazy(() => import("./Pages/OurCompany/OurCompany"));
const ContactPage = lazy(() => import("./Pages/ContactPage/ContactPage"));
const NewContactPage = lazy(() =>
  import("./Pages/NewContactPage/NewContactPage")
);
const About = lazy(() => import("./Pages/About/About"));
const Login = lazy(() => import("./Pages/Login/Login"));
const Faqs = lazy(() => import("./Pages/Faqs/Faqs"));
const OurProducts = lazy(() => import("./Pages/OurProducts/OurProducts"));
const ProductDetails = lazy(() =>
  import("./Components/ProductDetails/ProductDetails")
);

const CategoryPage = lazy(() =>
  import("./Pages/CategoryPage/CategoryPage")
);

/* =========================
   HOME COMPOSITE
========================= */
const HomePage = ({ setProductDetails, openForm }) => (
  <>
    <Home />
    <LatestProducts setProductDetails={setProductDetails} openForm={openForm} />
    <OurWebsite setProductDetails={setProductDetails} openForm={openForm} />
    <OurCompany />
    <ContactPage />
    <Faqs />
  </>
);

const App = () => {
  const [showForm, setShowForm] = useState(false);
  const [productDetails, setProductDetails] = useState(null);

  const toggleForm = () => setShowForm((p) => !p);

  const closeFormHandler = () => {
    setShowForm(false);
    setProductDetails(null);
  };

  usePageSEO()
  return (
    <div className="appContainer" style={{ animation: "fadeIn 0.6s ease-in" }}>
      {/* Floating Enquiry Button */}
      {!showForm && (
        <button className="enquiryFormBtn" onClick={toggleForm}>
          <ArrowBigDownDash />
          Submit Your Requirement
        </button>
      )}

      {/* Enquiry Modal */}
      {showForm && (
        <div className="enquiryOverlay" onClick={closeFormHandler}>
          <div className="enquiryModal" onClick={(e) => e.stopPropagation()}>
            <button id="closeBtn" onClick={closeFormHandler}>
              <CircleX size={30} />
            </button>
            <EnquiryForm
              closeForm={closeFormHandler}
              productDetails={productDetails}
            />
          </div>
        </div>
      )}

      <ScrollToTop />

      {/* =========================
          APP SHELL
      ========================== */}
      <Suspense fallback={<LoadingScreen />}>
        <Navbar />

        <ErrorBoundary>
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  setProductDetails={setProductDetails}
                  openForm={() => setShowForm(true)}
                />
              }
            />

            <Route path="/about-us" element={<About />} />
            <Route path="/our-products" element={<OurProducts />} />
            <Route path="/contact" element={<NewContactPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/:category" element={<CategoryPage />} />

            <Route
              path="/:category/:subcategory"
              element={
                <ProductDetails
                  setProductDetails={setProductDetails}
                  openForm={() => setShowForm(true)}
                />
              }
            />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </ErrorBoundary>

        <Footer />
      </Suspense>
    </div>
  );
};

export default App;
