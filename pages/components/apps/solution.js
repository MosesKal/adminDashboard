import React, { useEffect, useMemo, useState } from "react";
import { Breadcrumb, Button, Card, Col, Row } from "react-bootstrap";
import SolutionTab from "./solution/solutionTab";
import CardInnovateur from "./solution/cardInnovateur";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Seo from "@/shared/layout-components/seo/seo";
import { useRouter } from "next/router";
import axios from "@/pages/api/axios";
import Title from "../components/Title";

const Solution = () => {
  const navigate = useRouter();

  const [allCuratedSolutions, setAllCuratedSolutions] = useState([]);
  const [solution, setSolution] = useState(null);
  const [feedbacksWithUserDetails, setFeedbacksWithUserDetails] = useState();

  const [thematique, setThematique] = useState();

  const [domLoaded, setDomLoaded] = useState(false);

  const id = navigate?.query?.id;

  const thematiqueId = navigate?.query?.thematiqueId;

  const [optionsStatus, setOptionsStatus] = useState();

  const [optionsPole, setOptionsPole] = useState();

  const [optionsFeedBack, setOptionsFeedBack] = useState();

  const [commentUser, setCommentUser] = useState(null);

  const [profileCurateur, setProfileCurateur] = useState();

  const [idCurateur, setIdCurateur] = useState();

  const imageLinks = [];

  const [isAdmin, setIsAdmin] = useState(false);

  const [profile, setProfile] = useState(null);


  useEffect(() => {

    const storedSolution = localStorage.getItem("solution");
    const storedProfileInnovateur = localStorage.getItem("profileInnovateur");

    if (storedSolution) {
      setSolution(JSON.parse(storedSolution));
    }

    if (storedProfileInnovateur) {
      profileInnovateur = JSON.parse(storedProfileInnovateur);
    }

    const fetchSolution = async () => {
      try {
        const solutionResponse = await axios.get(`/solutions/${id}`);
        setSolution(solutionResponse?.data?.data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchCuratedSolutions = async () => {
      try {
        const solutionsResponse = await axios.get("/solutions/curated/all");
        setAllCuratedSolutions(solutionsResponse?.data?.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des solutions :", error);
      }
    };

    fetchCuratedSolutions();

    fetchSolution();

    return () => {
      localStorage.removeItem("profileInnovateur");
      localStorage.removeItem("solution");
    };

  }, []);

  const fetchUserDetails = async (userId) => {
    try {
      const userResponse = await axios.get(`/users/${userId}`);
      return userResponse.data.data;
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des détails de l'utilisateur :",
        error
      );
      return null;
    }
  };

  useEffect(() => {

    const fetchFeedbacksWithUserDetails = async () => {
      if (solution && solution.feedbacks.length > 0) {
        const feedbacksWithUserDetails = await Promise.all(
          solution.feedbacks.map(async (feedback) => {
            const userDetails = await fetchUserDetails(feedback.userId);
            return { ...feedback, userDetails };
          })
        );
        setFeedbacksWithUserDetails(feedbacksWithUserDetails);
      }
      return null;
    };

    fetchFeedbacksWithUserDetails();
  }, [solution]);

  let profileInnovateur = useMemo(() => {
    if (solution) {
      return solution?.user || {};
    }
  }, [solution]);

  useEffect(() => {
    const status = JSON.parse(localStorage?.getItem("STATUS_ACCOUNT"));

    const userRoles = JSON.parse(
      localStorage?.getItem("ACCESS_ACCOUNT")
    )?.roles;

    setIsAdmin(userRoles?.some((role) => role.name === "ADMIN"));

    if (status.authenticate) {
      setDomLoaded(true);

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

          setOptionsStatus(
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

      fetchThematique();
      fetchStatus();
      fetchPole();
      fetchFeedBack();
      fetchProfile();
    } else {
      navigate.push("/");
    }
  }, [id, navigate, isAdmin, thematiqueId]);

  useEffect(() => {
    if (solution) {
      localStorage.setItem("solution", JSON.stringify(solution));
    }

    if (profileInnovateur) {
      localStorage.setItem(
        "profileInnovateur",
        JSON.stringify(profileInnovateur)
      );
    }
  }, [solution, profileInnovateur]);

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

  const userConnectedEmail = useMemo(() => {
    if (profile) {
      return profile.email;
    }
  }, [profile]);


  const handleNextSolution = () => {

    const currentIndex = allCuratedSolutions.findIndex(sol => sol?.id === solution?.id);
    
    const nextIndex = (currentIndex + 1) % allCuratedSolutions.length;
    
    setSolution(allCuratedSolutions[nextIndex]);
    
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  
  const handlePreviousSolution = () => {
    
    const currentIndex = allCuratedSolutions.findIndex(sol => sol?.id === solution?.id);
    
    const previousIndex = (currentIndex - 1 + allCuratedSolutions.length) % allCuratedSolutions.length;
    
    setSolution(allCuratedSolutions[previousIndex]);
    
    window.scrollTo({ top: 0, behavior: "smooth" });

  };

  const isCurated = useMemo(() => {
    if (solution) {
      if (solution.feedbacks.length > 0) {
        return true;
      } else {
        return false;
      }
    }
  }, [solution]);






  return (
    <div>
      <Seo title={"Profile"} />

      <Title title={"DETAILS DE LA SOLUTION"} />

      <Row>
        <Col lg={12} md={12}>

          <CardInnovateur profileInnovateur={profileInnovateur} />

          <SolutionTab
            solution={solution}
            thematique={thematique}
            imageLinks={imageLinks}
            isAdmin={isAdmin}
            profileCurateur={profileCurateur}
            feedbacks={feedbacksWithUserDetails}
            optionsFeedBack={optionsFeedBack}
            userConnectedEmail={userConnectedEmail}
            solutionId={id}
            isCurated={isCurated}
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
