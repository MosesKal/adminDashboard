import React, { useState, useEffect, useRef, createRef } from "react";
import { Breadcrumb, Button, Form, FormGroup, Modal } from "react-bootstrap";
import dynamic from "next/dynamic";
import Seo from "@/shared/layout-components/seo/seo";
import { useRouter } from "next/router";
import axios from "@/pages/api/axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";

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
    setIsAdmin(userRoles.some(role => role.name === "ADMIN"));

    const fetchRole = async () => {
      let data;
      try {
        const roleResponse = await axios.get("/roles");
        data = roleResponse.data.data;
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
        data = poleResponse.data.data;

        setOptionsPoles(
          data.map((option) => ({
            value: option.id,
            label: option.name
          }))
        );

      } catch (e) {
        console.log(e)
      }
    };
    const fetchOrganisations = async () => {
      let data;
      try {
        const organisationResponse = await axios.get("/organisations");
        data = organisationResponse.data.data;

        setOptionsOrganisations(
          data.map((option) => ({
            value: option.id,
            label: option.name
          }))
        );

      } catch (e) {
        console.log
      }
    }

    fetchRole();
    fetchPole();
    fetchOrganisations();

  }, []); 

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const updateUsers = async () => {
    try {
      const responseUser = await axios.get("/users");
      const usersWithImages = responseUser.data.data.map((user) => ({
        ...user,
        img: (
          <img
            src={"../../../assets/img/faces/4.jpg"}
            className="rounded-circle"
            alt=""
          />
        ),
        class: "avatar-md rounded-circle",
      }));
      const allowedRoles = ["CURATOR", "ADMIN", "EXPLORATOR"];
      setUsers(usersWithImages.filter(user => user.roles.some(role => allowedRoles.includes(role.name))));
    } catch (error) {
      console.error("Erreur lors de la mise à jour des données :", error);
    }
  };

  const hanleCreateCurrateur = async (e) => {

    e.preventDefault();

    try {
      setIsLoadingCreating(true);

      const payload = {
        name: name.current.value,
        email: email.current.value,
        phoneNumber: phoneNumber.current.value,
        address: address.current.value,
        roles: optionId,
        pole: optionPoleId,
        organisation: optionOrganisationId,
      };

      await axios.post("/users", JSON.stringify(payload));

      toast.success("Curateur créé avec succès !");
      handleClose();
      setIsLoadingCreating(false)
      updateUsers();
    } catch (e) {
      toast.error(e.response.data.message)
      setIsLoadingCreating(false);
    } finally {
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

  const handleSelectChangeOrganisation = async (selectedOptionsOrganisation) => {

    setSelectedOrganisations(selectedOptionsOrganisation);
    setOptionOrganisationId(selectedOptionsOrganisation.value);

  };


  return (
    <div>
      <Seo title={"Curator List"} />
      <div className="breadcrumb-header justify-content-between">
        <div className="left-content">
          <span className="main-content-title mg-b-0 mg-b-lg-1">
            LISTE DES CURATEURS
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
        {
          isAdmin ? (<div className="left-content mt-2">
            <Button
              className="btn ripple btn-primary"
              onClick={handleShow}
              size="sm"
            >
              <i className="fe fe-plus me-2"></i>{"Nouveau Curateur"}
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
                      <Select options={options} onChange={handleSelectChange} placeholder={"Selectionner le rôle"} isMulti />
                    </FormGroup>

                    <FormGroup className="form-group">
                      <Select options={optionsPoles} onChange={handleSelectChangePole} placeholder={"Selectionner le pôle"} />
                    </FormGroup>

                    <FormGroup className="form-group">
                      <Select options={optionsOrganisations} onChange={handleSelectChangeOrganisation} placeholder={"Selectionner l'organisation"} />
                    </FormGroup>

                    <FormGroup className="form-group mb-0 justify-content-end">
                      <div className="checkbox">
                        <div className="custom-checkbox custom-control">
                          <input
                            type="checkbox"
                            data-checkboxes="mygroup"
                            className="custom-control-input"
                            id="checkbox-2"
                          />
                        </div>
                      </div>
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
          </div>) : ""
        }
      </div>
      <CurratorList updateUsers={updateUsers} />
      <ToastContainer />
    </div>
  );
};


CurrateurList.propTypes = {};
CurrateurList.defaultProps = {};
CurrateurList.layout = "Contentlayout";
export default CurrateurList;
