import React from 'react'
import {  Card,Breadcrumb, Col, Row } from 'react-bootstrap';
import {BasicTable} from "../Basictable"
import{Fixedheader} from "../Fixedheader"
import { ExportCSV } from '../Exportcvs';
import{DataTabless} from "../Deleterows"
import {Savetable} from "../Addrows"


const DataTablesCom = () => {
  return (
    <div className="main-container container-fluid">
      <div className="breadcrumb-header justify-content-between">
        <div className="left-content">
          <span className="main-content-title mg-b-0 mg-b-lg-1">
            Liste Curateurs
          </span>
        </div>
        <div className="justify-content-center mt-2">
          <Breadcrumb className="breadcrumb">
            <Breadcrumb.Item className="breadcrumb-item tx-15" href="#!">
              Curateurs
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
              <div>
                <h6 className="main-content-label mb-1">
                  Deleted Row DataTable
                </h6>
                <p className="text-muted card-sub-title">
                  Responsive is an extension for DataTables that resolves that
                  problem by optimising the {`table's`} layout for different screen
                  sizes through the dynamic insertion and removal of columns
                  from the table.
                </p>
              </div>
              <div className="table-responsive  deleted-table">
                
                <Savetable/>
                
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default DataTablesCom