import React, { useMemo, useState } from "react";
import { Button, Card, Col, ProgressBar, Row } from "react-bootstrap";
import moment from "moment";
import Select from "react-select";
import axios, { imageBaseUrl } from "@/pages/api/axios";
import { toast } from "react-toastify";

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

const Cotations = ({
  feedbacks,
  optionsFeedBack,
  userConnectedEmail,
  solutionId,
  isAdmin,
  isCurated
}) => {
  return (
    <>
      <div
        className="main-content-body tab-pane border-top-0 h-500"
        style={{ height: "2000px", maxHeight: "2000px" }}
        id="edit"
      >
        <Card style={{ height: "100%", maxHeight: "100%" }} className="">
          <Card.Body
            className=" "
            style={{ height: "100%", maxHeight: "100%" }}
          >
            {feedbacks?.length > 0 &&
              feedbacks.map((feedback) => (
                <div
                  key={feedback.id}
                  className={"my-5"}
                  style={{ border: "1px solid #ccc", padding: "10px" }}
                >
                  <RenderSelectForDisplayingCote
                    userDetails={feedback.userDetails}
                    optionsFeedBack={optionsFeedBack}
                    feedback={feedback}
                  />
                </div>
              ))}

              {isAdmin || !isCurated ? (
                <RenderSelectForSendingCote
                  optionsFeedBack={optionsFeedBack}
                  userConnectedEmail={userConnectedEmail}
                  solutionId={solutionId}
                />
              ) : null}

          </Card.Body>
        </Card>
      </div>
    </>
  );
};

const CuratorInfo = ({ userDetails }) => {
  return (
    <>
      {userDetails && (
        <div className="d-sm-flex p-3 sub-review-section border subsection-color br-tl-0 br-tr-0">
          <div className="d-flex me-3">
            {userDetails?.profile ? (
              // <img
              //   className="media-object brround avatar-md"
              //   alt="64x64"
              //   src={`${imageBaseUrl}/${userDetails.profile}`}
              // />
              <img
                className="media-object brround avatar-md"
                alt="64x64"
                src={"../../../assets/img/faces/profile.jpg"}
              />
            ) : (
              <img
                className="media-object brround avatar-md"
                alt="64x64"
                src={"../../../assets/img/faces/profile.jpg"}
              />
            )}
          </div>

          <div className="media-body">
            <h5 className="mt-0 mb-1 font-weight-semibold">
              {
                <>
                  <div className="mb-1">Curé par : {userDetails?.name}</div>
                  <span className="h6">
                    Date de curation : Le{" "}
                    {moment(userDetails?.createdAt).format(
                      "DD/MM/YYYY [à] HH:mm"
                    )}{" "}
                  </span>
                </>
              }
            </h5>
            <blockquote className="blockquote mt-4">
              <p className="h6"></p>
            </blockquote>
          </div>
        </div>
      )}
    </>
  );
};

const RenderSelectForDisplayingCote = ({
  userDetails,
  optionsFeedBack,
  feedback,
}) => {
  const quotation = useMemo(() => {
    if (feedback) {
      return feedback.quotations;
    }
  }, feedback);

  const mentions = useMemo(() => {
    if (quotation) {
      const ids = quotation.split(",").map((id) => parseInt(id.trim()));
      const tableauMerge = ids.map((id) => {
        const feedback = optionsFeedBack?.find((fb) => fb.value === id);
        return feedback; 
      });
      return tableauMerge;
    }
    return [];
  }, [optionsFeedBack, quotation]);

  const totalCote = useMemo(() => {
    let total = 0;

    if(mentions){
      mentions.forEach((mention) => {
        total += mention?.cote;
      });
  
      return total;
    }

  }, [mentions]);

  return (
    <>
      <Row>
        <Col xl={3}>
          <CuratorInfo userDetails={userDetails} />
        </Col>
        <Col xl={9}></Col>
      </Row>
      <Row>
        <Col xl={3}></Col>
        <Col xl={6}>
          <div className="mt-3">
            {mentions && (
              <>
                <Row className={"my-3"}>
                  <Col>{"Pertinence par rapport aux ODD/thématique : "}</Col>
                  <Col>
                    {" "}
                    <Select
                      options={optionsFeedBack}
                      value={mentions[0]}
                      isDisabled={true}
                    />
                  </Col>
                </Row>
                <Row className={"my-3"}>
                  <Col>{"Impact local"}</Col>
                  <Col>
                    {" "}
                    <Select
                      options={optionsFeedBack}
                      value={mentions[1]}
                      isDisabled={true}
                    />
                  </Col>
                </Row>
                <Row className={"my-3"}>
                  <Col>{"Innovation"}</Col>
                  <Col>
                    {" "}
                    <Select
                      options={optionsFeedBack}
                      value={mentions[2]}
                      isDisabled={true}
                    />
                  </Col>
                </Row>
                <Row className={"my-3"}>
                  <Col>{"Échelle de mise en œuvre"}</Col>
                  <Col>
                    {" "}
                    <Select
                      options={optionsFeedBack}
                      value={mentions[3]}
                      isDisabled={true}
                    />
                  </Col>
                </Row>
              </>
            )}

            {totalCote && (
              <ProgressIndicator currentCote={totalCote} maxCote={40} />
            )}
          </div>
        </Col>
        <Col xl={3}></Col>
      </Row>
    </>
  );
};

