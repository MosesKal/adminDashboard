import React, { useState, useEffect } from "react";
import Carousels from "./carroussel";
import { Card, Col, Nav, Row, Tab } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import GenerateCurratedSolutionPdf from "@/pages/components/apps/reporting/generateCurratedSolutionPdf";
import Cotations from "@/pages/components/apps/solution/cotations";
import axios from "@/pages/api/axios";
import { toast } from "react-toastify";

library.add(faPlay);

const getVideoIdFromUrl = (url) => {
  const pattern =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(pattern);
  return match ? match[1] : null;
};

const SolutionTab = ({
  solution,
  thematique,
  imageLinks,
  optionsFeedBack,
  isAdmin,
  showYoutubeThumbnail,
  feedbacks,
  userConnectedEmail,
  solutionId,
  isCurated,
}) => {
  return (
    <>
      <span className=" py-0 ">
        <div className="profile-tab tab-menu-heading border-bottom-0 ">
          <Tab.Container id="left-tabs-example" defaultActiveKey="About">
            <Nav
              variant="pills"
              className="nav profile-tabs main-nav-line tabs-menu profile-nav-line bg-white mb-4 border-0 br-5 mb-0	"
            >
              <Nav.Item className="me-1">
                <Nav.Link className=" mb-2 mt-2" eventKey="About">
                  Detail sur la Solution
                </Nav.Link>
              </Nav.Item>
              {isAdmin ? (
                <Nav.Item className="me-1">
                  <Nav.Link className="mb-2 mt-2" eventKey="EditProfile">
                    {"Status de la solution"}
                  </Nav.Link>
                </Nav.Item>
              ) : (
                ""
              )}

              <Nav.Item className="me-1">
                <Nav.Link className="mb-2 mt-2" eventKey="Timeline">
                  Feed-Back
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className="me-1">
                <Nav.Link className="mb-2 mt-2" eventKey="PdfDownload">
                  {"Télécharger la Solution"}
                </Nav.Link>
              </Nav.Item>
            </Nav>
            <Row className=" row-sm ">
              <Col lg={12} md={12}>
                <div className="custom-card main-content-body-profile">
                  <Tab.Content>
                    <Tab.Pane eventKey="About">
                      <div
                        className="main-content-body tab-pane active"
                        id="about"
                      >
                        <SolutionDetails
                          solution={solution}
                          imageLinks={imageLinks}
                        />
                      </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="EditProfile">
                      <div
                        className="main-content-body tab-pane border-top-0"
                        id="edit"
                      >
                        <Timeline solution={solution} />
                      </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="Timeline">
                      <Cotations
                        feedbacks={feedbacks}
                        optionsFeedBack={optionsFeedBack}
                        userConnectedEmail={userConnectedEmail}
                        solutionId={solutionId}
                        isAdmin={isAdmin}
                        isCurated={isCurated}
                      />
                    </Tab.Pane>
                    <Tab.Pane eventKey="PdfDownload">
                      <div className="main-content-body tab-pane border-top-0">
                        <Card style={{ height: "1000px" }}>
                          <GenerateCurratedSolutionPdf
                            curratedSolution={solution}
                          />
                        </Card>
                      </div>
                    </Tab.Pane>
                  </Tab.Content>
                </div>
              </Col>
            </Row>
          </Tab.Container>
        </div>
      </span>
    </>
  );
};

