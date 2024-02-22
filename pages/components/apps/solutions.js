import React from "react";

import {
  Breadcrumb, Button
} from "react-bootstrap";

import dynamic from "next/dynamic";
import Seo from "@/shared/layout-components/seo/seo";
import {useRouter} from "next/router";
import Title from "../components/Title";



const Solutionslistcom = dynamic(
  () => import("@/shared/data/advancedui/solutionslistcom"),
  { ssr: false }
);

const Solutionlist = () => {
  const router = useRouter()

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
