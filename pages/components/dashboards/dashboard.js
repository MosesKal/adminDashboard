import React, { useEffect, useState } from "react";
import Seo from "@/shared/layout-components/seo/seo";

import CardDashAccueil from "./cardDashAccueil";
import Title from "../components/Title";
import CardDashboardCout from "./cardDashboardCout";

import moment from "moment";
import { useRouter } from "next/router";
import axios from "@/pages/api/axios";
import { Col, Row, Card } from "react-bootstrap";
import Statistics from "@/shared/data/dashboards/dashboards1";
import Rapport from "@/pages/components/apps/rapport";

moment.locale("fr");
const Dashboard = () => {

  let navigate = useRouter();

  const [isLoadingSolution, setIsLoadingSolution] = useState(false);

  const [solutionsExplored, setSolutionExplored] = useState([]);
  const [solutionsCartographied, setSolutionCartographied] = useState([]);
  const [solutionsSoumises, setSolutionSoumises] = useState([]);

  const [dashboard, setDashboard] = useState();

  useEffect(() => {
    const status = JSON.parse(localStorage.getItem("STATUS_ACCOUNT"));
    if (status.authenticate) {

      const fetchSolutions = async () => {
        try {
          setIsLoadingSolution(true);
          const solutionResponse = await axios.get("/dashboard/solutions-status");

          const solutionEnAttente = solutionResponse.data.data.filter((solution) => (solution.status === "En attente"));

          const solutionCartographie = solutionResponse.data.data.filter((solution) => solution.status === "Cartographiée");
          const solutionExplored = solutionResponse.data.data.filter((solution) => solution.status === "Explorée")

          setSolutionExplored(solutionExplored);
          setSolutionCartographied(solutionCartographie);
          setSolutionSoumises(solutionEnAttente);

          setIsLoadingSolution(false);

        } catch (error) {

          console.log(error);
          setIsLoadingSolution(false);

        }
      };

      const fetchDashboard = async () => {
        try {
          const dashboardResponse = await axios.get("/dashboard");
          setDashboard(dashboardResponse.data);
        } catch (error) {
          console.log(error);
        }
      };

      fetchSolutions();
      fetchDashboard();

    } else {
      navigate.push("/");
    }
  }, [navigate]);


  return (
    <>
      <Seo title={"Tableau de bord"} />
      <React.Fragment>
        <Title title={"Tableau de bord"} />
        <Row>
          <Col xxl={6} xl={12} lg={12} md={12} sm={12}>
            <Row>
              <Col xl={12} lg={12} md={12} xs={12}>
                <CardDashAccueil />
              </Col>

              <CardDashboardCout
                title={"Utilisateurs"}
                totalNumber={dashboard?.data?.totalUsers}
                icon={
                  <div className="circle-icon bg-primary-transparent text-center align-self-center overflow-hidden">
                    <i className="bi bi-people-fill tx-16 text-primary"></i>
                  </div>
                }
                loader={dashboard ? true : false}
              />
              <CardDashboardCout
                title={"Solutions soumises"}
                totalNumber={dashboard?.data?.totalSolutions}
                icon={
                  <div className="circle-icon bg-info-transparent text-center align-self-center overflow-hidden">
                    <i class="bi bi-card-heading tx-16 text-info"></i>
                  </div>
                }
                loader={dashboard ? true : false}
              />

              <CardDashboardCout
                title={"Solutions Explorées"}
                totalNumber={solutionsExplored[0]?.count}
                icon={
                  <div
                    className="circle-icon bg-secondary-transparent text-center align-self-center overflow-hidden">
                    <i class="bi bi-folder2-open text-secondary"></i>
                  </div>
                }
                loader={!isLoadingSolution}
              />

              <CardDashboardCout
                title={"Solutions Cartographiées"}
                totalNumber={solutionsCartographied[0]?.count}
                icon={
                  <div className="circle-icon bg-warning-transparent text-center align-self-center overflow-hidden">
                    <i class="bi bi-pin-map-fill tx-16 text-warning "></i>
                  </div>
                }
                loader={!isLoadingSolution}
              />
            </Row>
          </Col>
          <Col xxl={6} xl={12} lg={12} md={12} sm={12}>
            <Card className=" custom-card overflow-hidden">
              <Card.Header className=" border-bottom-0">
                <div>
                  <h3 className="card-title mb-2 ">Solutions </h3>
                  <span className="d-block tx-12 mb-0 text-muted">
                    Solutions par statut
                  </span>
                </div>
              </Card.Header>
              <Card.Body>
                <Statistics />
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Rapport />
      </React.Fragment>
    </>
  );
}

Dashboard.layout = "Contentlayout";
export default Dashboard;
