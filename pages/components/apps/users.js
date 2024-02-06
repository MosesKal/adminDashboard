import React from "react";
import {
  Button,
  Breadcrumb,
} from "react-bootstrap";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Seo from "@/shared/layout-components/seo/seo";


const Userlistcom = dynamic(
  () => import("@/shared/data/advancedui/userlistcom"),
  { ssr: false }
);

const Userlist = () => {
  const router = useRouter();
  return (
      <div>
        <Seo title={"Liste d'innovateurs"}/>
        <div className="breadcrumb-header justify-content-between">
          <div className="left-content">
          <span className="main-content-title mg-b-0 mg-b-lg-1">
            LISTE DES INNOVATEURS
          </span>
          </div>
          <div className="justify-content-center mt-2">
            <Breadcrumb className="breadcrumb">
              <Button variant="" type="button" className="btn button-icon btn-sm btn-outline-secondary me-1"
                      onClick={() => router.back()}>
                <i class="bi bi-arrow-left"></i> <span className="ms-1">{"Retour"}</span>
              </Button>
            </Breadcrumb>
          </div>
        </div>
        <Userlistcom/>
      </div>
  );
};

Userlist.propTypes = {};

Userlist.defaultProps = {};

Userlist.layout = "Contentlayout";
export default Userlist;
