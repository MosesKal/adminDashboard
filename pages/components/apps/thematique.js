import React from "react";
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
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Seo from "@/shared/layout-components/seo/seo";
import Title from "../components/Title";
const Thematiquecom = dynamic(
  () => import("@/shared/data/advancedui/thematiquecom"),
  { ssr: false }
);

const Thematique = () => {
  const router = useRouter();
  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <Seo title={"Thématique List"} />

      <Title title={"LISTE DES THEMATIQUES"} />
      <div className="breadcrumb-header justify-content-between">
        <div className="left-content mt-2">
          <Button
            className="btn ripple btn-primary"
            size="sm"
            onClick={handleShow}
          >
            <i className="fe fe-plus me-2"></i>
            {"Nouvelle thématique"}
          </Button>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header className="modal-header">
              <h6 className="modal-title">{"Ajouter Thématique"}</h6>
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
                    />
                  </FormGroup>
                  <FormGroup className="form-group">
                    <Form.Control
                      type="text"
                      className="form-control"
                      id="inputName1"
                      placeholder="odds"
                    />
                  </FormGroup>
                  <FormGroup className="form-group">
                    <Form.Control
                      type="text"
                      className="form-control"
                      id="inputName1"
                      placeholder="challengs"
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
              >
                Ajouter
              </Button>
              <Button
                variant=""
                className="btn ripple btn-secondary btn-danger"
                onClick={handleClose}
              >
                Fermer
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
      <Thematiquecom />
    </div>
  );
};

Thematique.propTypes = {};

Thematique.defaultProps = {};

Thematique.layout = "Contentlayout";

export default Thematique;
