import React from "react";
import { GridLoader } from "react-spinners";

const LoadingScreen = () => {
  const containerStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    height: "100vh",
    width: "100vw",
    backgroundColor: "var(--primary-bg)",
    color: "var(--primary-text)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    zIndex: 9999,
    padding: "1rem",
    animation: "fadeIn 0.4s ease-in-out"
  };

  return (
    <div style={containerStyle}>
      <GridLoader color="#0fddf7" size={window.innerWidth < 500 ? 80 : 40} />
    </div>
  );
};

export default LoadingScreen;
