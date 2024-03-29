import React, { useState, useEffect, useMemo } from "react";
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

import GenerateCurratedSolutionPdf from "@/pages/components/apps/reporting/generateCurratedSolutionPdf";

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
  feedbacks,
}) => {
  const cotes = useMemo(() => {
    return feedbacks?.map((f) => f.quotations);
  }, [feedbacks]);

  const tableauDesMentions = useMemo(() => {
    if (!optionsFeedBack || !cotes || cotes.length === 0) return [];

    const tableauMerge = cotes.map((chaineIds) => {
      const ids = chaineIds.split(",").map((id) => parseInt(id.trim()));
      return ids.map((id) => {
        const feedback = optionsFeedBack.find((fb) => fb.value === id);
        return `${feedback.label}-${feedback.cote}`;
      });
    });

    return tableauMerge;
  }, [optionsFeedBack, cotes]);

  const renderSelect = (
    label,
    disabled,
    defaultValue
    // index,
    // indexCotation
  ) => {
    // const existingValues = cotations && cotations[0] ? cotations[0] : [];

    // const selectedValue = existingValues[index]?.average || null;

    // const selectedOption = optionsFeedBack?.find(
    //   (option) => option.cote === selectedValue
    // );

    // const renderSelect = (label, disabled, index, indexCotation) => {
    //   const existingValues = cotations && cotations[0] ? cotations[0] : [];
  
    //   const selectedValue = existingValues[index]?.average || null;
  
    //   const selectedOption = optionsFeedBack?.find(
    //     (option) => option.cote === selectedValue
    //   );
  
    //   return (
    //     <Row className="mt-3">
    //       <Col>{label}</Col>
  
    //       <Col>
    //         <Select
    //           options={optionsFeedBack}
    //           value={selectedOption}
    //           onChange={(selectedOption) =>
    //             handleChangeCote(selectedOption, label)
    //           }
    //           isDisabled={disabled}
    //         />
    //       </Col>
    //     </Row>
    //   );
    // };

    return (
      <Row className="mt-3">
        <Col>{label}</Col>

        <Col>
          <Select
            options={optionsFeedBack}
            // value={selectedOption}
            // onChange={(selectedOption) =>
            //   handleChangeCote(selectedOption, label)
            // }
            isDisabled={disabled}
          />
        </Col>
      </Row>
    );
  };

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
                                        {solution?.challenges.map(
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
                      ></div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="Timeline">
                      <div
                        className="main-content-body tab-pane border-top-0 h-500"
                        style={{ height: "1000px", maxHeight: "1000px" }}
                        id="edit"
                      >
                        <Card
                          style={{ height: "100%", maxHeight: "100%" }}
                          className=""
                        >
                          <Card.Body
                            className=" border-0"
                            style={{ height: "100%", maxHeight: "100%" }}
                          >
                            <div className="border border-primary p-3">
                              <div className="d-sm-flex p-3 sub-review-section border subsection-color br-tl-0 br-tr-0">
                                <div className="d-flex me-3">
                                  <img
                                    className="media-object brround avatar-md"
                                    alt="64x64"
                                    src={
                                      "../../../assets/img/faces/profile.jpg"
                                    }
                                  />
                                </div>

                                <div className="media-body">
                                  <h5 className="mt-0 mb-1 font-weight-semibold">
                                    <>
                                      <div className="mb-1">
                                        {" Commenté par : Jules Bimabima "}
                                      </div>
                                      <span className="h6">
                                        Commenté le {"Le 12/02/2024 à 13:10 "}
                                      </span>
                                    </>

                                    <span
                                      className="tx-14 ms-0  me-1 ms-3"
                                      data-bs-toggle="tooltip"
                                      data-bs-placement="top"
                                      title=""
                                      data-original-title="verified"
                                    >
                                      <i className="fe fe-check-circle text-success tx-12 "></i>
                                    </span>
                                  </h5>
                                  <blockquote className="blockquote mt-4">
                                    <p className="h6">{"Test"}</p>
                                  </blockquote>
                                </div>
                              </div>

                              {renderSelect(
                                "Pertinence par rapport aux ODD/thématique",
                                true,
                                "Très bien - 10"
                              )}
                              {renderSelect(
                                "Impact local",
                                true,
                                "Très bien - 10"
                              )}
                              {renderSelect(
                                "Innovation",
                                true,
                                "Très bien - 10"
                              )}
                              {renderSelect(
                                "Échelle de mise en œuvre",
                                true,
                                "Très bien - 10"
                              )}

                              <ProgressIndicator
                                currentCote={40}
                                maxCote={40}
                              />
                            </div>

                            <div className="border border-primary p-3 mt-5">
                              <h4 className="mb-5">Ajouter une Côte</h4>
                              {renderSelect(
                                "Pertinence par rapport aux ODD/thématique"
                              )}
                              {renderSelect("Impact local")}
                              {renderSelect("Innovation")}
                              {renderSelect("Échelle de mise en œuvre")}

                              <ProgressIndicator currentCote={0} maxCote={40} />
                            </div>
                          </Card.Body>
                        </Card>
                      </div>
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

export default SolutionTab;

// const cotation = ({ feedbacks, isExistCommentaire, isCommentedByAnother }) => {
//   return (
//     <>
//       <Col md={8} className="ps-4">
//         <>
//           {isExistCommentaire ||
//             isCommentedByAnother(
//               feedbacks?.map((feedback) => (
//                 <div div key={feedback.id}>
//                   <Col>
//                     <Card className="overflow-hidden">
//                       <Card>
//                         <Card.Body>
//                           {feedback ? (
//                             <div className="d-sm-flex p-3 sub-review-section border subsection-color br-tl-0 br-tr-0">
//                               <div className="d-flex me-3">
//                                 {feedback.user.profile ? (
//                                   <img
//                                     className="media-object brround avatar-md"
//                                     alt="64x64"
//                                     src={`${imageBaseUrl}/${feedback.user.profile}`}
//                                   />
//                                 ) : (
//                                   <img
//                                     className="media-object brround avatar-md"
//                                     alt="64x64"
//                                     src={
//                                       "../../../assets/img/faces/profile.jpg"
//                                     }
//                                   />
//                                 )}
//                               </div>

//                               <div className="media-body">
//                                 <h5 className="mt-0 mb-1 font-weight-semibold">
//                                   {profileCurateur ? (
//                                     <>
//                                       <div className="mb-1">
//                                         Commenté par : {feedback.user.name}
//                                       </div>
//                                       <span className="h6">
//                                         Commenté le{" "}
//                                         {moment(
//                                           feedback.user?.createdAt
//                                         ).format("DD/MM/YYYY [à] HH:mm")}{" "}
//                                       </span>
//                                     </>
//                                   ) : (
//                                     <span
//                                       className="tx-14 ms-0  me-1 ms-3"
//                                       data-bs-toggle="tooltip"
//                                       data-bs-placement="top"
//                                       title=""
//                                       data-original-title="verified"
//                                     >
//                                       <i className="fe fe-check-circle text-success tx-12 "></i>
//                                     </span>
//                                   )}
//                                 </h5>
//                                 <blockquote className="blockquote mt-4">
//                                   <p className="h6">{feedback.adminComment}</p>
//                                 </blockquote>
//                               </div>
//                             </div>
//                           ) : (
//                             ""
//                           )}
//                         </Card.Body>
//                       </Card>
//                     </Card>
//                   </Col>

//                   {renderSelect(
//                     "Pertinence par rapport aux ODD/thématique",
//                     isExistCommentaire || isCommentedByAnother,
//                     feedback.id
//                   )}
//                   {renderSelect(
//                     "Impact local",
//                     isExistCommentaire || isCommentedByAnother,
//                     feedback.id
//                   )}
//                   {renderSelect(
//                     "Innovation",
//                     isExistCommentaire || isCommentedByAnother,
//                     feedback.id
//                   )}
//                   {renderSelect(
//                     "Échelle de mise en œuvre",
//                     isExistCommentaire || isCommentedByAnother,
//                     feedback.id
//                   )}

//                   <ProgressIndicator
//                     currentCote={totalCote ? totalCote : 0}
//                     maxCote={40}
//                   />
//                 </div>
//               ))
//             )}
//         </>
//       </Col>
//     </>
//   );
// };
