import React, { useEffect, useState } from "react";
import { Image, Card, Col, Button, Breadcrumb, Nav, Row, Tab, Carousel, Badge } from "react-bootstrap";

import Link from "next/link";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import Seo from "@/shared/layout-components/seo/seo";
import { useRouter } from "next/router";
import axios from "@/pages/api/axios";
import { apiBaseUrl } from "@/pages/api/axios";
import moment from "moment";
import YoutubeDescriptionModal from "./YoutubeDescriptionModal";


library.add(faPlay);

const getVideoIdFromUrl = (url) => {
  const pattern =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

  const match = url.match(pattern);
  return match ? match[1] : null;
};

const isImageValid = (url) => {
  const validExtensions = ['.jpeg', '.jpg', '.png', '.gif'];
  if (url) {
    const lowercasedUrl = url.toLowerCase();
    return validExtensions.some((extension) => lowercasedUrl.endsWith(extension));
  } else {
    return false;
  }
};

const Carousels = ({ imageLinks }) => {
  let isValidImageFound = false;

  return (
    <div>
      <div>
        <Row className="row-sm">
          <Col>
            <Card className="custom-card">
              <Card.Body className="ht-100p">
                <div>
                  <h6 className="card-title mb-1">Image(s) appuis de la solution</h6>
                  <p className="text-muted card-sub-title">
                    {"Les images ci-dessous attestent de l'existence de la solution"}
                  </p>
                </div>
                <div className="Withcontrols">
                  {imageLinks.length > 0 && imageLinks[0].link !== null ? (
                    (isValidImageFound = imageLinks.some((imageLink) => isImageValid(imageLink.link)))
                  ) : (
                    (isValidImageFound = false)
                  )}

                  {isValidImageFound ? (
                    <Carousel>
                      {imageLinks
                        .filter((imageLink) => isImageValid(imageLink.link))
                        .map((imageLink, index) => (
                          <Carousel.Item className="" key={index}>
                            <img
                              alt="img"
                              className="d-block w-100"
                              src={`${apiBaseUrl}/uploads/${imageLink.link}`}
                              style={{ height: "500px" }}
                            />
                          </Carousel.Item>
                        ))}
                    </Carousel>
                  ) : (
                    <Carousel>
                      <Carousel.Item className="">
                        <img
                          alt="img"
                          className="d-block w-100"
                          src={"../../../assets/img/photos/18.jpg"}
                        />
                      </Carousel.Item>
                      <Carousel.Item className="">
                        <img
                          alt="img"
                          className="d-block w-100"
                          src={"../../../assets/img/photos/12.jpg"}
                        />
                      </Carousel.Item>
                      <Carousel.Item className="">
                        <img
                          alt="img"
                          className="d-block w-100"
                          src={"../../../assets/img/photos/13.jpg"}
                        />
                      </Carousel.Item>
                    </Carousel>
                  )}
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};


const Solution = () => {

  const router = useRouter();
  const [profileInnovateur, setProfileInnovateur] = useState();
  const [solution, setSolution] = useState();

  const [thematique, setThematique] = useState();
  const [domLoaded, setDomLoaded] = useState(false);
  const [parametreId, setParametreId] = useState(null);
  const [parametreUserId, setParametreUserId] = useState(null);
  const [parametreThematiqueId, setParametreThematiqueId] = useState(null);

  const navigate = useRouter();
  const id = navigate.query.id;
  const innovateurId = navigate.query.innovateurId;
  const thematiqueId = navigate.query.thematiqueId;

  const [options, setOptions] = useState();
  const [selectedOptions, setSelectedOptions] = useState();
  const [optionId, setOptionId] = useState();

  const [optionsPole, setOptionsPole] = useState();
  const [selectedOptionsPole, setSelectedOptionsPole] = useState();
  const [optionPoleId, setOptionPoleId] = useState();

  const [optionsFeedBack, setOptionsFeedBack] = useState();
  const [selectedOptionFeedBack, setSelectedOptionFeedBack] = useState();
  const [optionFeedBackId, setOptionFeedBackId] = useState();

  const [commentUser, setCommentUser] = useState(null);
  const [profileCurateur, setProfileCurateur] = useState();

  const [newStatus, setNewStatus] = useState(null);
  const [newPole, setNewPole] = useState(null);
  const [newFeedBack, setNewFeedBack] = useState(null);

  const [isLoadingUpdateStatut, setIsLoadingUpdateStatut] = useState(false);
  const [isLoadingupdatePole, setIsLoadingUpdatePole] = useState(false)
  const [showYoutubeModal, setShowYoutubeModal] = useState(false);
  const [showYoutubeThumbnail, setShowYoutubeThumbnail] = useState(true);
  const imageLinks = [];
  const [isLoadingSendMail, setIsLoadingSendMail] = useState(false);

  const [isAdmin, setIsAdmin] = useState(false);

  const [isExistCommentaire, setIsExistCommentaire] = useState(false);
  const [commentaires, setCommentaires] = useState();
  let emailCurateur;

  if (typeof window !== 'undefined') {
    emailCurateur = JSON.parse(localStorage?.getItem('ACCESS_ACCOUNT'));
  }

  useEffect(() => {

    const status = JSON.parse(localStorage?.getItem("STATUS_ACCOUNT"));

    const userRoles = JSON.parse(localStorage?.getItem("ACCESS_ACCOUNT"))?.roles;
    setIsAdmin(userRoles?.some(role => role.name === "ADMIN"));

    if (status.authenticate) {
      setDomLoaded(true);
      setParametreId(id);
      setParametreUserId(innovateurId);
      setParametreThematiqueId(thematiqueId);

      const fetchInnovateur = async () => {
        try {
          const profileResponse = await axios.get(`/users/${innovateurId}`);
          setProfileInnovateur(profileResponse.data.data);
        } catch (error) {
          console.log(error);
        }
      };
      const fetchSolution = async () => {
        try {
          const solutionResponse = await axios.get(`/solutions/${id}`);
          setSolution(solutionResponse.data.data);

        } catch (error) {
          console.log(error);
        }
      };

      const fetchThematique = async () => {
        try {
          const thematiqueResponse = await axios.get(
            `/thematics/${thematiqueId}`
          );
          setThematique(thematiqueResponse.data.data);
        } catch (error) {
          console.log(error);
        }
      };

      const fetchStatus = async () => {
        let data;

        try {
          const statusResponse = await axios.get("/status");
          data = statusResponse.data.data;

          setOptions(
            data.map((option) => ({
              value: option.id,
              label: option.name,
            }))
          );
        } catch (error) {
          console.log(error);
        }
      };
      const fetchPole = async () => {
        let data;
        try {
          const poleResponse = await axios.get("/poles");

          data = poleResponse.data.data;

          setOptionsPole(
            data.map((option) => ({
              value: option.id,
              label: option.name
            }))
          );

        } catch (e) {
          console.log(e)
        }
      }

      const fetchFeedBack = async () => {
        let data;
        try {
          const labelsResponse = await axios.get("/labels");

          data = labelsResponse.data.data;

          setOptionsFeedBack(
            data.map((option) => ({
              value: option.id,
              label: option.name
            }))
          );

        } catch (e) {
          console.log(e)
        }
      }

      const fetchCommentaire = async () => {

        try {
          const response = await axios.get(`/solutions/${id}/feedbacks`);
          setIsExistCommentaire(response.data.data.length > 0);
          console.log("commentaires", response.data.data);
        } catch (error) {
          console.error("Erreur survenue lors de la récupération des commentaires :", error);
        }

      }

      const fecthProfile = async () => {
        try {
          const profileResponse = await axios.get(
            `/auth/profile/`
          );
          setProfileCurateur(profileResponse.data.data);
        } catch (error) {
          console.log(error);
        }
      };


      fetchInnovateur();
      fetchSolution();
      fetchThematique();
      fetchStatus();
      fetchPole();
      fetchFeedBack();
      fetchCommentaire();
      fecthProfile();

    } else {
      navigate.push("/");
    }
  }, [
    id,
    innovateurId,
    navigate,
    thematiqueId,
    navigate.query.id,
    navigate.query.innovateurId,
    navigate.query.thematiqueId,
  ]);

  const handleSelectChange = async (selectedOptions) => {
    setSelectedOptions(selectedOptions);
    setOptionId(selectedOptions.value);
    setNewStatus(selectedOptions);
  }

  const handleChangeStatus = async () => {
    try {
      setIsLoadingUpdateStatut(true);
      if (newStatus) {
        const response = await axios.patch(`/solutions/${id}`, {
          status: newStatus.value,
        });
        toast.success("Statut mis à jour avec succès");
        setIsLoadingUpdateStatut(false);
      }
    } catch (error) {
      setIsLoadingUpdateStatut(false);
      console.error("Erreur lors de la mise à jour du statut :", error);
      toast.error("Erreur lors de la mise à jour du statut");
    }
  };

  const handleChangePole = async () => {
    try {
      setIsLoadingUpdatePole(true);
      if (newPole) {
        const response = await axios.patch(`/solutions/${id}`, {
          pole: newPole.value,
        });
        toast.success("Pôle mis à jour avec succès");
        setIsLoadingUpdatePole(false);
      }
    } catch (error) {
      setIsLoadingUpdatePole(false);
      console.error("Erreur lors de la mise à jour du Pôle :", error);
      toast.error("Erreur lors de la mise à jour du Pôle");
    }
  };

  const handleSendFeedBack = async () => {

    const feedbacks = [newFeedBack?.value]
    feedbacks.push();

    try {
      const payload = {
        labels: feedbacks,
        user: emailCurateur?.email,
        adminComment: commentUser,
        userComment: "",
      }

      const response = await axios.post(`/solutions/feedback/${solution?.id}`, payload);
      toast.success("Feedback envoyé avec succès");


    } catch (error) {
      console.error("Erreur survenue lors de l'envoi de l'impression :", error);
      toast.error("Erreur survenue lors de l'envoi de l'impression");
    }
  };

  const handleSelectChangePole = async (selectedOptionPole) => {
    setSelectedOptionsPole(selectedOptionPole);
    setOptionPoleId(setSelectedOptionsPole.value);
    setNewPole(selectedOptionPole);
  }

  const handleSelectChangeFeedBack = async (selectedOptionFeedBack) => {
    setSelectedOptionFeedBack(selectedOptionFeedBack);
    setOptionFeedBackId(setSelectedOptionFeedBack.value);
    setNewFeedBack(selectedOptionFeedBack);
  }

  const toggleYoutubeModal = () => {
    setShowYoutubeModal(!showYoutubeModal);
  };

  const toggleYoutubeThumbnail = () => {
    setShowYoutubeThumbnail(!showYoutubeThumbnail);
  };

  if (solution) {
    if (solution.imageLink) {
      imageLinks.push({ "link": solution.imageLink })
    }

    if (solution.images && solution.images.length > 0) {
      solution.images.forEach((image) => {
        imageLinks.push({ "link": image.imageLink });
      });
    }
  }

  useEffect(() => {
    if (solution) {
      if (solution.feedbacks && solution.feedbacks.length > 0) {

        solution.feedbacks.forEach(feedback => {

          if (feedback.userId === emailCurateur?.id) {
            setIsExistCommentaire(true);
            setCommentaires(feedback.adminComment)
          }
        });
      }
    }
  }, [solution, emailCurateur]);

  return (
    <div>
      <Seo title={"Profile"} />
      <div className="breadcrumb-header justify-content-between">
        <div className="left-content">
          <span className="main-content-title mg-b-0 mg-b-lg-1">
            SOLUTION DETAIL
          </span>
        </div>
        <div className="justify-content-center mt-2">
          <Breadcrumb className="breadcrumb">
            <Button variant="" type="button" className="btn button-icon btn-sm btn-outline-secondary me-1"
              onClick={() => router.back()}>
              <i class="bi bi-arrow-left"></i> <span className="ms-1">{"Retour"}</span>
            </Button>
          </Breadcrumb>
        </div>
      </div>
      <Row>
        <Col lg={12} md={12}>
          <Card className="custom-card customs-cards">
            <Card.Body className=" d-md-flex bg-white">
              <div className="">
                <span className="profile-image pos-relative">
                  <img
                    className="br-5"
                    alt=""
                    src={profileInnovateur?.profile ? `${apiBaseUrl}/uploads/${profileInnovateur.profile}` : "../../../assets/img/faces/profile.jpg"}
                  />
                  <span className="bg-success text-white wd-1 ht-1 rounded-pill profile-online"></span>
                </span>
              </div>
              <div className="my-md-auto mt-4 prof-details">
                <h4 className="font-weight-semibold ms-md-4 ms-0 mb-1 pb-0">
                  {profileInnovateur ? profileInnovateur.name : ""}
                </h4>
                <p className="tx-13 text-muted ms-md-4 ms-0 mb-2 pb-2 ">
                  <span className="me-3">
                    <i className="far fa-address-card me-2"></i>Innovateur
                  </span>
                  <span className="me-3">
                    <i class="bi bi-geo-alt-fill me-2"></i>
                    {profileInnovateur ? profileInnovateur.address : ""}
                  </span>
                  <span>
                    <i className="far fa-flag me-2"></i>RDC
                  </span>
                </p>
                <p className="text-muted ms-md-4 ms-0 mb-2">
                  <span>
                    <i className="fa fa-phone me-2"></i>
                  </span>
                  <span className="font-weight-semibold me-2">Phone:</span>
                  <span>
                    {profileInnovateur ? profileInnovateur.phoneNumber : ""}
                  </span>
                </p>
                <p className="text-muted ms-md-4 ms-0 mb-2">
                  <span>
                    <i className="fa fa-envelope me-2"></i>
                  </span>
                  <span className="font-weight-semibold me-2">Email:</span>
                  <span>
                    {profileInnovateur ? profileInnovateur.email : ""}
                  </span>
                </p>
                <p className="text-muted ms-md-4 ms-0 mb-2">
                  <span>
                    <i class="bi bi-calendar-check me-2"></i>
                  </span>
                  <span className="font-weight-semibold me-2">
                    {"Date d'inscription sur la plateforme:"}
                  </span>
                  <span>
                    {profileInnovateur
                      ? moment(profileInnovateur.createdAt).format(
                        "DD MMMM YYYY [à] HH:mm"
                      )
                      : ""}
                  </span>
                </p>
              </div>
            </Card.Body>
          </Card>
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
                  {isAdmin ? (<Nav.Item className="me-1">
                    <Nav.Link className="mb-2 mt-2" eventKey="EditProfile">
                      {"Status de la solution"}
                    </Nav.Link>
                  </Nav.Item>) : ""}

                  <Nav.Item className="me-1">
                    <Nav.Link className="mb-2 mt-2" eventKey="Timeline">
                      Feed-Back
                    </Nav.Link>
                  </Nav.Item>
                  {isAdmin ? (<Nav.Item className="me-1">
                    <Nav.Link className="mb-2 mt-2" eventKey="Assigne">
                      {"Assigner la solution à un Pôle"}
                    </Nav.Link>
                  </Nav.Item>) : ""}
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
                                          Titre
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
                                              {showYoutubeThumbnail || (
                                                <a
                                                  href={`https://www.youtube.com/watch?v=${getVideoIdFromUrl(
                                                    solution.videoLink
                                                  )}`}
                                                  target="_blank"
                                                  rel="noopener noreferrer"
                                                  onClick={
                                                    toggleYoutubeThumbnail
                                                  }
                                                >
                                                  Afficher la vidéo YouTube
                                                </a>
                                              )}
                                            </>
                                          ) : (
                                            "pas de lien youtube"
                                          )}
                                        </p>
                                        {showYoutubeModal &&
                                          solution &&
                                          solution.videoLink && (
                                            <YoutubeDescriptionModal
                                              videoLink={solution.videoLink}
                                              onHide={toggleYoutubeModal}
                                            />
                                          )}
                                      </div>
                                      <div className="m-t-30">
                                        <div className=" p-t-10">

                                          <p className="text-primary m-b-5 tx-17 text-uppercase">
                                            <b className="text-primary m-b-5 tx-17 text-uppercase">
                                              En quoi est-ce que cette solution
                                              / initiative locale est innovante
                                              ?
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
                                              ? moment(
                                                solution.createdAt
                                              ).format(
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
                                            ODD Concerné
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
                                  <Col md={12} xl={8}>
                                    <div className=" mb-4 main-content-label">
                                      Feed-backs solution
                                    </div>

                                    <Row className="row mt-5">
                                      <Col md={6}>{"Sélectionnez votre impression par rapport à la solution"}</Col>
                                      <Col md={6}>
                                        {isExistCommentaire ? (
                                          <Select
                                            options={optionsFeedBack}
                                            onChange={handleSelectChangeFeedBack}
                                            isDisabled={true}
                                          />
                                        ) : (
                                          <Select
                                            options={optionsFeedBack}
                                            onChange={handleSelectChangeFeedBack}
                                          />
                                        )}
                                      </Col>
                                      <Col md={4}></Col>
                                    </Row>

                                    <Row className="row mt-5">
                                      <Col md={6}>{"Votre commentaire par rapport à la solution"}</Col>
                                      <Col md={6}>
                                        {isExistCommentaire ? (
                                          <textarea
                                            className="form-control"
                                            placeholder="Votre Commentaire"
                                            onChange={(e) => setCommentUser(e.target.value)}
                                            disabled={true}
                                            value={commentaires && commentaires}
                                          >
                                          </textarea>
                                        ) : (
                                          <textarea
                                            className="form-control"
                                            placeholder="Votre Commentaire"
                                            onChange={(e) => setCommentUser(e.target.value)}
                                          >
                                          </textarea>
                                        )}
                                      </Col>
                                      <Col md={4}></Col>
                                    </Row>

                                    <Row className="row mt-5">
                                      <Col md={6}></Col>
                                      <Col md={6}>
                                        {isExistCommentaire ? (<Button
                                          variant=""
                                          className="btn btn-primary"
                                          type="button"
                                          onClick={handleSendFeedBack}
                                          disabled
                                        >

                                          {"Envoyer votre impression"}
                                        </Button>) : (
                                          <Button
                                            variant=""
                                            className="btn btn-primary"
                                            type="button"
                                            onClick={handleSendFeedBack}
                                          >
                                            {"Envoyer votre impression"}
                                          </Button>
                                        )}

                                      </Col>
                                    </Row>
                                  </Col>

                                  {
                                    isExistCommentaire ? (<Col md={12} xl={4} className="ps-5">
                                      <div className="">
                                        <Card className="overflow-hidden">
                                          <Card>
                                            <Card.Header>
                                              <h3 className="card-title">COMMENTAIRE</h3>
                                            </Card.Header>
                                            <Card.Body>
                                              <div
                                                className="d-sm-flex p-3 mt-4 sub-review-section border subsection-color br-tl-0 br-tr-0">
                                                <div className="d-flex me-3">

                                                  <img
                                                    className="media-object brround avatar-md"
                                                    alt="64x64"
                                                    src={`${apiBaseUrl}/uploads/${profileCurateur?.profile}`}
                                                  />

                                                </div>
                                                <div className="media-body">

                                                  <h5 className="mt-0 mb-1 font-weight-semibold">
                                                    {profileCurateur?.name}
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

                                                  <p className="font-13  mb-4 mt-2">
                                                    {
                                                      commentaires && (commentaires)
                                                    }
                                                  </p>

                                                  <Link href="#!" className="me-2 mt-1">
                                                    <Badge bg="" className=" bg-success ">
                                                      <span
                                                        className="me-1 fe fe-edit-2 tx-11 ms-1"></span>{solution?.feedbacks[0]?.labels[0]?.name}
                                                    </Badge>
                                                  </Link>

                                                  <div
                                                    className="btn-group btn-group-sm mb-1 ms-auto float-sm-right mt-1">
                                                    <Button variant=""
                                                      className="btn btn-light me-2">
                                                      <span
                                                        className="fe fe-thumbs-up tx-16"></span>
                                                    </Button>
                                                    <Button variant="" className="btn btn-light">
                                                      <span
                                                        className="fe fe-thumbs-down tx-16"></span>
                                                    </Button>
                                                  </div>
                                                </div>
                                              </div>
                                            </Card.Body>
                                          </Card>
                                        </Card>
                                      </div>
                                    </Col>) : ""
                                  }

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
                                      {isLoadingupdatePole ? "Affectation..." : "Affecter la Solution"}
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
        </Col>
      </Row>
      <Row className=" row-sm">
        <Col lg={12} md={12}>
          <div className="tab-content"></div>
        </Col>
      </Row>
      <ToastContainer />
    </div>
  );
};

Solution.propTypes = {};

Solution.defaultProps = {};

Solution.layout = "Contentlayout";

export default Solution;