import React, { useState, useEffect, useRef, createRef } from "react";
import {
  Button,
  Row,
  Col,
  Card,
  Form,
  FormGroup,
  Modal,
  Breadcrumb, InputGroup,
} from "react-bootstrap";
import Link from "next/link";
import {useRouter} from "next/router";
import dynamic from "next/dynamic";
import Seo from "@/shared/layout-components/seo/seo";
const Settingscom = dynamic(
  () => import("@/shared/data/advancedui/callscom"),
  { ssr: false }
);
import axios from "@/pages/api/axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import DatePicker from "react-datepicker";
const Settings = () => {
  const router= useRouter();
  const [show, setShow] = React.useState(false);
  const [isLoadingCreating, setIsLoadingCreating] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [roles, setRoles] = useState([]);

  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");



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
      const responseRoles = await axios.get("/calls");
      const dataRoles = responseRoles.data.data;
      setRoles(dataRoles);
    } catch (error) {
      console.error("Erreur lors de la mise à jour des données");
    }
  };

  const handleCreateRole = async (e) => {
    e.preventDefault();

    const formattedStartDate = startDate.toLocaleDateString("fr-FR");
    const formattedEndDate = endDate.toLocaleDateString("fr-FR");


    try {
      setIsLoadingCreating(true);
      const payload = {
        name,
        startedAt: startDate,
        endedAt : endDate,
        description
      };

      await axios.post("/calls", JSON.stringify(payload));
      toast.success("Appel créé avec succès !");
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
        <Seo title={"Liste Appel"}/>

        <div className="breadcrumb-header justify-content-between">
          <div className="left-content">
				  <span className="main-content-title mg-b-0 mg-b-lg-1">
					{"LISTE D'APPELS"}
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
            <Button onClick={handleShow}>Nouvel Appel</Button>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Ajouter Appel</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group controlId="formName">
                    <Form.Label>Nom</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Nom"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="formStartDate">
                    <Form.Label>Date de début</Form.Label>
                    <InputGroup>
                      <InputGroup.Text className={"input-group-text"}>
                        <i className={"typcn typcn-calendar-outline tx-24 lh--9 op-6"}></i>
                      </InputGroup.Text>
                      <DatePicker
                          className="form-control"
                          selected={startDate}
                          onChange={(date) => setStartDate(date)}
                          dateFormat="dd/MM/yyyy"
                      />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group controlId="formEndDate">
                    <Form.Label>Date de fin</Form.Label>
                    <InputGroup className={"input-group reactdate-pic"}>
                      <InputGroup.Text className={"input-group-text"}>
                        <i className={"typcn typcn-calendar-outline tx-24 lh--9 op-6"}></i>
                      </InputGroup.Text>
                      <DatePicker
                          className="form-control "
                          selected={endDate}
                          onChange={(date) => setEndDate(date)}
                          dateFormat="dd/MM/yyyy"
                      />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group controlId="formDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Fermer
                </Button>
                <Button variant="primary" onClick={handleCreateRole}>
                  {isLoadingCreating ? "Ajout en cours..." : "Ajouter"}
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
