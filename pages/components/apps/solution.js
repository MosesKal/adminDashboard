import React, { useEffect, useState } from "react";
import { Col, Button, Breadcrumb, Row, Card } from "react-bootstrap";
import SolutionTab from "./solution/solutionTab";
import CardInnovateur from "./solution/cardInnovateur";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Seo from "@/shared/layout-components/seo/seo";
import { useRouter } from "next/router";
import axios from "@/pages/api/axios";

library.add(faPlay);

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
  const id = navigate?.query?.id;
  const innovateurId = navigate?.query?.innovateurId;
  const thematiqueId = navigate?.query?.thematiqueId;

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
  const [idCurateur, setIdCurateur] = useState();

  const [newStatus, setNewStatus] = useState(null);
  const [newPole, setNewPole] = useState(null);
  const [newFeedBack, setNewFeedBack] = useState(null);

  const [isLoadingUpdateStatut, setIsLoadingUpdateStatut] = useState(false);
  const [isLoadingupdatePole, setIsLoadingUpdatePole] = useState(false);
  const [showYoutubeModal, setShowYoutubeModal] = useState(false);
  const [showYoutubeThumbnail, setShowYoutubeThumbnail] = useState(true);
  const imageLinks = [];
  const [isLoadingSendMail, setIsLoadingSendMail] = useState(false);

  const [isAdmin, setIsAdmin] = useState(false);
  const [isCommented, setIsCommented] = useState(false);

  const [isExistCommentaire, setIsExistCommentaire] = useState(false);
  const [commentaires, setCommentaires] = useState();
  let emailCurateur;

  const [allSolutions, setAllSolution] = useState([]);
  const [profile, setProfile] = useState(null);
  const [solutions, setSolutions] = useState([]);
  const [isLoadingSolution, setIsLoadingSolution] = useState(false);

  if (typeof window !== "undefined") {
    emailCurateur = JSON.parse(localStorage?.getItem("ACCESS_ACCOUNT"));
  }

  useEffect(() => {
    const status = JSON.parse(localStorage?.getItem("STATUS_ACCOUNT"));
    const userRoles = JSON.parse(localStorage?.getItem("ACCESS_ACCOUNT"))
      ?.roles;
    setIsAdmin(userRoles?.some((role) => role.name === "ADMIN"));

    if (status.authenticate) {
      setDomLoaded(true);
      setParametreId(id);
      setParametreUserId(innovateurId);
      setParametreThematiqueId(thematiqueId);


      const fetchInnovateur = async () => {
        if (navigate.query.innovateurId) {
          try {
            const profileResponse = await axios.get(`/users/${navigate?.query?.innovateurId}`);
            setProfileInnovateur(profileResponse?.data?.data);
          } catch (error) {
            console.log(error);
          }
        }
      };

      const fetchSolution = async () => {
        if (navigate.query.id) {
          try {
            const solutionResponse = await axios.get(`/solutions/${navigate?.query?.id}`);
            setSolution(solutionResponse?.data?.data);
          } catch (error) {
            console.log(error);
          }
        }

      };

      const fetchThematique = async () => {

        if (navigate.query.thematiqueId) {

          try {
            const thematiqueResponse = await axios.get(
              `/thematics/${navigate?.query?.thematiqueId}`
            );
            setThematique(thematiqueResponse?.data?.data);
          } catch (error) {
            console.log(error);
          }
        }
      };

      const fetchStatus = async () => {
        let data;
        try {
          const statusResponse = await axios.get("/status");
          data = statusResponse?.data?.data;

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

          data = poleResponse?.data?.data;

          setOptionsPole(
            data.map((option) => ({
              value: option.id,
              label: option.name,
            }))
          );
        } catch (e) {
          console.log(e);
        }
      };

      const fetchFeedBack = async () => {
        let data;
        try {
          const labelsResponse = await axios.get("/labels");

          data = labelsResponse?.data?.data;

          setOptionsFeedBack(
            data.map((option) => ({
              value: option.id,
              label: option.name,
            }))
          );
        } catch (e) {
          console.log(e);
        }
      };

      const fetchProfile = async () => {
        try {
          const profileResponse = await axios.get("/auth/profile/");
          setProfile(profileResponse?.data?.data);
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
      fetchProfile();
    } else {
      navigate.push("/");
    }
  }, [
    id,
    innovateurId,
    navigate,
    isAdmin,
    thematiqueId,
    // navigate.query.id,
    // navigate.query.innovateurId,
    // navigate.query.thematiqueId,
  ]);



  useEffect(() => {
    if (solution) {
      if (solution?.feedbacks && solution?.feedbacks?.length > 0) {
        solution?.feedbacks?.forEach((feedback) => {
          if (
            feedback?.userId === emailCurateur?.id ||
            isAdmin
          ) {
            setIdCurateur(feedback?.userId);
            setIsExistCommentaire(true);
            setCommentaires(feedback?.adminComment);
          }
          if (
            solution?.feedbacks?.length > 0 ||
            feedback?.userId !== emailCurateur?.id
          ) {
            setIsCommented(true);
          }
        });
      }
    }
  }, [solution, emailCurateur, isAdmin]);

  useEffect(() => {
    const fetchAllSolution = async () => {
      if (profile) {
        try {
          setIsLoadingSolution(true);
          let responseSolution;
          if (isAdmin) {
            responseSolution = await axios.get("/solutions");
          } else {
            responseSolution = await axios.get(
              `/solutions/pole/${profile?.poleId}`
            );
          }

          setAllSolution(responseSolution?.data?.data);
          setIsLoadingSolution(false);
        } catch (error) {
          setIsLoadingSolution(false);
          console.error(
            "Erreur lors de la récupération des données :",
            error
          );
        }
      }
    };

    fetchAllSolution();
  }, [profile, isAdmin]);

  const handleSelectChange = async (selectedOptions) => {
    setSelectedOptions(selectedOptions);
    setOptionId(selectedOptions.value);
    setNewStatus(selectedOptions);
  };

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
    const feedbacks = [newFeedBack?.value];
    feedbacks.push();

    try {
      const payload = {
        labels: feedbacks,
        user: emailCurateur?.email,
        adminComment: commentUser,
        userComment: "",
      };

      const response = await axios.post(
        `/solutions/feedback/${solution?.id}`,
        payload
      );
      toast.success("Feedback envoyé avec succès");
    } catch (error) {
      console.error(
        "Erreur survenue lors de l'envoi de l'impression :",
        error
      );
      toast.error("Erreur survenue lors de l'envoi de l'impression");
    }
  };

  const handleSelectChangePole = async (selectedOptionPole) => {
    setSelectedOptionsPole(selectedOptionPole);
    setOptionPoleId(setSelectedOptionsPole.value);
    setNewPole(selectedOptionPole);
  };

  const handleSelectChangeFeedBack = async (selectedOptionFeedBack) => {
    setSelectedOptionFeedBack(selectedOptionFeedBack);
    setOptionFeedBackId(setSelectedOptionFeedBack.value);
    setNewFeedBack(selectedOptionFeedBack);
  };

  if (solution) {
    if (solution?.imageLink) {
      imageLinks.push({ link: solution?.imageLink });
    }
    if (solution.images && solution?.images?.length > 0) {
      solution?.images?.forEach((image) => {
        imageLinks?.push({ link: image?.imageLink });
      });
    }
  }

  useEffect(() => {
    const fetchCurateur = async () => {
      if (idCurateur) {
        try {
          const curateurResponse = await axios.get(`/users/${idCurateur}`);
          setProfileCurateur(curateurResponse?.data?.data);
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchCurateur();
  }, [idCurateur]);

  const handleChangeCommentUser = (e) => {
    setCommentUser(e.target.value);
  };

  const handlePreviousSolution = async () => {
    const currentIndex = allSolutions.findIndex((sol) => sol?.id === solution?.id);
    if (currentIndex > 0) {
      setSolution(allSolutions[currentIndex - 1]);
      const previousSolution = allSolutions[currentIndex - 1];
      try {
        if (previousSolution.userId) {
          const profileResponse = await axios.get(`/users/${previousSolution?.userId}`);
          setProfileInnovateur(profileResponse?.data?.data);
        }

      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleNextSolution = async () => {
    const currentIndex = allSolutions.findIndex((sol) => sol.id === solution.id);
    if (currentIndex < allSolutions?.length - 1) {
      setSolution(allSolutions[currentIndex + 1]);
      const nextSolution = allSolutions[currentIndex + 1];
      try {
        if (nextSolution.userId) {
          const profileResponse = await axios.get(`/users/${nextSolution?.userId}`);
          setProfileInnovateur(profileResponse?.data?.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };



  return (
    <div>
      <Seo title={"Profile"} />
      <div className="breadcrumb-header justify-content-between">
        <div className="left-content">
          <span className="main-content-title mg-b-0 mg-b-lg-1">
            SOLUTION DETAILs
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

          <CardInnovateur profileInnovateur={profileInnovateur} />

          <SolutionTab
            solution={solution}
            thematique={thematique}
            imageLinks={imageLinks}
            isLoadingupdatePole={isLoadingupdatePole}
            handleChangePole={handleChangePole}
            optionsPole={optionsPole}
            handleSelectChangePole={handleSelectChangePole}
            handleSendFeedBack={handleSendFeedBack}
            isExistCommentaire={isExistCommentaire}
            handleChangeCommentUser={handleChangeCommentUser}
            commentaires={commentaires}
            handleSelectChangeFeedBack={handleSelectChangeFeedBack}
            handleSelectChange={handleSelectChange}
            isAdmin={isAdmin}
            options={options}
            handleChangeStatus={handleChangeStatus}
            isLoadingUpdateStatut={isLoadingUpdateStatut}
            optionsFeedBack={optionsFeedBack}
            profileCurateur={profileCurateur}
            showYoutubeThumbnail={showYoutubeThumbnail}
          />
          <Col lg={12} md={12} xl={12}>
            <Card>
              <Card.Body>

                <div className="text-wrap">
                  <div className="example">
                    <Row className="row-sm align-item-center">
                      <Col lg={6}>
                        <div
                          aria-label="Basic example"
                          className="d-flex justify-content-start"

                        >
                          <Button
                            onClick={handlePreviousSolution}
                            type="button"
                            className="btn button-icon"
                          >
                            <i class="bi bi-chevron-double-left"></i>
                            <span>Solution Précedente</span>
                          </Button>

                        </div>
                      </Col>

                      <Col lg={6}>
                        <div
                          aria-label="Basic example"
                          className="d-flex justify-content-end"

                        >
                          <Button
                            onClick={handleNextSolution}
                            type="button"
                            className="btn button-icon"
                          >
                            <span>Solution Suivante</span>
                            <i class="bi bi-chevron-double-right"></i>
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>

              </Card.Body>
            </Card>
          </Col>
        </Col >
      </Row >
      <Row className=" row-sm">
        <Col lg={12} md={12}>
          <div className="tab-content"></div>
        </Col>
      </Row>
      <ToastContainer />
    </div >
  );
};

Solution.propTypes = {};

Solution.defaultProps = {};

Solution.layout = "Contentlayout";

export default Solution;
