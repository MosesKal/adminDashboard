import React, { useEffect, useState } from "react";
import { Col, Button, Breadcrumb, Row, Card } from "react-bootstrap";
import SolutionTab from "./solution/solutionTab";
import CardInnovateur from "./solution/cardInnovateur";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Seo from "@/shared/layout-components/seo/seo";
import { useRouter } from "next/router";
import axios from "@/pages/api/axios";
import { useSelector } from "react-redux";
import Title from "../components/Title";

const Solution = () => {

  const [profileInnovateur, setProfileInnovateur] = useState();

  const solutionsState = useSelector(
    (state) => state.solutionReducer.solutions
  );

  const statusState = useSelector((state) => state.statusReducer.status);

  const thematicsState = useSelector(
    (state) => state.thematicsReducer.thematics
  );

  const polesState = useSelector((state) => state.polesReducer.poles);

  const userState = useSelector((state) => state.usersReducer.users);

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
  const [showYoutubeThumbnail, setShowYoutubeThumbnail] = useState(true);
  const imageLinks = [];

  const [isAdmin, setIsAdmin] = useState(false);
  const [isCommentedByAnother, setIsCommentedByAnother] = useState(false);

  const [isExistCommentaire, setIsExistCommentaire] = useState(false);
  const [commentaires, setCommentaires] = useState();
  let userConnected;

  const [allSolutions, setAllSolution] = useState([]);
  const [profile, setProfile] = useState(null);
  const [isLoadingSolution, setIsLoadingSolution] = useState(false);

  if (typeof window !== "undefined") {
    userConnected = JSON.parse(localStorage?.getItem("ACCESS_ACCOUNT"));
  }

  useEffect(() => {
    const status = JSON.parse(localStorage?.getItem("STATUS_ACCOUNT"));
    const userRoles = JSON.parse(
      localStorage?.getItem("ACCESS_ACCOUNT")
    )?.roles;
    setIsAdmin(userRoles?.some((role) => role.name === "ADMIN"));

    if (status.authenticate) {
      setDomLoaded(true);
      setParametreId(id);
      setParametreUserId(innovateurId);
      setParametreThematiqueId(thematiqueId);

      const fetchInnovateur = async () => {
        if (navigate.query.innovateurId) {
          const id = parseInt(navigate.query.innovateurId);
          const profileInnovateur = userState.find(
            (innovateur) => innovateur.id === id
          );
          if (profileInnovateur) {
            setProfileInnovateur(profileInnovateur);
          }
        }
      };

      const fetchSolution = async () => {
        if (navigate.query.id) {
          const id = parseInt(navigate.query.id);
          const solution = solutionsState.find(
            (solution) => solution.id === id
          );
          if (solution) {
            setSolution(solution);
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
        setOptions(
          statusState.map((option) => ({
            value: option.id,
            label: option.name,
          }))
        );
      };

      const fetchPole = async () => {
        setOptionsPole(
          polesState.map((option) => ({
            value: option.id,
            label: option.name,
          }))
        );
      };

      const fetchFeedBack = async () => {
        let data;
        try {
          const labelsResponse = await axios.get("/quotations");

          data = labelsResponse?.data?.data;

          setOptionsFeedBack(
            data.map((option) => ({
              value: option.id,
              label: `${option.mention} - ${option.average}`,
              cote: option.average,
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
    }
  }, [
    id,
    innovateurId,
    navigate,
    isAdmin,
    thematiqueId,
    statusState,
    polesState,
    thematicsState,
    solutionsState,
    userState,
  ]);

  useEffect(() => {
    if (solution) {
      if (
        solution.feedbacks &&
        solution.feedbacks.length > 0 &&
        solution.feedbacks[0].userId === userConnected.id
      ) {
        setIsExistCommentaire(true);
        setCommentaires(solution.feedbacks);
        setIdCurateur(solution?.feedbacks[0].userId);
      } else if (
        solution.feedbacks &&
        solution.feedbacks.length > 0 &&
        solution.feedbacks[0].userId !== userConnected.id
      ) {
        setIsCommentedByAnother(true);
        setCommentaires(solution.feedbacks);
        setIdCurateur(solution?.feedbacks[0].userId);
      } else {
        setIsExistCommentaire(false);
        setIsCommentedByAnother(false);
      }
    }
  }, [solution, userConnected, isAdmin]);

  useEffect(() => {
    const fetchAllSolution = async () => {
      if (profile) {
        try {
          setIsLoadingSolution(true);
          let responseSolution;
          if (isAdmin) {
            setAllSolution(solutionsState);
          } else {
            responseSolution = await axios.get(
              `/solutions/pole/${profile?.poleId}`
            );
            setAllSolution(responseSolution?.data?.data);
          }

          setIsLoadingSolution(false);
        } catch (error) {
          setIsLoadingSolution(false);
          console.error("Erreur lors de la récupération des données :", error);
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
        user: userConnected?.email,
        adminComment: commentUser,
        userComment: "",
      };

      await axios.post(`/solutions/feedback/${solution?.id}`, payload);
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
        let id = parseInt(idCurateur);
        const profileCurateur = userState.find(
          (profileCurateur) => profileCurateur.id === id
        );
        if (profileCurateur) {
          setProfileCurateur(profileCurateur);
        }
      }
    };
    fetchCurateur();
  }, [idCurateur]);

  const handleChangeCommentUser = (e) => {
    setCommentUser(e.target.value);
  };

  const handlePreviousSolution = async () => {
    const currentIndex = allSolutions?.findIndex(
      (sol) => sol?.id === solution?.id
    );
    let previousSolution;
    if (currentIndex > 0) {
      previousSolution = allSolutions[currentIndex - 1];

      const id = parseInt(previousSolution.id);
      const userId = parseInt(previousSolution?.userId);
      const solution = solutionsState.find((solution) => solution.id === id);
      if (solution) {
        setSolution(solution);
      }

      if (userId) {
        const profileInnovateur = userState.find(
          (innovateur) => innovateur.id === userId
        );
        if (profileInnovateur) {
          setProfileInnovateur(profileInnovateur);
        }
      }
    }
  };

  const handleNextSolution = async () => {
    const currentIndex = allSolutions?.findIndex(
      (sol) => sol.id === solution.id
    );
    let nextSolution;
    if (currentIndex < allSolutions?.length - 1) {
      nextSolution = allSolutions[currentIndex + 1];
      const id = parseInt(nextSolution.id);
      const userId = parseInt(nextSolution?.userId);

      const solution = solutionsState.find((solution) => solution.id === id);
      if (solution) {
        setSolution(solution);
      }

      if (userId) {
        const profileInnovateur = userState.find(
          (innovateur) => innovateur.id === userId
        );
        if (profileInnovateur) {
          setProfileInnovateur(profileInnovateur);
        }
      }
    }
  };

  return (
    <div>
      <Seo title={"Profile"} />
      <Title title="DETAILS DE LA SOLUTION" />
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
            isCommentedByAnother={isCommentedByAnother}
            userConnected={userConnected}
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
