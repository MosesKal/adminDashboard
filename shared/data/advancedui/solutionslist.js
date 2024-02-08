import React from "react";
import moment from "moment";
import { Row, Col, Button } from "react-bootstrap";

import Link from "next/link";

export const truncateText = (text, maxLength) => {
  if (text?.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  }
  return text;
};

export const columns = (handleDelete, handleShowEditModal)=>[
  {
    name: "Titre",
    selector: (row) => [row.name],
    sortable: false,
    cell: (row) => (
      <span>
        <span className="tx-13">{truncateText(row.name, 100)}</span>
      </span>
    ),
  },
  {
    name: "Thématique",
    selector: (row) => [row.thematic?.name],
    sortable: false,
    cell: (row) => (
      <span>
        <p className="tx-14 font-weight-semibold text-dark mb-1">
          {truncateText(row.thematic?.name, 30)}
        </p>
        <p className="tx-12 text-muted mb-0">{`ODDS : ${row.thematic?.odds}`}</p>
      </span>
    ),
  },
  {
    name: "Date et Heure de soumission",
    selector: (row) => [row.createdAt],
    sortable: false,
    cell: (row) => (
      <span className="tx-center">
        <span className=" tx-13 font-weight-semibold">
          {"Soumis le"} {moment(row?.createdAt).format("DD/MM/YYYY [à] HH:mm")}
        </span>
      </span>
    ),
  },
  {
    name: "Actions",
    selector: (row) => [row.Action],
    sortable: false,
    cell: (row) => (
      <div className="w-100">
        <Row className="justify-content-evenly">
            <Col xs={12} md={12} lg={12} xl={12} xxl={6}>

                <Link
                    className="btn btn-primary btn-sm w-100 button-icon"
                    href={`/components/apps/solution?id=${row?.id}&innovateurId=${row?.user?.id}&thematiqueId=${row?.thematic?.id}`}
                    as="/components/apps/solution"
                >
                    <i className="bi bi-card-list"></i>
                    <span className="ps-1">Détails</span>

                </Link>
            </Col>
            <Col xs={12} md={12} lg={12} xl={12} xxl={6}>
                <Button
                    variant=""
                    type="button"
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
