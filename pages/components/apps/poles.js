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
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Seo from "@/shared/layout-components/seo/seo";
const Polescom = dynamic(() => import("@/shared/data/advancedui/polescom"), {
  ssr: false,
});
import axios from "@/pages/api/axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import Title from "../components/Title";
const Poles = () => {
  const router = useRouter();
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
      const responseRoles = await axios.get("/roles");
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

      await axios.post("/poles", JSON.stringify(payload));
      toast.success("Rôle créé avec succès !");
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
      <Seo title={"Paramètre List"} />
      <Title title={"LISTE DES PÔLES"} />
      <div className="breadcrumb-header justify-content-between">
        <div className="left-content mt-2">
          <Button
            className="btn ripple btn-primary"
            onClick={handleShow}
            size="sm"
          >
            <i className="fe fe-plus me-2"></i>
            {"Nouveau Pôle"}
          </Button>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header className="modal-header">
              <h6 className="modal-title">{"Ajouter Pôle"}</h6>
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
      <Polescom updateRoles={setRoles} />
    </div>
  );
};

Poles.propTypes = {};

Poles.defaultProps = {};

Poles.layout = "Contentlayout";

export default Poles;
