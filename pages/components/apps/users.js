import React from "react";
import {
  Button,
  Breadcrumb,
} from "react-bootstrap";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Seo from "@/shared/layout-components/seo/seo";
import Title from "../components/Title";


const Userlistcom = dynamic(
  () => import("@/shared/data/advancedui/userlistcom"),
  { ssr: false }
);

const Userlist = () => {
  const router = useRouter();
  return (
      <div>
        <Seo title={"Liste d'innovateurs"}/>
        <Title title={"LISTE DES INNOVATEURS"}/>
        <Userlistcom/>
      </div>
  );
};

Userlist.propTypes = {};

Userlist.defaultProps = {};

Userlist.layout = "Contentlayout";
export default Userlist;
