import React, { useState, useEffect } from "react";
import {
  Button,
  Row,
  Col,
  Card,
  Spinner,
  Modal,
  Form,
  FormGroup,
} from "react-bootstrap";
import DataTable from "react-data-table-component";
import { columns as configureColumns } from "./userlist";
import axios from "@/pages/api/axios";
import { imageBaseUrl } from "@/pages/api/axios";
import moment from "moment";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";

const Userlistcom = () => {
  const usersState = useSelector((state) => state.usersReducer.users);
  const [users, setUsers] = useState([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);

  const [filters, setFilters] = useState({
    searchText: "",
  });

  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    const userRoles = JSON.parse(localStorage.getItem("ACCESS_ACCOUNT")).roles;
    setIsAdmin(userRoles.some((role) => role.name === "ADMIN"));

    const fetchUser = async () => {
      setIsLoadingUsers(true);
      const usersWithImages = usersState.map((user) => {
        const profileImage = user.profile
          ? `${imageBaseUrl}/${user?.profile}`
          : "../../../assets/img/faces/4.jpg";
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

      setUsers(
        usersWithImages.filter((user) =>
          user.roles.some((role) => role.name === "USER")
        )
      );
      setIsLoadingUsers(false);
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const filteredUser = users.filter((user) => {
      return (
        user?.name?.toLowerCase().includes(filters.searchText.toLowerCase()) ||
        user?.email?.toLowerCase().includes(filters.searchText.toLowerCase()) ||
        user?.phoneNumber
          ?.toLowerCase()
          .includes(filters.searchText.toLowerCase()) ||
        user?.address?.toLowerCase().includes(filters.searchText.toLowerCase())
      );
    });

    setFilteredUsers(filteredUser);
  }, [filters, users]);

  const handleShowModal = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  const handleDelete = (user) => {
    if (isAdmin) {
      setUserToDelete(user);
      setShowDeleteModal(true);
    } else {
      setShowAlertModal(true);
    }
  };

  const handleCloseAlertModal = () => {
    setShowAlertModal(false);
  };

  const columns = configureColumns(handleShowModal, handleDelete);

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
        } catch (e) {}

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
    <Button size="sm" onClick={() => onExport()}>
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
      setUsers((previousUsers) =>
        previousUsers.filter((u) => u.id !== user.id)
      );
      setShowDeleteModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  const contextActions = React.useMemo(() => {
    const Selectdata = () => {
      if (window.confirm(`download:\r ${selectedRows.map((r) => r.id)}?`)) {
        setToggleCleared(!toggleCleared);
        const selectdata = users.filter((e) =>
          selectedRows.some((sr) => e.id === sr.id)
        );
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
                  <Row>
                    <Col xs={12} md={12} lg={4} xl={4}>
                      <Form>
                        <FormGroup className="form-group">
                          <Form.Control
                            type="text"
                            className="form-control"
                            placeholder="Rechercher par nom, email, numéro de téléphone ou adresse..."
                            value={filters.searchText}
                            onChange={(e) =>
                              setFilters({
                                ...filters,
                                searchText: e.target.value,
                              })
                            }
                          />
                        </FormGroup>
                      </Form>
                    </Col>
                  </Row>
                  <span className="datatable">
                    <span className="uselistdata">
                      <DataTable
                        columns={columns}
                        data={filteredUsers}
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
          <Modal.Title>{"Détails de l'Innovateur"}</Modal.Title>
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
                      src={
                        selectedUser?.profile
                          ? `${imageBaseUrl}/${selectedUser.profile}`
                          : "../../../assets/img/faces/profile.jpg"
                      }
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
                      <i className="far fa-address-card me-2"></i>Innovateur
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
                    <span>{selectedUser ? selectedUser.phoneNumber : ""}</span>
                  </p>
                  <p className="text-muted ms-md-4 ms-0 mb-2">
                    <span>
                      <i className="fa fa-envelope me-2"></i>
                    </span>
                    <span className="font-weight-semibold me-2">Email:</span>
                    <span>{selectedUser ? selectedUser.email : ""}</span>
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
            Fermer la fenêtre
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Body>
          <div className="tx-center">
            <i className="icon icon ion-ios-close-circle-outline tx-100 tx-danger lh-1 mg-t-20 d-inline-block"></i>
            <h4 className="tx-danger mg-b-20">
              {"Êtes - vous sûr de vouloir supprimer"}{" "}
              <span className="badge bg-danger">{userToDelete?.name} ?</span>
            </h4>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            size={"sm"}
            variant="primary"
            onClick={() => setShowDeleteModal(false)}
          >
            Annuler
          </Button>
          <Button
            size={"sm"}
            variant="danger"
            onClick={() => handleConfirmDelete(userToDelete)}
          >
            Supprimer
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showAlertModal} onHide={handleCloseAlertModal}>
        <Modal.Body>
          <div className="tx-center">
            <i className="icon icon ion-ios-close-circle-outline tx-100 tx-danger lh-1 mg-t-20 d-inline-block"></i>{" "}
            <h4 className="tx-danger mg-b-20">
              {
                "Vous n'avez pas les droits nécessaires pour effectuer cette action."
              }
            </h4>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button size={"sm"} variant="primary" onClick={handleCloseAlertModal}>
            {"OK"}
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </div>
  );
};
export default Userlistcom;
