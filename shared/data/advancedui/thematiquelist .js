import React from "react";

import Link from "next/link";
import moment from "moment";
import {Button, Col, Row} from "react-bootstrap";


const truncateText = (text, maxLength) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  }
  return text;
};

export const columns = (handleShowModal, handleDelete) => [

  {
    name: "Nom",
    selector: (row) => [row.name],
    sortable: false,
    cell: (row) => (
        <span>
        <p className="tx-14 font-weight-semibold text-dark mb-1">{truncateText(row.name, 45)}</p>
        <p className="tx-12 text-muted mb-0">ODDS : {row.odds}</p>
      </span>
    ),
  },
  {
    name: " ODD",
    selector: (row) => [row.odds],
    sortable: false,
    cell: (row) => (
        <span>
        <span className="text-center tx-14">{row.odds}</span>
      </span>
    ),
  },
  {
    name: "Date création",
    selector: (row) => [row.createdAt],
    sortable: false,
    cell: (row) => (
        <span>
        <span className="tx-13">{moment(row.createdAt).format("DD MMMM YYYY [à] HH:mm")}</span>
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
                  size=""
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
]

