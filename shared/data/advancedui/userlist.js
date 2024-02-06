
import React from "react";
import {Button, Col, Row} from "react-bootstrap";

const truncateText = (text, maxLength) => {
  if (text?.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  }
  return text;
};

export const columns = (handleShowModal, handleDelete) => [
  {
    name: "Photo",
    selector: (row) => [row.Photo],
    sortable: true,
    cell: (row) => <div className={row.class}>{row.img}</div>,
  },
  {
    name: "Nom",
    selector: (row) => [row.Name],
    sortable: true,
    cell: (row) => (
        <span>
        <p className="tx-14 font-weight-semibold text-dark mb-1">{row.name}</p>
        <p className="tx-12 text-muted mb-0">{row.email}</p>
      </span>
    ),
  },
  {
    name: " Num Tel",
    selector: (row) => [row.phoneNumber],
    sortable: true,
    cell: (row) => (
        <span>
        <span className="text-muted tx-13">{row.phoneNumber}</span>
      </span>
    ),
  },
  {
    name: "Adresse",
    selector: (row) => [row.address],
    sortable: true,
    cell: (row) => (
        <span>
        <span className="tx-13">{truncateText(row.address, 45)}</span>
      </span>
    ),
  },
  {
    name: "Actions",
    selector: (row) => [row.Action],
    sortable: false,
    cell: (row) => (
        <div className="w-100">
          <Row className="my-3">
            <Col xs={12} md={12} lg={12} xl={12} xxl={6} className="mb-2 mb-md-0">
              <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleShowModal(row)}
                  className="w-100 button-icon"
              >
                <i className="bi bi-card-list"></i>
                <span className="ps-1">Détails</span>
              </Button>
            </Col>

            <Col xs={12} md={12} lg={12} xl={12} xxl={6} className="mb-2 mb-md-0">
              <Button
                  variant=""
                  onClick={() => handleDelete(row)}
                  className="btn w-100 button-icon btn-sm btn-secondary m-0"
              >
                <i class="bi bi-trash"></i>
                <span className="ps-1">Supprimer</span>
              </Button>
            </Col>
          </Row>
        </div>
    ),
  },
];
