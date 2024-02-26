import React, { useEffect } from "react";
import Head from "next/head";
import favicon from "../../../public/assets/img/brand/favicon.png";

const Authenticationlayout = ({ children }) => {
  useEffect(() => {
    if (document.body) {
      document
        .querySelector("body")
        .classList.add("ltr", "error-page1", "bg-primary");
    }

    return () => {
      document.body.classList.remove("ltr", "error-page1", "bg-primary");
    };
  }, []);

  return (
    <>
      <Head>
        <title>Fikiri|Dashboard</title>
        <meta name="description" content="Spruha" />
        <link rel="icon" href={favicon.src} />
      </Head>

      <div>{children}</div>
    </>
  );
};

export default Authenticationlayout;
