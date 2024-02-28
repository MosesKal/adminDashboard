import React, { useState, useEffect } from "react";
import Carousels from "./carroussel";
import { Image, Card, Col, Button, Nav, Row, Tab } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";
import moment from "moment";
import { imageBaseUrl } from "@/pages/api/axios";
import { ProgressBar } from "react-bootstrap";
import axios from "@/pages/api/axios";
import { toast } from "react-toastify";

library.add(faPlay);

const getVideoIdFromUrl = (url) => {
  const pattern =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

  const match = url.match(pattern);
  return match ? match[1] : null;
};

const ProgressIndicator = ({ currentCote, maxCote }) => {
  const progress = (currentCote / maxCote) * 100;
  let variant;

  if (progress >= 75) {
    variant = "success";
  } else if (progress >= 50) {
    variant = "warning";
  } else {
    variant = "danger";
  }

  return (
    <ProgressBar
      now={progress}
      variant={variant}
      label={`${progress}%`}
      className="mt-5"
    />
  );
};

const SolutionTab = ({
  solution,
  thematique,
  imageLinks,
  isLoadingupdatePole,
  handleChangePole,
  optionsPole,
  handleSelectChangePole,
  isExistCommentaire,
  handleSelectChange,
  handleChangeStatus,
  isLoadingUpdateStatut,
  optionsFeedBack,
  isAdmin,
  options,
  profileCurateur,
  showYoutubeThumbnail,
  isCommentedByAnother,
  userConnected,
  cotations,
}) => {
  const [cotes, setCotes] = useState({});
  const [coteIds, setCoteIds] = useState([]);
  const [latestCoteValues, setLatestCoteValues] = useState({});
  const [totalCote, setTotalCote] = useState(0);

  const [commentaires, setCommentaires] = useState([]);

  const handleChangeCote = (selectedOption, fieldName) => {
    
    const selectedCote = optionsFeedBack.find(
      (option) => option.value === selectedOption.value
    );

    if (selectedCote) {
      setCotes((prevCotes) => ({
        ...prevCotes,
        [fieldName]: selectedCote.cote,
      }));

      setCoteIds((prevCoteIds) => {
        const existingIds = prevCoteIds[fieldName] || [];

        const isIdExists = existingIds.includes(selectedCote.value);

        if (isIdExists) {
          return {
            ...prevCoteIds,
            [fieldName]: existingIds.filter((id) => id !== selectedCote.value),
          };
        } else {
          return {
            ...prevCoteIds,
            [fieldName]: [...existingIds, selectedCote.value],
          };
        }
      });
    }
  };

  useEffect(() => {
    const updatedValues = {};

    Object.keys(coteIds).forEach((field) => {
      const lastId = coteIds[field][coteIds[field].length - 1];
      updatedValues[field] = lastId;
    });

    setLatestCoteValues(updatedValues);
  }, [coteIds]);

  useEffect(() => {
    const sum = Object.values(cotes).reduce((acc, current) => acc + current, 0);
    setTotalCote(sum);
  }, [cotes]);

  const renderSelect = (label, disabled, index) => {
    const existingValues = cotations && cotations[0] ? cotations[0] : [];

    const selectedValue = existingValues[index]?.average || null;

    const selectedOption = optionsFeedBack?.find(
      (option) => option.cote === selectedValue
    );

    return (
      <Row className="mt-3">
        <Col>{label}</Col>
        <Col>
          <Select
            options={optionsFeedBack}
            value={selectedOption}
            onChange={(selectedOption) =>
              handleChangeCote(selectedOption, label)
            }
            isDisabled={disabled}
          />
        </Col>
      </Row>
    );
  };

  const renderButton = () => (
    <Col md={6} className="mb-5">
      {isExistCommentaire ? (
        <Button
          variant=""
          className="btn btn-primary"
          type="button"
          disabled={isCommentedByAnother}
        >
          {"Modifier la côte"}
        </Button>
      ) : (
        <Button
          variant=""
          className="btn btn-primary"
          type="button"
          onClick={handleSendFeedBack}
          disabled={isCommentedByAnother}
        >
          {"Envoyer la côte"}
        </Button>
      )}
    </Col>
  );

  const handleSendFeedBack = async () => {
    let idsToSend = [];

    for (const property in latestCoteValues) {
      idsToSend.push(latestCoteValues[property]);
    }

    let payload;

    if (commentaires.length > 0) {
      payload = {
        quotations: idsToSend,
        user: userConnected?.email,
        adminComment: commentaires,
      };
    } else {
      payload = {
        quotations: idsToSend,
        user: userConnected?.email,
      };
    }

    try {
      const response = await axios.post(
        `/solutions/feedback/${solution?.id}`,
        payload
      );
      toast.success("Côte envoyée avec succès");
    } catch (error) {
      console.error("Erreur survenue lors de l'envoi de la côte ", error);
      toast.error("Erreur survenue lors de l'envoi de côte");
    }
  };

  useEffect(() => {
    if (isExistCommentaire || isCommentedByAnother) {
      setTotalCote(
        cotations[0]?.reduce((acc, current) => acc + current.average, 0)
      );
    }
  }, [isExistCommentaire, isCommentedByAnother, solution, cotations]);

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
              {isAdmin ? (
                <Nav.Item className="me-1">
                  <Nav.Link className="mb-2 mt-2" eventKey="Assigne">
                    {"Assigner la solution à un Pôle"}
                  </Nav.Link>
                </Nav.Item>
              ) : (
                ""
              )}
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
                                            <a
                                              href={solution.videoLink}
                                              target="_blank"
                                            >
                                              {solution.videoLink}
                                            </a>
                                          </p>
                                          <span
                                            style={{ position: "relative" }}
                                          >
                                            {showYoutubeThumbnail && (
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
                                                <Image
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
                                                    transform:
                                                      "translate(-50%, -50%)",
                                                    color: "white",
                                                    fontSize: "3rem",
                                                    maxWidth: "50px",
                                                    opacity: "0.5",
                                                  }}
                                                />
                                              </a>
                                            )}
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
                                          En quoi est-ce que cette solution /
                                          initiative locale est innovante ?
                                        </b>
                                      </p>
                                      <p className=" tx-15 m-b-0">
                                        {solution
                                          ? solution.targetedProblem
                                          : ""}
                                      </p>
                                    </div>
                                    <div className="">
                                      <h5 className="text-primary m-b-5 tx-17 text-uppercase">
                                        Challenges
                                      </h5>
                                      <p className="">
                                        {thematique &&
                                          thematique.challenges.map(
                                            (challenge) => (
                                              <p key={challenge.id}>
                                                → {challenge.name}
                                              </p>
                                            )
                                          )}
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
                                      <p className="">
                                        {thematique ? thematique.name : ""}
                                      </p>
                                      <h5 className="text-primary m-b-5 tx-17 text-uppercase">
                                        {"ODD Concerné(s)"}
                                      </h5>
                                      <p className="">
                                        {thematique ? thematique.odds : ""}
                                      </p>
                                    </div>
                                  </div>
                                  <Carousels imageLinks={imageLinks} />
                                </Col>
                              </Row>
                            </div>
                          </Card.Body>
                        </Card>
                      </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="EditProfile">
                      <div
                        className="main-content-body tab-pane border-top-0"
                        id="edit"
                      >
                        <Card style={{ height: "350px" }}>
                          <Card.Body className=" border-0">
                            <div className="mb-4 main-content-label">
                              Solution
                            </div>
                            <Row className="row">
                              <Col md={2}>Status de la Solution actuel</Col>
                              <Col md={6}>
                                <Select
                                  options={options}
                                  onChange={handleSelectChange}
                                  value={
                                    solution && solution.status
                                      ? {
                                          value: solution.status.id,
                                          label: solution.status.name,
                                        }
                                      : null
                                  }
                                  isDisabled={true}
                                />
                              </Col>
                              <Col md={4}></Col>
                            </Row>

                            <Row className="row mt-5">
                              <Col md={2}>Changer le statut</Col>
                              <Col md={6}>
                                <Select
                                  options={options}
                                  onChange={handleSelectChange}
                                />
                              </Col>
                              <Col md={4}></Col>
                            </Row>

                            <Row className="row mt-5">
                              <Col md={2}></Col>
                              <Col md={6}>
                                <Button
                                  variant=""
                                  className="btn btn-primary"
                                  type="button"
                                  onClick={handleChangeStatus}
                                >
                                  {isLoadingUpdateStatut
                                    ? "Changement en cours..."
                                    : "Changer le statut"}
                                </Button>
                              </Col>
                              <Col md={4}></Col>
                            </Row>
                          </Card.Body>
                        </Card>
                      </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="Timeline">
                      <div
                        className="main-content-body tab-pane border-top-0"
                        id="edit"
                      >
                        <Card>
                          <Card.Body className=" border-0">
                            <Row>
                              <Col md={12} xl={12}>
                                <div className=" mb-4 main-content-label">
                                  Feed-backs solution
                                </div>
                                {isAdmin ? (
                                  <>
                                    <Row
                                      md={12}
                                      xl={12}
                                      className="row mt-4 ms-5 justify-content-between"
                                    >
                                      <Col md={4} className="pe-4">
                                        <Row md={4} className="mt-5 mb-4">
                                          <Col>
                                            {
                                              "Envoyer un commentaire à l'innovateur"
                                            }
                                          </Col>
                                        </Row>

                                        <Row>
                                          <textarea
                                            className="form-control"
                                            placeholder="Votre Commentaire à l'innovateur"
                                            rows={
                                              isExistCommentaire ||
                                              isCommentedByAnother
                                                ? 14
                                                : 4
                                            }
                                          ></textarea>
                                        </Row>
                                      </Col>

                                      <Col md={8} className="ps-4">
                                        <>
                                          {isExistCommentaire ||
                                            (isCommentedByAnother && (
                                              <>
                                                <Col>
                                                  <Card className="overflow-hidden">
                                                    <Card>
                                                      <Card.Body>
                                                        {solution
                                                          ?.feedbacks[0] ? (
                                                          <div className="d-sm-flex p-3 sub-review-section border subsection-color br-tl-0 br-tr-0">
                                                            <div className="d-flex me-3">
                                                              {solution
                                                                .feedbacks[0]
                                                                .user
                                                                .profile ? (
                                                                <img
                                                                  className="media-object brround avatar-md"
                                                                  alt="64x64"
                                                                  src={`${imageBaseUrl}/${solution.feedbacks[0].user.profile}`}
                                                                />
                                                              ) : (
                                                                <img
                                                                  className="media-object brround avatar-md"
                                                                  alt="64x64"
                                                                  src={
                                                                    "../../../assets/img/faces/profile.jpg"
                                                                  }
                                                                />
                                                              )}
                                                            </div>

                                                            <div className="media-body">
                                                              <h5 className="mt-0 mb-1 font-weight-semibold">
                                                                {profileCurateur ? (
                                                                  <>
                                                                    <div className="mb-1">
                                                                      Commenté
                                                                      par :{" "}
                                                                      {
                                                                        solution
                                                                          .feedbacks[0]
                                                                          .user
                                                                          .name
                                                                      }
                                                                    </div>
                                                                    <span className="h6">
                                                                      Commenté
                                                                      le{" "}
                                                                      {moment(
                                                                        solution
                                                                          .feedbacks[0]
                                                                          .user
                                                                          ?.createdAt
                                                                      ).format(
                                                                        "DD/MM/YYYY [à] HH:mm"
                                                                      )}{" "}
                                                                    </span>
                                                                  </>
                                                                ) : (
                                                                  <span
                                                                    className="tx-14 ms-0  me-1 ms-3"
                                                                    data-bs-toggle="tooltip"
                                                                    data-bs-placement="top"
                                                                    title=""
                                                                    data-original-title="verified"
                                                                  >
                                                                    <i className="fe fe-check-circle text-success tx-12 "></i>
                                                                  </span>
                                                                )}
                                                              </h5>
                                                              <blockquote class="blockquote mt-4">
                                                                <p className="h6">
                                                                  {
                                                                    solution
                                                                      .feedbacks[0]
                                                                      .adminComment
                                                                  }
                                                                </p>
                                                              </blockquote>
                                                            </div>
                                                          </div>
                                                        ) : (
                                                          ""
                                                        )}
                                                      </Card.Body>
                                                    </Card>
                                                  </Card>
                                                </Col>

                                                {renderSelect(
                                                  "Pertinence par rapport aux ODD/thématique",
                                                  isExistCommentaire ||
                                                    isCommentedByAnother,
                                                  0
                                                )}
                                                {renderSelect(
                                                  "Impact local",
                                                  isExistCommentaire ||
                                                    isCommentedByAnother,
                                                  1
                                                )}
                                                {renderSelect(
                                                  "Innovation",
                                                  isExistCommentaire ||
                                                    isCommentedByAnother,
                                                  2
                                                )}
                                                {renderSelect(
                                                  "Échelle de mise en œuvre",
                                                  isExistCommentaire ||
                                                    isCommentedByAnother,
                                                  3
                                                )}

                                                <ProgressIndicator
                                                  currentCote={
                                                    totalCote ? totalCote : 0
                                                  }
                                                  maxCote={40}
                                                />
                                              </>
                                            ))}
                                        </>
                                      </Col>
                                      <Row className="row mt-5 mb-5">
                                        <Button
                                          variant=""
                                          className="btn btn-primary"
                                          type="button"
                                          commentaires
                                        >
                                          {"Envoyer le commentaire"}
                                        </Button>
                                      </Row>
                                    </Row>
                                  </>
                                ) : (
                                  <>
                                    <Row
                                      md={12}
                                      xl={12}
                                      className="row mt-5 ms-5 justify-content-between"
                                    >
                                      <Col md={4}>
                                        <Row className="mb-5 me-5">
                                          <Col>
                                            {
                                              "Votre commentaire par rapport à la solution"
                                            }
                                          </Col>
                                        </Row>
                                        <Row>
                                          {isExistCommentaire ||
                                          isCommentedByAnother ? (
                                            <textarea
                                              className="form-control"
                                              placeholder="Votre Commentaire"
                                              onChange={(e) =>
                                                setCommentaires(e.target.value)
                                              }
                                              disabled={true}
                                            ></textarea>
                                          ) : (
                                            <textarea
                                              className="form-control"
                                              placeholder="Votre Commentaire"
                                              onChange={(e) =>
                                                setCommentaires(e.target.value)
                                              }
                                              rows={7}
                                            ></textarea>
                                          )}
                                        </Row>
                                      </Col>
                                      <Col md={8} xl={8} className="ps-5 mt-5">
                                        {renderSelect(
                                          "Pertinence par rapport aux ODD/thématique",
                                          isExistCommentaire ||
                                            isCommentedByAnother,
                                          0
                                        )}
                                        {renderSelect(
                                          "Impact local",
                                          isExistCommentaire ||
                                            isCommentedByAnother,
                                          1
                                        )}
                                        {renderSelect(
                                          "Innovation",
                                          isExistCommentaire ||
                                            isCommentedByAnother,
                                          2
                                        )}
                                        {renderSelect(
                                          "Échelle de mise en œuvre",
                                          isExistCommentaire ||
                                            isCommentedByAnother,
                                          3
                                        )}

                                        <ProgressIndicator
                                          currentCote={
                                            totalCote ? totalCote : 0
                                          }
                                          maxCote={40}
                                        />
                                      </Col>
                                    </Row>

                                    <Row className="row mt-5 ms-5 mb-5">
                                      {renderButton()}
                                    </Row>
                                  </>
                                )}
                              </Col>
                            </Row>
                          </Card.Body>
                        </Card>
                      </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="Assigne">
                      <div
                        className="main-content-body tab-pane border-top-0"
                        id="edit"
                      >
                        <Card style={{ height: "350px" }}>
                          <Card.Body className=" border-0">
                            <div className="mb-4 main-content-label">
                              {"Pôle"}
                            </div>

                            <Row className="row">
                              <Col md={2}>Pôle actuel</Col>
                              <Col md={6}>
                                <Select
                                  options={optionsPole}
                                  isDisabled={true}
                                />
                              </Col>
                              <Col md={4}></Col>
                            </Row>

                            <Row className="row mt-5">
                              <Col md={2}>{"Sélectionnez le pôle"}</Col>
                              <Col md={6}>
                                <Select
                                  options={optionsPole}
                                  onChange={handleSelectChangePole}
                                />
                              </Col>
                              <Col md={4}></Col>
                            </Row>

                            <Row className="row mt-5">
                              <Col md={2}></Col>
                              <Col md={6}>
                                <Button
                                  variant=""
                                  className="btn btn-primary"
                                  type="button"
                                  onClick={handleChangePole}
                                >
                                  {isLoadingupdatePole
                                    ? "Affectation..."
                                    : "Affecter la Solution"}
                                </Button>
                              </Col>
                              <Col md={4}></Col>
                            </Row>
                          </Card.Body>
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

export default SolutionTab;
