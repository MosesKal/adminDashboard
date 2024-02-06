import React from "react";
import Head from "next/head";

const Seo = ({ title }) => {
  let i = `Fikiri - ${title}`;
  return (
    <Head>
      <title>{i}</title>
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap"
        rel="stylesheet"
      ></link>
      <meta name="description" content="Fikiri|Dashboard" />
      <meta name="author" content="Spruko Technologies Private Limited" />
      <meta
        name="keywords"
        content="react bootstrap dashboard
admin dashboard template
react nextjs admin template
react next js admin dashboard
admin dashboard nextjs
next js admin dashboard
admin panel template react bootstrap
react bootstrap dashboard template
nextjs dashboard
next js dashboard template
react bootstrap admin template
react next js admin panel dashboard template
react admin dashboard template
dashboard template react bootstrap
admin and dashboard template"
      ></meta>
    </Head>
  );
};

export default Seo;
