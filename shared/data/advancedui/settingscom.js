import React, { useState, useEffect } from "react";
import axios from "@/pages/api/axios";
import { columns as configureColumns } from "@/shared/data/advancedui/settingsList";
import {
  Button,
  Card,
  Col,
  Form,
  FormGroup,
  Modal,
  Row,
  Spinner,
} from "react-bootstrap";
import DataTable from "react-data-table-component";
import {toast, ToastContainer} from "react-toastify";

const Settingscom = ({ updateRoles }) => {
  const [roles, setRoles] = useState([]);
  const [isLoadingRoles, setIsLoadingRoles] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [rolesToDelete, setRolesToDelete] = useState(null);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedRoleForEdit, setSelectedRoleForEdit] = useState(null);

  const [editedRoleName, setEditedRoleName] = useState("");



  useEffect(() => {
    const fetchRoles = async () => {
      try {
        setIsLoadingRoles(true);
        const response = await axios.get("/roles");
        setRoles(response.data.data);
        setIsLoadingRoles(false);
      } catch (error) {
        setIsLoadingRoles(false);
        console.error("Erreur lors de la récupération des données :", error);
      }
    };

    fetchRoles();
  }, []);

  useEffect(() => {
    const fetchRole = async () => {
      try {
        setIsLoadingRoles(true);
        const response = await axios.get("/roles");
        setRoles(response.data.data);
        setIsLoadingRoles(false);
        // Calling updateRoles with the correct function to update the parent state
        updateRoles((prevRoles) => [...response.data.data]);
      } catch (error) {
        setIsLoadingRoles(false);
        console.error("Erreur lors de la récupération des données :", error);
      }
    };

    fetchRole();
  }, [updateRoles]);

  const handleShowModal = (role) => {
    setSelectedRoleForEdit(role);
    setEditedRoleName(role.name || "");
    setShowEditModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedRole(null);
  };

  const handleDelete = (role) => {
    const isAdminUser =
      isAdmin ||
      JSON.parse(localStorage.getItem("ACCESS_ACCOUNT")).roles[0].name ===
        "ADMIN";
    if (isAdminUser) {
      setRolesToDelete(role);
      setShowDeleteModal(true);
    } else {
      setShowAlertModal(true);
    }
  };

  const handleEditRole = async (e) => {

    try {
      if (editedRoleName !== selectedRoleForEdit.name) {
        const updatedData = {
          name: editedRoleName,
        };

        await axios.patch(`/roles/${selectedRoleForEdit.id}`, updatedData);
        toast.success("Rôle modifié avec succès !");

        updateRoles((prevRoles) => {
          const updatedRoles = prevRoles.map((role) =>
              role.id === selectedRoleForEdit.id
                  ? { ...role, name: editedRoleName }
                  : role
          );
          return updatedRoles;
        });
      } else {
        toast.error("Le nom du rôle n'a pas été modifié");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setShowEditModal(false);
    }
  };

  const handleCloseAlertModal = () => {
    setShowAlertModal(false);
  };

  const columns = configureColumns(handleShowModal, handleDelete);
  columns.forEach((column) => {
    if (column.name === "Nom") {
      column.width = "30%";
    } else if (column.name === "Date et Heure de Création") {
      column.width = "30%";
    }
  });

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
    <Button onClick={() => onExport()} size={"sm"}>
      Exporter les Rôles
    </Button>
  );

  const actionsMemo = React.useMemo(
    () => <Export onExport={() => downloadCSV(roles)} />,
    [roles]
  );

  const [selectedRows, setSelectedRows] = React.useState([]);
  const [toggleCleared, setToggleCleared] = React.useState(false);

  const handleRowSelected = React.useCallback((state) => {
    setSelectedRows(state.selectedRows);
  }, []);

  const handleConfirmDelete = async (role) => {
    try {
      await axios.delete(`/roles/${role.id}`);
      setRoles((previousRoles) =>
        previousRoles.filter((r) => r.id !== role.id)
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
        const selectdata = roles.filter((e) =>
          selectedRows.some((sr) => e.id === sr.id)
        );
        downloadCSV(selectdata);
      }
    };

    return <Export onExport={Selectdata} icon="true" />;
  }, [roles, selectedRows, toggleCleared]);

  return (
    <div>
      <Row className=" row-sm">
        <Col lg={12}>
          <Card className="custom-card">
            <Card.Body>
              {isLoadingRoles ? (
                <div className="text-center">
                  <Spinner animation="border" variant="primary" />
                </div>
              ) : (
                <div className="table-responsive">
                  <span className="datatable">
                    <span className="uselistdata">
                      <DataTable
                        columns={columns}
                        data={roles}
                        actions={actionsMemo}
                        contextActions={contextActions}
                        onSelectedRowsChange={handleRowSelected}
                        clearSelectedRows={toggleCleared}
                        defaultSortField="id"
                        defaultSortAsc={false}
                        selectableRows
                        pagination
                        responsive
                      />
                    </span>
                  </span>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header className="modal-header">
          <h6 className="modal-title">{"Modifier le rôle"}</h6>
          <Button
            variant=""
            className="btn-close"
            type="button"
            onClick={() => setShowEditModal(false)}
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
                  value={editedRoleName}
                  onChange={(e) => setEditedRoleName(e.target.value)}
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
            onClick={handleEditRole}
          >
            {"Modifier"}
          </Button>
          <Button
            variant=""
            className="btn ripple btn-secondary"
            onClick={() => setShowEditModal(false)}
          >
            {"Fermer"}
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
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Body>
          <div className="tx-center">
            <i className="icon icon ion-ios-close-circle-outline tx-100 tx-danger lh-1 mg-t-20 d-inline-block"></i>{" "}
            <h4 className="tx-danger mg-b-20">
              {"Êtes - vous sûr de vouloir supprimer"}{" "}
              <span className="badge bg-danger">{rolesToDelete?.name} ?</span>
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
            onClick={() => handleConfirmDelete(rolesToDelete)}
          >
            Supprimer
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />

    </div>
  );
};

export default Settingscom;
