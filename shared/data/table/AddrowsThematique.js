import React, { useState, Fragment, useEffect } from "react";
import { Button, Form, Modal, Table, Spinner } from "react-bootstrap";
import { nanoid } from "nanoid";
import axios from "@/pages/api/axios";

export const Savetable = () => {
  const [modalShow, setModalShow] = React.useState(false);

  const [thematiques, setThematiques] = useState();
  const [isLoadingThematique, setIsLoadingThematique] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoadingThematique(true);
        const response = await axios.get("/thematics");
        setThematiques(response.data.data);
        setIsLoadingThematique(false);
      } catch (error) {
        setIsLoadingThematique(false);
        console.error("Erreur lors de la récupération des données :", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {}, [thematiques]);

  const [addFormData, setAddFormData] = useState({
    sno: "",
    Name: "",
    lastname: "",
    position: "",
    email: "",
    salary: "",
  });

  const [editFormData, setEditFormData] = useState({
    sno: "",
    Name: "",
    lastname: "",
    position: "",
    email: "",
    salary: "",
  });

  const [editThematiqueId, setEditThematiqueId] = useState(null);

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.name;
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.name;
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newThematique = {
      id: nanoid(),
      name: addFormData.Name,
      odds: addFormData.odds,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const newThematiques = [...thematiques, newThematique];
    setThematiques(newThematiques);
    setAddFormData({
      sno: "",
      Name: "",
      lastname: "",
      position: "",
      email: "",
      salary: "",
    });
    setModalShow(false);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedThematique = {
      id: editThematiqueId,
      name: editFormData.Name,
      odds: editFormData.odds,
      createdAt: editFormData.createdAt,
      updatedAt: new Date().toISOString(),
    };

    const newThematiques = thematiques.map((thematique) =>
      thematique.id === editThematiqueId ? editedThematique : thematique
    );

    setThematiques(newThematiques);
    setEditThematiqueId(null);
  };

  const handleEditClick = (event, thematique) => {
    event.preventDefault();
    setEditThematiqueId(thematique.id);

    const formValues = {
      sno: thematique.sno,
      Name: thematique.Name,
      lastname: thematique.lastname,
      position: thematique.position,
      email: thematique.email,
      salary: thematique.salary,
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditThematiqueId(null);
  };

  const handleDeleteClick = (thematiqueId) => {
    const newThematiques = thematiques.filter(
      (thematique) => thematique.id !== thematiqueId
    );

    setThematiques(newThematiques);
  };

  return (
    <div className="app-container mg-b-20 ">
      {isLoadingThematique ? (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <Form
          onSubmit={
            editThematiqueId ? handleEditFormSubmit : handleAddFormSubmit
          }
        >
          <Button
            variant=""
            className="btn btn-primary mb-3"
            onClick={() => setModalShow(true)}
          >
            Ajouter
          </Button>
          <Table
            id="delete-datatable"
            className="table table-bordered text-nowrap border-bottom"
          >
            <thead>
              <tr>
                <th className="wd-5p text-center">ID</th>
                <th>Nom</th>
                <th>ODD</th>
                <th>Date de création</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {thematiques &&
                thematiques.map((thematique) => (
                  <Fragment key={thematique.id}>
                    {editThematiqueId === thematique.id ? (
                      <EditableRow
                        editFormData={editFormData}
                        handleEditFormChange={handleEditFormChange}
                        handleCancelClick={handleCancelClick}
                      />
                    ) : (
                      <ReadOnlyRow
                        thematique={thematique}
                        handleEditClick={handleEditClick}
                        handleDeleteClick={handleDeleteClick}
                      />
                    )}
                  </Fragment>
                ))}
            </tbody>
          </Table>
        </Form>
      )}

      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Nouvelle entrée
          </Modal.Title>
          <Button
            variant=""
            className="btn btn-close"
            onClick={() => setModalShow(false)}
          >
            x
          </Button>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddFormSubmit} className="">
            <Form.Control
              type="text"
              name="Name"
              required
              placeholder="Entrer le nom..."
              onChange={handleAddFormChange}
              className="form-control mb-2 border"
            />
            <Form.Control
              type="text"
              name="odds"
              required
              placeholder="Nom de l'ODD..."
              onChange={handleAddFormChange}
              className="form-control mb-2 border"
            />
            <Button
              variant=""
              className="btn btn-primary me-2 wd-100p "
              type="submit"
            >
              Ajouter
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn btn-primary wd-20p"
            onClick={() => setModalShow(false)}
          >
            Fermer
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

const EditableRow = ({
  editFormData,
  handleEditFormChange,
  handleCancelClick,
}) => {
  return (
    <tr>
      <td>
        <Form.Control
          type="text"
          required
          placeholder="ID"
          name="id"
          value={editFormData.id}
          onChange={handleEditFormChange}
          className="border"
        ></Form.Control>
      </td>
      <td>
        <Form.Control
          type="text"
          required
          placeholder="Enter a name..."
          name="Name"
          value={editFormData.Name}
          onChange={handleEditFormChange}
          className="border"
        ></Form.Control>
      </td>
      <td>
        <Form.Control
          type="text"
          required
          placeholder="Entrer l'ODD..."
          name="odds"
          value={editFormData.odds}
          onChange={handleEditFormChange}
          className="border"
        ></Form.Control>
      </td>
      <td>
        <Form.Control
          type="text"
          required
          placeholder="Entre la date..."
          name="createdAt"
          value={editFormData.createdAt}
          onChange={handleEditFormChange}
          className="border"
        ></Form.Control>
      </td>
      <td>
        <Button variant="" className="btn btn-primary me-1" type="submit">
          Enregister
        </Button>
        <Button
          variant=""
          className="btn btn-danger me-1"
          type="button"
          onClick={handleCancelClick}
        >
          Annuler
        </Button>
      </td>
    </tr>
  );
};

const ReadOnlyRow = ({ thematique, handleEditClick, handleDeleteClick }) => {
  return (
    <tr>
      <td className="wd-5p text-center">{thematique.id}</td>
      <td>{thematique.name}</td>
      <td>{thematique.odds}</td>
      <td>{thematique.createdAt}</td>
      <td>
        <Button
          variant=""
          className="btn btn-primary me-1"
          type="button"
          onClick={(event) => handleEditClick(event, thematique)}
        >
          Editer
        </Button>
        <Button
          variant=""
          className="btn btn-danger me-1"
          type="button"
          onClick={() => handleDeleteClick(thematique.id)}
        >
          Supprimer
        </Button>
      </td>
    </tr>
  );
};
