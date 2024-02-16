import { Col, Row, Card } from "react-bootstrap";

const CardDashAccueil = () => {
  return (
    <Card>
      <Card.Body>
        <Row>
          <Col xl={9} lg={7} md={6} sm={12}>
            <div className="text-justified align-items-center">
              <h3 className="text-dark font-weight-semibold mb-2 mt-0">
                {"Bienvenu sur le tableau de bord"}
                <span className="ms-1 text-primary">{"Fikiri"}</span>
              </h3>
              <p className="text-dark tx-14 mb-3 lh-3">
                {"Gérez la plateforme en toute simplicité"}
              </p>
            </div>
          </Col>
          <Col
            xl={3}
            lg={5}
            md={6}
            sm={12}
            className="d-flex align-items-center justify-content-center upgrade-chart-circle"
          ></Col>
        </Row>
      </Card.Body>
    </Card>
  )
}

export default CardDashAccueil