const RenderSelectForSendingCote = ({
  optionsFeedBack,
  userConnectedEmail,
  solutionId,
}) => {
  const [selectedRatings, setSelectedRatings] = useState({
    Pertinence: null,
    Impact: null,
    Innovation: null,
    Echelle: null,
  });

  const handleRatingChange = (criteria, selectedOption) => {
    setSelectedRatings((prevState) => ({
      ...prevState,
      [criteria]: selectedOption,
    }));

    let newTotalCote = 0;
    Object.values({
      ...selectedRatings,
      [criteria]: selectedOption,
    }).forEach((rating) => {
      if (rating) {
        newTotalCote += rating.cote;
      }
    });
    setTotalCote(newTotalCote);
  };

  const [totalCote, setTotalCote] = useState(0);

  const quotations = useMemo(() => {
    if (selectedRatings) {
      return [
        selectedRatings.Pertinence?.value,
        selectedRatings.Impact?.value,
        selectedRatings.Innovation?.value,
        selectedRatings.Echelle?.value,
      ].filter((value) => value !== null && value !== undefined);
    }
    return [];
  }, [selectedRatings]);

  const handleSendRating = async () => {
    const payload = {
      quotations,
      user: userConnectedEmail,
    };

    if (solutionId && userConnectedEmail && quotations) {
      try {
        await axios.post(`/solutions/feedback/${solutionId}`, payload);
        toast.success("Côte envoyée avec succès");
      } catch (error) {
        console.error("Erreur survenue lors de l'envoi de la côte ", error);
        toast.error("Erreur survenue lors de l'envoi de côte");
      }
    }
  };

  return (
    <div
      className={"my-5"}
      style={{ border: "1px solid #ccc", padding: "10px" }}
    >
      <h4>Curérer à Nouveau</h4>
      <Row>
        <Col xl={3}></Col>
        <Col xl={6}>
          <div className="mt-3">
            <Row className={"my-3"}>
              <Col>{"Pertinence par rapport aux ODD/thématique : "}</Col>
              <Col>
                <Select
                  options={optionsFeedBack}
                  onChange={(selectedOption) =>
                    handleRatingChange("Pertinence", selectedOption)
                  }
                />
              </Col>
            </Row>
            <Row className={"my-3"}>
              <Col>{"Impact local"}</Col>
              <Col>
                <Select
                  options={optionsFeedBack}
                  onChange={(selectedOption) =>
                    handleRatingChange("Impact", selectedOption)
                  }
                />
              </Col>
            </Row>
            <Row className={"my-3"}>
              <Col>{"Innovation"}</Col>
              <Col>
                <Select
                  options={optionsFeedBack}
                  onChange={(selectedOption) =>
                    handleRatingChange("Innovation", selectedOption)
                  }
                />
              </Col>
            </Row>
            <Row className={"my-3"}>
              <Col>{"Échelle de mise en œuvre"}</Col>
              <Col>
                <Select
                  options={optionsFeedBack}
                  onChange={(selectedOption) =>
                    handleRatingChange("Echelle", selectedOption)
                  }
                />
              </Col>
            </Row>

            <ProgressIndicator currentCote={totalCote} maxCote={40} />

            <div className={"mt-5"}>
              <Button
                variant=""
                className="btn btn-primary"
                type="button"
                onClick={handleSendRating}
              >
                {"Envoyer la notation"}
              </Button>
            </div>
          </div>
        </Col>
        <Col xl={3}></Col>
      </Row>
    </div>
  );
};

export default Cotations;
