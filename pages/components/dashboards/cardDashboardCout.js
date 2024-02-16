import { Col, Row, Card, Spinner } from "react-bootstrap";

const CardDashboardCout = ({totalNumber, title, icon, loader}) => {
  return (
    <Col xl={6} lg={12} md={12} xs={12}>
      <Card className=" sales-card">
        <Row>
          <div className="col-8">
            <div className="ps-4 pt-4 pe-3 pb-4">
              <div className="">
                <h6 className="mb-2 tx-12 ">{title}</h6>
              </div>
              <div className="pb-0 mt-0">
                <div className="d-flex">
                  {loader ? (
                    <h4 className="tx-20 font-weight-semibold mb-2">
                      {totalNumber}
                    </h4>
                  ) : (
                    <div className="text-wrap">
                      <div className="tx-center">
                        <Spinner
                          animation="grow"
                          className="spinner-grow spinner-grow-sm"
                          role="status"
                        >
                          <span className="sr-only">Loading...</span>
                        </Spinner>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="col-4">
            {icon}
            
          </div>
        </Row>
      </Card>
    </Col>
  )
}

export default CardDashboardCout

