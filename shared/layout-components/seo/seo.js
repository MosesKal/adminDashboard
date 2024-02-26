import React from "react";
import Head from "next/head";

const Seo = ({ title }) => {
  let pageTitle = `Fikiri - ${title}`;
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content="Fikiri|Dashboard" />
        <meta name="author" content="MosesDev Private Limited" />
        <meta
          name="keywords"
          content="adminfikiri, fikiri, dashboard fikiri"
        />
      </Head>
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap"
        rel="stylesheet"
      />
    </>
  );
};

export default Seo;



