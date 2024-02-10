import React from "react";

import {Button, Col, Row} from "react-bootstrap";

const truncateText = (text, maxLength) => {
    if (text?.length > maxLength) {
        return text.substring(0, maxLength) + "...";
    }
    return text;
};

export const columns = (handleShowModal, handleDelete, handleShowEditModal) => [
    {
        name: "Photo",
        selector: (row) => [row.Photo],
        sortable: false,
        cell: (row) => <div className={row.class}>{row.img}</div>,
    },
    {
        name: "Nom",
        selector: (row) => [row.Name],
        sortable: false,
        cell: (row) => (
            <span>
            <p className="tx-14 font-weight-semibold text-dark mb-1">{row.name}</p>
            <p className="tx-12 text-muted mb-0">{row.email}</p>
        </span>
        ),
    },
    {
        name: "Pôle",
        selector: (row) => [row.poleName],
        sortable: true,
        cell: (row) => (
            <span>
                {row.poleName}
            </span>
        ),
    },
    {
        name: "Organisation",
        selector: (row) => [row.organisationName],
        sortable: true,
        cell: (row) => (
            <span>
            {row.organisationName}
        </span>
        ),
    },
    {
        name: "Rôle",
        selector: (row) => row.roles.map(role => role.name),
        sortable: false,
        cell: (row) => (
            <span>
            {row.roles.map((role, index) => (
                <span key={index} className="tx-13">
                    {truncateText(role.name, 45)}
                    {index !== row.roles.length - 1 && ", "}
                </span>
            ))}
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
                    <Col xs={12} md={12} lg={12} xl={12} xxl={4} className="mb-2 mb-md-0">
                        <Button
                            variant="primary"
                            size="sm"
                            onClick={() => handleShowModal(row)}
                            className="w-100 button-icon"
                        >
                            {/* <i className="bi bi-card-list"></i> */}
                            <span className="ps-1">Détails</span>
                        </Button>
                    </Col>

                    <Col xs={12} md={12} lg={12} xl={12} xxl={4} className="mb-2 mb-md-0">
                        <Button
                            variant=""
                            size=""
                            onClick={() => handleDelete(row)}
                            className="btn w-100 button-icon btn-sm btn-secondary m-0"
                        >
                            {/* <i class="bi bi-trash"></i> */}
                            <span className="ps-1">Supprimer</span>
                        </Button>
                    </Col>

                    <Col xs={12} md={12} lg={12} xl={12} xxl={4} className="mb-2 mb-md-0">
                        <Button
                            variant=""
                            size=""
                            onClick={() => handleShowEditModal(row)}
                            className="btn btn-info button-icon btn-sm w-100"
                        >
                            {/* <i class="bi bi-pencil-square bu"></i> */}
                            <span className="ps-1">Modifier</span>
                        </Button>
                    </Col>
                </Row>
            </div>
        ),
    },
];