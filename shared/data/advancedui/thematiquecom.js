import React, { useState, useEffect } from "react";
import { Button, Row, Col, Card, Spinner, Modal } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { columns as configureColumns } from "./thematiquelist ";
import { useSelector } from "react-redux";

import axios from "@/pages/api/axios";
import { truncateText } from "@/shared/data/advancedui/solutionslist";
import { ToastContainer } from "react-toastify";

const Thematiquecom = () => {
  const thematicState = useSelector(
    (state) => state.thematicsReducer.thematics
  );

  const [thematiques, setThematiques] = useState(thematicState);
  const [isLoadingThematique, setIsLoadingThematique] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedThematique, setSelectedThematique] = useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [thematiqueToDelete, setThematiqueToDelete] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);

  useEffect(() => {
    if (
      JSON.parse(localStorage.getItem("ACCESS_ACCOUNT")).roles[0].name ===
      "ADMIN"
    ) {
      setIsAdmin(true);
    }
  }, []);

  const handleShowModal = (thematique) => {
    setSelectedThematique(thematique);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedThematique(null);
  };

  const handleDelete = (thematique) => {
    if (isAdmin) {
      setThematiqueToDelete(thematique);
      setShowDeleteModal(true);
    } else {
      setShowAlertModal(true);
    }
  };

  const handleCloseAlertModal = () => {
    setShowAlertModal(false);
  };

  const columns = configureColumns(handleShowModal, handleDelete);

  columns.forEach((column) => {
    if (column.name === "Nom") {
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

        const value =
          typeof item[key] === "object" && item[key] !== null
            ? item[key].props.alt
            : item[key];

        result += value;

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
      Exporter les Thematiques
    </Button>
  );

  const actionsMemo = React.useMemo(
    () => <Export onExport={() => downloadCSV(thematiques)} />,
    [thematiques]
  );

  const [selectedRows, setSelectedRows] = React.useState([]);
  const [toggleCleared, setToggleCleared] = React.useState(false);

  const handleRowSelected = React.useCallback((state) => {
    setSelectedRows(state.selectedRows);
  }, []);
  const handleConfirmDelete = async (thematique) => {
    try {
      await axios.delete(`/thematiques/${thematique.id}`);
      setThematiques((previousThematiques) =>
        previousThematiques.filter((t) => t.id !== thematique.id)
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
        const selectdata = thematiques.filter((e) =>
          selectedRows.some((sr) => e.id === sr.id)
        );
        downloadCSV(selectdata);
      }
    };

    return <Export onExport={Selectdata} icon="true" />;
  }, [thematiques, selectedRows, toggleCleared]);

  return (
    <div>
      <Row className=" row-sm">
        <Col lg={12}>
          <Card className="custom-card">
            <Card.Body>
              {isLoadingThematique ? (
                <div className="text-center">
                  <Spinner animation="border" variant="primary" />
                </div>
              ) : (
                <div className="table-responsive">
                  <span className="datatable">
                    <span className="uselistdata">
                      <DataTable
                        columns={columns}
                        data={thematiques}
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
        <Modal size="lg" show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>{"Détails sur la thématique"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Col lg={12} md={12}>
              <Card className="custom-card customs-cards">
                <Card.Body className=" d-md-flex bg-white">
                  {selectedThematique ? selectedThematique.thematiques : ""}
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
              <i className="icon icon ion-ios-close-circle-outline tx-100 tx-danger lh-1 mg-t-20 d-inline-block"></i>{" "}
              <h4 className="tx-danger mg-b-20">
                {"Êtes - vous sûr de vouloir supprimer la thématique : "}{" "}
                <span className="badge bg-danger">
                  {truncateText(thematiqueToDelete?.name, 20)} ?
                </span>
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
              onClick={() => handleConfirmDelete(thematiqueToDelete)}
            >
              Supprimer
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={showAlertModal} onHide={handleCloseAlertModal}>
          <Modal.Body>
            <div className="tx-center">
              <i className="icon icon ion-ios-close-circle-outline tx-100 tx-danger lh-1 mg-t-20 d-inline-block"></i>
              <h4 className="tx-danger mg-b-20">
                {
                  "Vous n'avez pas les droits nécessaires pour effectuer cette action."
                }
              </h4>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              size={"sm"}
              variant="primary"
              onClick={handleCloseAlertModal}
            >
              {"OK"}
            </Button>
          </Modal.Footer>
        </Modal>
      </Row>
      <ToastContainer />
    </div>
  );
};
export default Thematiquecom;
