import React from "react";

const Heading = ({ title }) => {
  const headingStyle = {
    fontSize: "32px",
    fontWeight: "bold",
    borderBottom: "2px solid #333",
    paddingBottom: "8px",
    marginBottom: "20px",
    marginTop:"15px",
    textAlign: "center",
    color: "white",
    textTransform: "uppercase",
    fontFamily: "Arial, sans-serif",
    letterSpacing: "1px",
    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
    position: "relative",
    zIndex: "2"
  };

  return <h2 style={headingStyle}>{title}</h2>;
};

export default Heading;
