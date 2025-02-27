import React, { useState, useEffect, createRef } from "react";
import { Button, Form, FormGroup, Modal, Breadcrumb } from "react-bootstrap";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Seo from "@/shared/layout-components/seo/seo";
import axios from "@/pages/api/axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Labelscom = dynamic(() => import("@/shared/data/advancedui/labelscom"), {
  ssr: false,
});

import Title from "../components/Title";

const Labels = () => {
  const router = useRouter();
  const [show, setShow] = React.useState(false);
  const mention = createRef();
  const average = createRef();
  const [isLoadingCreating, setIsLoadingCreating] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    if (
      JSON.parse(localStorage.getItem("ACCESS_ACCOUNT")).roles.includes("ADMIN")
    ) {
      setIsAdmin(true);
    }
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const updateRoles = async () => {
    const { data } = await axios.get("/quotations");
    setLabels(data.data);
  };

  const handleCreateRole = async (e) => {
    e.preventDefault();

    try {
      setIsLoadingCreating(true);
      const payload = {
        mention: mention.current.value,
        average: parseFloat(average.current.value),
      };

      await axios.post("/quotations", JSON.stringify(payload));
      toast.success("Impression créée avec succès !");
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
      <Seo title={"Liste Impression"} />
      <Title title={"LISTE DES IMPRESSIONS"} />
      <div className="breadcrumb-header justify-content-between">
        <div className="left-content mt-2">
          <Button
            className="btn ripple btn-primary"
            onClick={handleShow}
            size="sm"
          >
            <i className="fe fe-plus me-2"></i>
            {"Nouvelle Impression"}
          </Button>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header className="modal-header">
              <h6 className="modal-title">{"Ajouter Impression"}</h6>
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
                      placeholder="Mention"
                      ref={mention}
                    />
                  </FormGroup>

                  <FormGroup className="form-group">
                    <Form.Control
                      type="number"
                      className="form-control"
                      id="inputName"
                      placeholder="Côte"
                      ref={average}
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

      <Labelscom updateRoles={setLabels} />
    </div>
  );
};

Labels.propTypes = {};

Labels.defaultProps = {};

Labels.layout = "Contentlayout";

export default Labels;
