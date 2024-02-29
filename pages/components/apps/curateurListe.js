import React, { useState, useEffect, createRef } from "react";
import { Button, Form, FormGroup, Modal } from "react-bootstrap";
import dynamic from "next/dynamic";
import Seo from "@/shared/layout-components/seo/seo";
import axios from "@/pages/api/axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import Title from "../components/Title";
import { useRouter } from "next/router";

const CurratorList = dynamic(
  () => import("@/shared/data/advancedui/curratorListCom"),
  { ssr: false }
);

const CurrateurList = () => {
  const router = useRouter();

  const [show, setShow] = React.useState(false);
  const email = createRef();
  const name = createRef();
  const phoneNumber = createRef();
  const address = createRef();

  const [options, setOptions] = useState();
  const [selectedOptions, setSelectedOptions] = useState();
  const [optionId, setOptionId] = useState([]);

  const [optionsPoles, setOptionsPoles] = useState();
  const [selectedOptionsPoles, setSelectedOptionsPoles] = useState();
  const [optionPoleId, setOptionPoleId] = useState();

  const [optionsOrganisations, setOptionsOrganisations] = useState();
  const [selectedOrganisations, setSelectedOrganisations] = useState();
  const [optionOrganisationId, setOptionOrganisationId] = useState();

  const [isLoadingCreating, setIsLoadingCreating] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const userRoles = JSON.parse(localStorage.getItem("ACCESS_ACCOUNT")).roles;

    setIsAdmin(userRoles.some((role) => role.name === "ADMIN"));

    const fetchRole = async () => {
      let data;
      try {
        const roleResponse = await axios.get("/roles");
        data = roleResponse?.data?.data;
        setOptions(
          data.map((option) => ({
            value: option.id,
            label: option.name,
          }))
        );
      } catch (e) {
        console.log(e);
      }
    };

    const fetchPole = async () => {
      let data;
      try {
        const poleResponse = await axios.get("/poles");
        data = poleResponse?.data?.data;

        setOptionsPoles(
          data.map((option) => ({
            value: option.id,
            label: option.name,
          }))
        );
      } catch (e) {
        console.log(e);
      }
    };

    const fetchOrganisations = async () => {
      let data;
      try {
        const organisationResponse = await axios.get("/organisations");
        data = organisationResponse?.data?.data;

        setOptionsOrganisations(
          data.map((option) => ({
            value: option.id,
            label: option.name,
          }))
        );
      } catch (e) {
        console.log;
      }
    };

    fetchRole();
    fetchPole();
    fetchOrganisations();
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const hanleCreateCurrateur = async (e) => {
    e.preventDefault();

    try {
      setIsLoadingCreating(true);

      const payload = {
        name: name?.current.value,
        email: email?.current.value,
        phoneNumber: phoneNumber?.current.value,
        address: address?.current.value,
        roles: optionId,
        pole: optionPoleId,
        organisation: optionOrganisationId,
      };

      await axios.post("/users", JSON.stringify(payload));

      toast.success("Curateur créé avec succès !");
      handleClose();
      setIsLoadingCreating(false);
      router.reload();
    } catch (e) {
      toast.error(e.response.data.message);
      setIsLoadingCreating(false);
    }
  };

  const handleSelectChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
    const selectedOptionIds = selectedOptions.map((option) => option.value);
    setOptionId(selectedOptionIds);
  };

  const handleSelectChangePole = async (selectedOptionsPoles) => {
    setSelectedOptionsPoles(selectedOptionsPoles);
    setOptionPoleId(selectedOptionsPoles.value);
  };

  const handleSelectChangeOrganisation = async (
    selectedOptionsOrganisation
  ) => {
    setSelectedOrganisations(selectedOptionsOrganisation);
    setOptionOrganisationId(selectedOptionsOrganisation.value);
  };

  return (
    <div>
      <Seo title={"Curator List"} />

      <Title title={"LISTE DES CURATEURS"} />

      <div className="breadcrumb-header justify-content-between">
        {isAdmin ? (
          <div className="left-content mt-2">
            <Button
              className="btn ripple btn-primary"
              onClick={handleShow}
              size="sm"
            >
              <i className="fe fe-plus me-2"></i>
              {"Nouveau Curateur"}
            </Button>

            <Modal show={show} onHide={handleClose}>
              <Modal.Header className="modal-header">
                <h6 className="modal-title">{"Ajouter Curateur"}</h6>
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
                    <FormGroup className="form-group">
                      <Form.Control
                        type="email"
                        className="form-control"
                        id="inputEmail3"
                        placeholder="Email"
                        ref={email}
                        required
                      />
                    </FormGroup>
                    <FormGroup className="form-group">
                      <Form.Control
                        type="text"
                        className="form-control"
                        id="inputPhoneNumber"
                        placeholder="Numéro de Téléphone"
                        ref={phoneNumber}
                        required
                      />
                    </FormGroup>
                    <FormGroup className="form-group">
                      <Form.Control
                        type="text"
                        className="form-control"
                        id="inputAdresse"
                        placeholder="Adresse physique"
                        ref={address}
                        required
                      />
                    </FormGroup>
                    <FormGroup className="form-group">
                      <Select
                        options={options}
                        defaultValue={selectedOptions}
                        onChange={handleSelectChange}
                        placeholder={"Selectionner le rôle"}
                        isMulti
                      />
                    </FormGroup>

                    <FormGroup className="form-group">
                      <Select
                        options={optionsPoles}
                        defaultValue={selectedOptionsPoles}
                        onChange={handleSelectChangePole}
                        placeholder={"Selectionner le pôle"}
                      />
                    </FormGroup>

                    <FormGroup className="form-group">
                      <Select
                        options={optionsOrganisations}
                        defaultInputValue={selectedOrganisations}
                        onChange={handleSelectChangeOrganisation}
                        placeholder={"Selectionner l'organisation"}
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
                  onClick={hanleCreateCurrateur}
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
        ) : (
          ""
        )}
      </div>
      <CurratorList />
    </div>
  );
};

CurrateurList.propTypes = {};
CurrateurList.defaultProps = {};
CurrateurList.layout = "Contentlayout";
export default CurrateurList;