const Timeline = ({ solution }) => {
  const [isLoadingUpdateStatus, setIsLoadingUpdateStatus] = useState(false);
  const [statusList, setStatusList] = useState([]);
  const [currentStatus, setCurrentStatus] = useState(null);

  const handleUpdateStatus = async (newStatus) => {
    try {
      if (currentStatus !== "Non conforme aux critères") {
        setIsLoadingUpdateStatus(true);
        const response = await axios.patch(`/solutions/${solution.id}`, {
          status: newStatus,
        });

        if (response.status === 200) {
          toast.success("Statut mis à jour avec succès");
          setCurrentStatus(newStatus);
        } else {
          toast.error("Erreur lors de la mise à jour du statut");
        }
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour du statut :", error);
      toast.error("Erreur lors de la mise à jour du statut");
    } finally {
      setIsLoadingUpdateStatus(false);
    }
  };

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const responseStatus = await axios.get("/status");

        const filteredStatus = responseStatus.data.data.filter(
          (status) => status.name !== "Non conforme aux critères"
        );
        setStatusList(filteredStatus);
      } catch (error) {
        console.error("Erreur lors de la récupération des statuts :", error);
      }
    };
    fetchStatus();
  }, []);

  useEffect(() => {
    if (solution && solution.statusId) {
      const currentStatusId = solution.statusId;
      setCurrentStatus(currentStatusId);
    }
  }, [solution]);

  return (
    <>
      <Row>
        <Col lg={12}>
          <Card className="custom-card">
            <Card.Header className="custom-card-header"></Card.Header>
            <Card.Body>
              <div className="vtimeline">
                {statusList.map((status, index) => (
                  <div
                    key={status.id}
                    className={`timeline-wrapper ${
                      currentStatus === status.id
                        ? "timeline-wrapper-primary"
                        : "timeline-wrapper-dark"
                    } ${index % 2 === 0 ? "timeline-inverted" : ""}`}
                  >
                    <div className="timeline-badge pt-2">
                      {index === 0 && <i className="bi bi-hourglass-top"></i>}
                      {index === 1 && <i className="bi bi-map-fill"></i>}
                      {index === 2 && <i className="bi bi-search"></i>}
                      {index === 3 && <i className="bi bi-eyedropper"></i>}
                    </div>
                    <div className="timeline-panel">
                      <div className="timeline-heading">
                        <h6 className="timeline-title">{status.name}</h6>
                      </div>
                      <div className="timeline-body">
                        <p>{status.description}</p>
                        {currentStatus === status.id && (
                          <>
                            {index > 0 && (
                              <button
                                className="btn btn-secondary me-2"
                                onClick={() =>
                                  handleUpdateStatus(statusList[index - 1].id)
                                }
                                disabled={isLoadingUpdateStatus}
                              >
                                Retour
                              </button>
                            )}
                            {index < statusList.length - 1 && (
                              <button
                                className="btn btn-primary"
                                onClick={() =>
                                  handleUpdateStatus(statusList[index + 1].id)
                                }
                                disabled={isLoadingUpdateStatus}
                              >
                                {isLoadingUpdateStatus
                                  ? "En cours..."
                                  : "Suivant"}
                              </button>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

const SolutionDetails = ({ solution, imageLinks }) => {
  return (
    <>
      {solution && (
        <Card className="">
          <Card.Body className="border-0 p-10 rounded-10">
            <div className="p-4">
              <Row>
                <Col md={6}>
                  <h4 className="text-primary tx-17 text-uppercase mb-3">
                    <b className="text-primary m-b-5 tx-17 text-uppercase">
                      Titre de la solution
                    </b>
                  </h4>
                  <p className="m-b-5 text-justify tx-15 p-10">
                    {solution ? solution.name : ""}
                  </p>
                  <h4 className="text-primary tx-17 text-uppercase mb-3">
                    <b className="text-primary m-b-5 tx-17 text-uppercase">
                      Description
                    </b>
                  </h4>
                  <p className="m-b-5 text-justify tx-15 p-10">
                    {solution ? solution.description : ""}
                  </p>
                  solution
                  <div className="">
                    <h5 className="text-primary m-b-5 tx-17 text-uppercase">
                      Lien Vidéo
                    </h5>
                    <p className="">
                      {solution && solution.videoLink ? (
                        <>
                          <p>
                            <a href={solution.videoLink} target="_blank">
                              {solution.videoLink}
                            </a>
                          </p>
                          <span style={{ position: "relative" }}>
                            {
                              <a
                                href={`https://www.youtube.com/watch?v=${getVideoIdFromUrl(
                                  solution.videoLink
                                )}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                  position: "relative",
                                  display: "block",
                                }}
                              >
                                <img
                                  src={`https://img.youtube.com/vi/${getVideoIdFromUrl(
                                    solution.videoLink
                                  )}/default.jpg`}
                                  alt="YouTube Thumbnail"
                                  style={{
                                    maxWidth: "80%",
                                    cursor: "pointer",
                                    display: "block",
                                    width: "100%",
                                  }}
                                  fluid
                                />
                                <FontAwesomeIcon
                                  icon={faPlay}
                                  style={{
                                    position: "absolute",
                                    top: "50%",
                                    left: "40%",
                                    transform: "translate(-50%, -50%)",
                                    color: "white",
                                    fontSize: "3rem",
                                    maxWidth: "50px",
                                    opacity: "0.5",
                                  }}
                                />
                              </a>
                            }
                          </span>
                        </>
                      ) : (
                        "pas de lien youtube"
                      )}
                    </p>
                  </div>
                  <div className="m-t-30">
                    <div className=" p-t-10">
                      <p className="text-primary m-b-5 tx-17 text-uppercase">
                        <b className="text-primary m-b-5 tx-17 text-uppercase">
                          En quoi est-ce que cette solution / initiative locale
                          est innovante ?
                        </b>
                      </p>
                      <p className=" tx-15 m-b-0">
                        {solution ? solution.targetedProblem : ""}
                      </p>
                    </div>
                    <div className="">
                      <h5 className="text-primary m-b-5 tx-17 text-uppercase">
                        Challenges
                      </h5>
                      <p className="">
                        {solution?.challenges.map((challenge) => (
                          <p key={challenge.id}>→ {challenge.name}</p>
                        ))}
                      </p>
                    </div>
                    <div className="">
                      <h5 className="text-primary m-b-5 tx-17 text-uppercase">
                        Date de soumission :
                      </h5>
                      <p className="">
                        {solution
                          ? moment(solution.createdAt).format(
                              "DD MMMM YYYY [à] HH:mm"
                            )
                          : ""}
                      </p>
                    </div>
                  </div>
                </Col>

                <Col md={6}>
                  <div className="m-t-30">
                    <div className=" p-t-10">
                      <h5 className="text-primary m-b-5 tx-17 text-uppercase">
                        Thématique
                      </h5>
                      <p className="">{solution.thematic.name}</p>
                      <h5 className="text-primary m-b-5 tx-17 text-uppercase">
                        {"ODD Concerné(s)"}
                      </h5>
                      <p className="">{solution.thematic.odds}</p>
                    </div>
                  </div>
                  <Carousels imageLinks={imageLinks} />
                </Col>
              </Row>
            </div>
          </Card.Body>
        </Card>
      )}
    </>
  );
};

export default SolutionTab;
