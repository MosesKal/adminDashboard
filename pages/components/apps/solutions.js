import React from "react";
import dynamic from "next/dynamic";
import Seo from "@/shared/layout-components/seo/seo";
import Title from "../components/Title";



const Solutionslistcom = dynamic(
  () => import("@/shared/data/advancedui/solutionslistcom"),
  { ssr: false }
);

const Solutionlist = () => {

  return (
    <div>
      <Seo title={"User List"} />
      <Title title={"LISTE DES SOLUTIONS"} />
      <Solutionslistcom />
    </div>
  );
};

Solutionlist.propTypes = {};

Solutionlist.defaultProps = {};

Solutionlist.layout = "Contentlayout";

export default Solutionlist;
