import React from "react";

import {
  Breadcrumb, Button
} from "react-bootstrap";

import dynamic from "next/dynamic";
import Seo from "@/shared/layout-components/seo/seo";
import {useRouter} from "next/router";


const Solutionslistcom = dynamic(
  () => import("@/shared/data/advancedui/solutionslistcom"),
  { ssr: false }
);

const Solutionlist = () => {
  const router = useRouter()
  return (
    <div>
      <Seo title={"User List"} />

      <div className="breadcrumb-header justify-content-between">
        <div className="left-content">
          <span className="main-content-title mg-b-0 mg-b-lg-1">
            LISTE DES SOLUTIONS
          </span>
        </div>
        <div className="justify-content-center mt-2">
          <Breadcrumb className="breadcrumb">
            <Button variant="" type="button" className="btn button-icon btn-sm btn-outline-secondary me-1" onClick={()=>router.back()}>
              <i class="bi bi-arrow-left"></i> <span className="ms-1">{"Retour"}</span>
            </Button>
          </Breadcrumb>
        </div>
      </div>
      <Solutionslistcom />
    </div>
  );
};

Solutionlist.propTypes = {};

Solutionlist.defaultProps = {};

Solutionlist.layout = "Contentlayout";

export default Solutionlist;
