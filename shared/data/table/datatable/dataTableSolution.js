import React from "react";
import { Card, Breadcrumb, Col, Row } from "react-bootstrap";
import { BasicTable } from "../Basictable";
import { Fixedheader } from "../Fixedheader";
import { ExportCSV } from "../Exportcvs";
import { DataTabless } from "../Deleterows";
import { SavetableSolutions } from "../AddrowsSolutions";

const DataTablesSolution = () => {
  return (
    <div className="main-container container-fluid">
      <div className="breadcrumb-header justify-content-between">
        <div className="left-content">
          <span className="main-content-title mg-b-0 mg-b-lg-1">
            Liste Solutions
          </span>
        </div>
        <div className="justify-content-center mt-2">
          <Breadcrumb className="breadcrumb">
            <Breadcrumb.Item className="breadcrumb-item tx-15" href="#!">
              Solutions
            </Breadcrumb.Item>
            <Breadcrumb.Item
              className="breadcrumb-item "
              active
              aria-current="page"
            >
              Liste
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>

      <Row className=" row-sm">
        <Col lg={12}>
          <Card className="custom-card">
            <Card.Body>
              <div className="table-responsive  deleted-table">
                <SavetableSolutions />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DataTablesSolution;
