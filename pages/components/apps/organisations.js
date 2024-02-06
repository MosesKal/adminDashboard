import React, { useState, useEffect, useRef, createRef } from "react";
import {
  Button,
  Row,
  Col,
  Card,
  Form,
  FormGroup,
  Modal,
  Breadcrumb,
} from "react-bootstrap";
import Link from "next/link";
import {useRouter} from "next/router";
import dynamic from "next/dynamic";
import Seo from "@/shared/layout-components/seo/seo";
const Settingscom = dynamic(
  () => import("@/shared/data/advancedui/organisationCom"),
  { ssr: false }
);
import axios from "@/pages/api/axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
const Settings = () => {
  const router= useRouter();
  const [show, setShow] = React.useState(false);
  const name = createRef();
  const [isLoadingCreating, setIsLoadingCreating] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [roles, setRoles] = useState([]);


  useEffect(() => {
    if (
      JSON.parse(localStorage.getItem("ACCESS_ACCOUNT")).roles[0].name ===
      "ADMIN"
    ) {
      setIsAdmin(true);
    }
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const updateRoles = async () => {
    try {
      const responseRoles = await axios.get("/organisations");
      const dataRoles = responseRoles.data.data;
      setRoles(dataRoles);
    } catch (error) {
      console.error("Erreur lors de la mise à jour des données");
    }
  };

  const handleCreateRole = async (e) => {
    e.preventDefault();

    try {
      setIsLoadingCreating(true);
      const payload = {
        name: name.current.value,
      };

      await axios.post("/organisations", JSON.stringify(payload));
      toast.success("Organisation créée avec succès !");
      handleClose();
      setIsLoadingCreating(false);
      await updateRoles();
    } catch (error) {
      toast.error(error.response.data.message);
      setIsLoadingCreating(false);
    } finally {
      setIsLoadingCreating(false);
    }
  };

  return (
      <div>
        <Seo title={"List Organisations"}/>

        <div className="breadcrumb-header justify-content-between">
          <div className="left-content">
				  <span className="main-content-title mg-b-0 mg-b-lg-1">
					LISTE DES RÔLES
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
        <div className="breadcrumb-header justify-content-between">
          <div className="left-content mt-2">
            <Button
                className="btn ripple btn-primary"
                onClick={handleShow}
                size="sm"
            >
              <i className="fe fe-plus me-2"></i>
              {"Nouvelle Organisation"}
            </Button>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header className="modal-header">
                <h6 className="modal-title">{"Ajouter Organisation"}</h6>
                <Button
                    variant=""
                    className="btn-close"
                    type="button"
                    onClick={handleClose}
                >
                  <span aria-hidden="true">×</span>
                </Button>
              </Modal.Header>

              <Modal.Body className="modal-body">
                <div className="p-4">
                  <Form className="form-horizontal">
                    <FormGroup className="form-group">
                      <Form.Control
                          type="text"
                          className="form-control"
                          id="inputName"
                          placeholder="Nom"
                          ref={name}
                      />
                    </FormGroup>
                  </Form>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button
                    variant=""
                    className="btn ripple btn-primary"
                    type="button"
                    onClick={handleCreateRole}
                >
                  {isLoadingCreating ? "Ajout en cour..." : "Ajouter"}
                </Button>
                <Button
                    variant=""
                    className="btn ripple btn-secondary"
                    onClick={handleClose}
                >
                  Fermer
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
        <Settingscom updateRoles={setRoles}/>
      </div>
  );
};

Settings.propTypes = {};

Settings.defaultProps = {};

Settings.layout = "Contentlayout";

export default Settings;
