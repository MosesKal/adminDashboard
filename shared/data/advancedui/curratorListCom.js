import React, { useState, useEffect } from "react";
import { Button, Row, Col, Card, Spinner, Modal, Form, FormGroup } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { columns as configureColumns } from "./curratorList";
import axios, { apiBaseUrl } from "@/pages/api/axios";
import moment from "moment";
import { toast, ToastContainer } from "react-toastify";
import Select from "react-select";

const CurratorList = ({ updateUsers }) => {
  const [users, setUsers] = useState([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [editedCuratorId, setEditedCuratorId] = useState("");
  const [editedCuratorName, setEditedCuratorName] = useState("");
  const [editedCuratorPhone, setEditedCuratorPhone] = useState("");
  const [editedCuratorEmail, setEditedCuratorEmail] = useState("");
  const [editedCuratorAdress, setEditedCuratorAdress] = useState("");

  const [editedCuratorPole, setEditedCuratorPole] = useState("");
  const [editedCuratorRole, setEditedCuratorRole] = useState("");

  const [optionsRoles, setOptionsRoles] = useState();
  const [selectedOptionsRoles, setSelectedOptionsRoles] = useState([]);
  const [optionRoleId, setOptionRoleId] = useState();

  const [optionsPoles, setOptionsPoles] = useState();
  const [selectedOptionsPoles, setSelectedOptionsPoles] = useState(null);
  const [optionPoleId, setOptionPoleId] = useState();

  const [optionsOrganisations, setOptionsOrganisations] = useState();
  const [selectedOrganisations, setSelectedOrganisations] = useState(null);
  const [optionOrganisationId, setOptionOrganisationId] = useState();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoadingUsers(true);
        const responseUser = await axios.get("/users");
        const usersWithImages = responseUser.data.data.map((user) => {
          const profileImage = user.profile ? `${apiBaseUrl}/uploads/${user?.profile}` : "../../../assets/img/faces/4.jpg";
          return {
            ...user,
            img: (
                <img
                    src={profileImage}
                    className="rounded-circle w-100 h-100"
                    alt=""
                />
            ),
            class: "avatar-md rounded-circle",
          };
        });
        const allowedRoles = ["CURATOR", "ADMIN", "EXPLORATOR"];
        setUsers(usersWithImages.filter(user => user.roles.some(role => allowedRoles.includes(role.name))));
        setIsLoadingUsers(false);
      } catch (error) {
        setIsLoadingUsers(false);
        console.error("Erreur lors de la récupération des données :", error);
      }
    };
    const fetchRole = async () => {
      let data;
      try {
        const roleResponse = await axios.get("/roles");
        data = roleResponse.data.data;
        setOptionsRoles(
            data.map((option) => ({
              value: option.id,
              label: option.name
            }))
        );
      } catch (e) {
        console.log(e);
      }
    }
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
    }

    const fetchOrganisations = async ()=>{
      let data;
      try {
        const organisationResponse = await axios.get("/organisations");
        data = organisationResponse.data.data;

        setOptionsOrganisations(
            data.map((option)=>({
              value: option.id,
              label : option.name
            }))
        );

      }catch (e){
        console.log
      }
    }

    fetchUser();
    fetchRole();
    fetchPole();
    fetchOrganisations();

  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoadingUsers(true);
        const responseUser = await axios.get("/users");

        const usersWithImages = responseUser.data.data.map((user) => {
          const profileImage = user.profile ? `${apiBaseUrl}/uploads/${user?.profile}` : "../../../assets/img/faces/4.jpg";
          return {
            ...user,
            img: (
                <img
                    src={profileImage}
                    className="rounded-circle w-100 h-100"
                    alt=""
                />
            ),
            class: "avatar-md rounded-circle",
          };
        });

        const allowedRoles = ["CURATOR", "ADMIN", "EXPLORATOR"];
        setUsers(usersWithImages.filter(user => user.roles.some(role => allowedRoles.includes(role.name))));
        setIsLoadingUsers(false);
      } catch (error) {
        setIsLoadingUsers(false);
        console.error("Erreur lors de la récupération des données :", error);
      }
    };

    fetchUser();

  }, [updateUsers]);

  const handleSelectChangeRole = (selectedOptionsRoles) => {
    setSelectedOptionsRoles(selectedOptionsRoles);
    const selectedOptionIds = selectedOptionsRoles.map((option)=>option.value);
    setOptionRoleId(selectedOptionIds);
  };

  const handleSelectChangePole = (selectedOptionsPoles) => {
    setSelectedOptionsPoles(selectedOptionsPoles);
    setOptionPoleId(selectedOptionsPoles.value);
  };

  const handleSelectChangeOrganisation = async (selectedOptionsOrganisation)=>{
    setSelectedOrganisations(selectedOptionsOrganisation);
    setOptionOrganisationId(selectedOptionsOrganisation.value);
  };

  const handleShowModal = (user) => {
    setSelectedUser(user);
    setEditedCuratorId(user.id || null);
    setShowModal(true);
  }

  const handleShowEditModal = (user) => {
    setSelectedUser(user);
    setEditedCuratorId(user.id || null);
    setEditedCuratorName(user.name || null);
    setEditedCuratorEmail(user.email || null);
    setEditedCuratorPhone(user.phoneNumber || null);
    setEditedCuratorAdress(user.address || null);

    const currentRoleIds = user.roles.map(role => ({ value: role.id, label: role.name }));
    setSelectedOptionsRoles(currentRoleIds);


    const currentPole = user.pole ? optionsPoles.find(pole => pole.value === user.pole.id) : null;
    setSelectedOptionsPoles(currentPole);


    const currentOrganisation = user.organisation ? optionsOrganisations.find(org => org.value === user.organisation.id) : null;
    setSelectedOrganisations(currentOrganisation);

    setShowEditModal(true);
  }

  const handleCloseEditModal = () => {
    setSelectedOptionsRoles([]);
    setSelectedOptionsPoles(null);
    setSelectedOrganisations(null)
    setShowEditModal(false);
    setSelectedUser(null);
  }

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  }

  const handleDelete = (user) => {
    const isAdminUser = isAdmin || JSON.parse(localStorage.getItem("ACCESS_ACCOUNT")).roles[0].name === "ADMIN";
    if (isAdminUser) {
      setUserToDelete(user);
      setShowDeleteModal(true);
    } else {
      setShowAlertModal(true);
    }
  };

  const handleCloseAlertModal = () => {
    setShowAlertModal(false);
  };

  const handleEditCurateur = async () => {

    try {
      const updatedData = {
        name: editedCuratorName,
        email: editedCuratorEmail,
        address: editedCuratorAdress,
        phoneNumber: editedCuratorPhone,
        roles: optionRoleId,
        pole: optionPoleId,
        organisation : optionOrganisationId,
      };

      await axios.patch(`/users/${selectedUser.id}`, updatedData);
      toast.success("Curateur modifié avec succès !");
      updateUsers();
    } catch (error) {
      console.error(error);
    } finally {
      setShowEditModal(false);
    }
  };

  const columns = configureColumns(handleShowModal, handleDelete, handleShowEditModal);

  function convertArrayOfObjectsToCSV(array) {
    if (!array || array.length === 0) {
      return "";
    }

    let result;

    const columnDelimiter = ",";
    const lineDelimiter = "\n";
    const keys = Object.keys(array[0]);

    result = "";
    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    array.forEach((item) => {
      let ctr = 0;
      keys.forEach((key) => {
        if (ctr > 0) result += columnDelimiter;

        try {
          const value =
              typeof item[key] === "object" && item[key] !== null
                  ? item[key]?.props?.alt
                  : item[key];

          result += value;
        } catch (e) {

        }
        ctr++;
      });
      result += lineDelimiter;
    });
    return result;
  }

  function downloadCSV(array) {
    const link = document.createElement("a");
    let csv = convertArrayOfObjectsToCSV(array);
    if (csv == null) return;

    const filename = "export.csv";

    if (!csv.match(/^data:text\/csv/i)) {
      csv = `data:text/csv;charset=utf-8,${csv}`;
    }

    link.setAttribute("href", encodeURI(csv));
    link.setAttribute("download", filename);
    link.click();
  }

  const Export = ({ onExport }) => (
      <Button onClick={() => onExport()} size={"sm"}>
        Exporter les Innovateurs
      </Button>
  );

  const actionsMemo = React.useMemo(
      () => <Export onExport={() => downloadCSV(users)} />,
      [users]
  );

  const [selectedRows, setSelectedRows] = React.useState([]);
  const [toggleCleared, setToggleCleared] = React.useState(false);

  const handleRowSelected = React.useCallback((state) => {
    setSelectedRows(state.selectedRows);
  }, []);

  const handleConfirmDelete = async (user) => {
    try {
      await axios.delete(`/users/${user.id}`);
      setUsers((previousUsers) => previousUsers.filter((u) => u.id !== user.id));
      setShowDeleteModal(false);
    } catch (error) {
      console.error(error);
    }
  }

  const contextActions = React.useMemo(() => {
    const Selectdata = () => {
      if (window.confirm(`download:\r ${selectedRows.map((r) => r.id)}?`)) {
        setToggleCleared(!toggleCleared);
        const selectdata = users.filter((e) => selectedRows.some((sr) => e.id === sr.id));
        downloadCSV(selectdata);
      }
    };

    return <Export onExport={Selectdata} icon="true" />;
  }, [users, selectedRows, toggleCleared]);

  return (
      <div>
        <Row className=" row-sm">
          <Col lg={12}>
            <Card className="custom-card">
              <Card.Body>
                {isLoadingUsers ? (
                    <div className="text-center">
                      <Spinner animation="border" variant="primary" />
                    </div>
                ) : (
                    <div className="table-responsive">
                  <span className="datatable">
                    <span className="uselistdata">
                      <DataTable
                          columns={columns}
                          data={users}
                          actions={actionsMemo}
                          contextActions={contextActions}
                          onSelectedRowsChange={handleRowSelected}
                          clearSelectedRows={toggleCleared}
                          defaultSortField="id"
                          defaultSortAsc={false}
                          selectableRows
                          pagination
                      />
                    </span>
                  </span>
                    </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Modal size="lg" show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>{"Détails du Curateur"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Col lg={12} md={12}>
              <Card className="custom-card customs-cards">
                <Card.Body className=" d-md-flex bg-white">
                  <div className="">
                  <span className="profile-image pos-relative">
                    <img
                        className="br-5"
                        alt=""
                        src={selectedUser?.profile ? `${apiBaseUrl}/uploads/${selectedUser.profile}` : "../../../assets/img/faces/profile.jpg"}
                    />
                    <span className="bg-success text-white wd-1 ht-1 rounded-pill profile-online"></span>
                  </span>
                  </div>
                  <div className="my-md-auto mt-4 prof-details">
                    <h4 className="font-weight-semibold ms-md-4 ms-0 mb-1 pb-0">
                      {selectedUser ? selectedUser.name : ""}
                    </h4>
                    <p className="tx-13 text-muted ms-md-4 ms-0 mb-2 pb-2 ">
                    <span className="me-3">
                      <i className="far fa-address-card me-2"></i>{selectedUser ? selectedUser.roles[0].name : ""}
                    </span>
                      <span className="me-3">
                      <i class="bi bi-geo-alt-fill me-2"></i>
                        {selectedUser ? selectedUser.address : ""}
                    </span>
                      <span>
                      <i className="far fa-flag me-2"></i>RDC
                    </span>
                    </p>
                    <p className="text-muted ms-md-4 ms-0 mb-2">
                    <span>
                      <i className="fa fa-phone me-2"></i>
                    </span>
                      <span className="font-weight-semibold me-2">Phone:</span>
                      <span>
                      {selectedUser ? selectedUser.phoneNumber : ""}
                    </span>
                    </p>
                    <p className="text-muted ms-md-4 ms-0 mb-2">
                    <span>
                      <i className="fa fa-envelope me-2"></i>
                    </span>
                      <span className="font-weight-semibold me-2">Email:</span>
                      <span>
                      {selectedUser ? selectedUser.email : ""}
                    </span>
                    </p>
                    <p className="text-muted ms-md-4 ms-0 mb-2">
                    <span>
                      <i class="bi bi-calendar-check me-2"></i>
                    </span>
                      <span className="font-weight-semibold me-2">
                      {"Date d'inscription sur la plateforme:"}
                    </span>
                      <span>
                      {selectedUser
                          ? moment(selectedUser.createdAt).format(
                              "DD MMMM YYYY [à] HH:mm"
                          )
                          : ""}
                    </span>
                    </p>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Modal.Body>
          <Modal.Footer>
            <Button size="sm" variant="danger" onClick={handleCloseModal}>
              {"Fermer la fenêtre"}
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={showAlertModal} onHide={handleCloseAlertModal}>
          <Modal.Body>
            <div className="tx-center">
              <i className="icon icon ion-ios-close-circle-outline tx-100 tx-danger lh-1 mg-t-20 d-inline-block"></i>{" "}
              <h4 className="tx-danger mg-b-20">
                {"Vous n'avez pas les droits nécessaires pour effectuer cette action."}
              </h4>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button size={"sm"} variant="primary" onClick={handleCloseAlertModal}>
              {"OK"}
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
          <Modal.Body>
            <div className="tx-center">
              <i className="icon icon ion-ios-close-circle-outline tx-100 tx-danger lh-1 mg-t-20 d-inline-block"></i>{" "}
              <h4 className="tx-danger mg-b-20">
                {"Êtes - vous sûr de vouloir supprimer"} <span className="badge bg-danger">{userToDelete?.name} ?</span>
              </h4>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button size={"sm"} variant="primary" onClick={() => setShowDeleteModal(false)}>
              Annuler
            </Button>
            <Button size={"sm"} variant="danger" onClick={() => handleConfirmDelete(userToDelete)}>
              Supprimer
            </Button>
          </Modal.Footer>
        </Modal>



        <Modal show={showEditModal} onHide={handleCloseEditModal}>
          <Modal.Header className="modal-header">
            <h6 className="modal-title">{"Modifier le Curateur"}</h6>
            <Button
                variant=""
                className="btn-close"
                type="button"
                onClick={handleCloseEditModal}
            >
              <span aria-hidden="true">×</span>
            </Button>
          </Modal.Header>
          <Modal.Body className="modal-body">
            <div className="p-4">
              <Form className="form-horizontal">
                <FormGroup className="form-group">
                  <Form.Control
                      type="string"
                      className="form-control"
                      id="inputName"
                      placeholder="Nom"
                      value={editedCuratorName}
                      disabled={true}
                  />
                </FormGroup>

                <FormGroup className="form-group">
                  <Form.Control
                      type="string"
                      className="form-control"
                      id="inputPhoneNumber"
                      placeholder="Num Téléphone"
                      value={editedCuratorPhone}
                      disabled={true}
                  />
                </FormGroup>

                <FormGroup className="form-group">
                  <Form.Control
                      type="string"
                      className="form-control"
                      id="inputPhoneNumber"
                      placeholder="Adress"
                      value={editedCuratorAdress}
                      disabled={true}
                  />
                </FormGroup>

                <FormGroup className="form-group">
                  <Form.Control
                      type="string"
                      className="form-control"
                      id="inputEmail"
                      placeholder="Email"
                      value={editedCuratorEmail}
                      disabled={true}
                  />
                </FormGroup>

                <FormGroup className="form-group">
                  <Select options={optionsRoles} onChange={handleSelectChangeRole} value={selectedOptionsRoles} placeholder={"Selectionner le rôle"} isMulti />
                </FormGroup>

                <FormGroup className="form-group">
                  <Select options={optionsPoles} onChange={handleSelectChangePole} value={selectedOptionsPoles} placeholder={"Selectionner le pôle"} />
                </FormGroup>

                <FormGroup className="form-group">
                  <Select options={optionsOrganisations} onChange={handleSelectChangeOrganisation} value={setSelectedOrganisations} placeholder={"Selectionner l'organisation"}/>
                </FormGroup>
              </Form>
            </div>

          </Modal.Body>
          <Modal.Footer>
            <Button
                variant=""
                className="btn ripple btn-primary"
                type="button"
                onClick={handleEditCurateur}
            >
              {"Modifier"}
            </Button>
            <Button
                variant=""
                className="btn ripple btn-secondary"
                onClick={handleCloseEditModal}
            >
              {"Fermer"}
            </Button>
          </Modal.Footer>
        </Modal>
        <ToastContainer />
      </div>
  );
};
export default CurratorList;