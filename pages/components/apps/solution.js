import React, { useEffect, useMemo, useState } from "react";
import { Breadcrumb, Button, Card, Col, Row } from "react-bootstrap";
import SolutionTab from "./solution/solutionTab";
import CardInnovateur from "./solution/cardInnovateur";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Seo from "@/shared/layout-components/seo/seo";
import { useRouter } from "next/router";
import axios from "@/pages/api/axios";

const Solution = () => {
  const router = useRouter();
  const navigate = useRouter();

  const [allCuratedSolutions, setAllCuratedSolutions] = useState([]);
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
      solution = JSON.parse(storedSolution);
    }

    if (storedProfileInnovateur) {
      profileInnovateur = JSON.parse(storedProfileInnovateur);
    }

    const fetchAllCuratedSolutions = async () => {
      try {
        const solutionResponse = await axios.get("/solutions/curated/all");
        setAllCuratedSolutions(solutionResponse?.data?.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllCuratedSolutions();
    
  }, []);

  let solution = useMemo(() => {
    if (allCuratedSolutions.length > 0) {
      return allCuratedSolutions.find((sol) => sol.id == id);
    }
  }, [allCuratedSolutions, id]);

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
      if (solution) {
        const feedbacksWithUserDetails = await Promise.all(
          solution.feedbacks.map(async (feedback) => {
            const userDetails = await fetchUserDetails(feedback.userId);
            return { ...feedback, userDetails };
          })
        );
        setFeedbacksWithUserDetails(feedbacksWithUserDetails);
      }
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



  return (
    <div>
      <Seo title={"Profile"} />
      <div className="breadcrumb-header justify-content-between">
        <div className="left-content">
          <span className="main-content-title mg-b-0 mg-b-lg-1">
            DETAILS DE LA SOLUTION
          </span>
        </div>
        <div className="justify-content-center mt-2">
          <Breadcrumb className="breadcrumb">
            <Button
              variant=""
              type="button"
              className="btn button-icon btn-sm btn-outline-secondary me-1"
              onClick={() => router.back()}
            >
              <i class="bi bi-arrow-left"></i>
              <span className="ms-1">{"Retour"}</span>
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
            isAdmin={isAdmin}
            profileCurateur={profileCurateur}
            feedbacks={feedbacksWithUserDetails}
            optionsFeedBack={optionsFeedBack}
            userConnectedEmail={userConnectedEmail}
            solutionId={id}
          />

          <Col lg={12} md={12} xl={12}>
            <Card>
              <Card.Body>
                <div className="text-wrap">
                  <div className="example">
                    <Row className="row-sm align-item-center"></Row>
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
