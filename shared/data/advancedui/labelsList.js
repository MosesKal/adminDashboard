import React from "react";
import moment from "moment";

import {Button, Col, Row} from "react-bootstrap";

export const columns = (handleShowModal, handleDelete) => [

    {
        name: "Nom",
        selector: (row) => [row.Name],
        sortable: false,
        cell: (row) => (
            <div>
                <p className="tx-14 font-weight-semibold text-dark mb-1">{row.name}</p>
            </div>
        ),
    },
    {
        name: "Actions",
        selector: (row) => [row.Action],
        sortable: false,
        cell: (row) => (
            <div className="w-100">
                <Row className="my-3">
                    <Col sm={12} md={12} lg={12} xl={6} className="mb-2 mb-md-0">
                        <Button
                            variant="primary"
                            size="sm"
                            onClick={() => handleShowModal(row)}
                            className="w-100"
                        >
                            <i className="bi bi-card-list"></i>
                            <span className="ps-1">Détails</span>
                        </Button>
                    </Col>

                    <Col sm={12} md={12} lg={12} xl={6} className="mb-2 mb-md-0">
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
];