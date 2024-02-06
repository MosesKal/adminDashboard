import React, { useEffect } from "react";

const Landingpagelayout = ({ children }) => {
  const Add = () => {
    document
      .querySelector("body")
      .classList.add(
        "app",
        "sidebar-mini",
        "ltr",
        "landing-page",
        "horizontalmenu"
      );
  };
  useEffect(() => {
    Add();
  }, []);

  return (
      <div>{children}</div>
  );
};

export default Landingpagelayout;
