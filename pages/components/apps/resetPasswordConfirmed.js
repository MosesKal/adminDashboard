import Head from "next/head";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import favicon from "../../../public/assets/img/brand/favicon.png";
import { Button, Col, Form, Row } from "react-bootstrap";
import axios from "@/pages/api/axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Seo from "@/shared/layout-components/seo/seo";
import { set } from "immutable";



const LOGIN_URI = "/auth/reset-password";


export default function Home() {

  useEffect(() => {
    if (document.body) {
      document
        .querySelector("body")
        .classList.add("ltr", "error-page1", "bg-primary");
    }
    return () => {
      document.body.classList.remove("ltr", "error-page1", "bg-primary");
    };
  }, []);

  const [err, setError] = useState("");

  const [data, setData] = useState({
    token: "",
    newPassWord: "",
    newPassWordTow: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassWord, setShowNewPassWord] = useState(false);

  const { token, newPassWord, newPassWordTow } = data;

  const changeHandler = (e) => {
    setData(
      {
        ...data,
        [e.target.name]: e.target.value
      }
    );
    setError("");
  };

  let navigate = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState);
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassWord(prevState => !prevState);
  }

  const routeChange = () => {
    let path = `/`;
    navigate.push(path);
  };

  const handleSendRequest = async (e) => {
    e.preventDefault();

    if (data.newPassWord !== data.newPassWordTow) {
      toast.error("Les deux mots de passe ne correspondent pas");
    } else {
      try {
        setIsLoading(true);

        const payload = {
          token: data.token,
          password: data.newPassWord,
        };
        await axios.post(LOGIN_URI, payload);

        toast.success("Modification du mot de passe réussie");

        setIsLoading(false);

        setTimeout(() => {
          routeChange();
        }, 2000);

      } catch (error) {
        setIsLoading(false);
        toast.error("Une erreur s'est produite lors de la réinitialisation du mot de passe");
      }
    }
  };


  return (
    <>
      <Head>
        <title>Fikiri|Dashboard</title>
        <meta name="description" content="Spruha" />
        <link rel="icon" href={favicon.src} />
      </Head>

      <Seo title={"Login"} />

      <div className="square-box">
        <div></div> <div></div> <div></div> <div></div> <div></div> <div></div>
        <div></div> <div></div> <div></div> <div></div> <div></div> <div></div>
        <div></div> <div></div> <div></div>
      </div>

      <div className="page">
        <div className="page-single">
          <div className="container">
            <Row>
              <Col
                xl={5}
                lg={6}
                md={8}
                sm={8}
                xs={10}
                className="card-sigin-main mx-auto my-auto py-4 justify-content-center"
              >
                <div className="card-sigin">
                  <div className="main-card-signin d-md-flex">
                    <div className="wd-100p">
                      <div className="d-flex mb-4">
                        <Link href={`/components/dashboards/dashboard/`}>
                          <img
                            src={"../../../assets/img/brand/favicon.png"}
                            className="sign-favicon ht-40"
                            alt="logo"
                          />
                        </Link>
                      </div>
                      <div className="">
                        <div className="main-signup-header">
                          <h2>Réinitialiser le mot de passe</h2>
                          <h6 className="font-weight-semibold mb-4"></h6>
                          <div className="panel panel-primary">
                            <div className="tab-menu-heading mb-2 border-bottom-0">
                              <div className="tabs-menu1">
                                <Form onSubmit={handleSendRequest}>
                                  <Form.Group className="form-group">
                                    <Form.Label className="mb-2">Entrez le mot de passe à 6 chiffres</Form.Label>
                                    <Form.Control
                                      className="form-control"
                                      placeholder="Entrez le mot de passe à 6 chiffres"
                                      type="text"
                                      name="token"
                                      value={token}
                                      onChange={changeHandler}
                                      required
                                    />
                                  </Form.Group>

                                  <Form.Group className="form-group">
                                    <Form.Label className="mb-2">Entrez le nouveau mot de passe</Form.Label>
                                    <div className="input-group">
                                      <Form.Control
                                        className="form-control"
                                        placeholder="Entrez le mot de passe"
                                        type={showPassword ? "text" : "password"}
                                        name="newPassWord"
                                        value={newPassWord}
                                        onChange={changeHandler}
                                        required
                                      />
                                      <button
                                        className="btn btn-outline-primary"
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                      >
                                        <i className={`bi bi-eye${showPassword ? "-slash" : ""}`}></i>
                                      </button>
                                    </div>
                                  </Form.Group>

                                  <Form.Group className="form-group">
                                    <Form.Label className="mb-2">Entrez à nouveau le mot de passe</Form.Label>
                                    <div className="input-group">
                                      <Form.Control
                                        className="form-control"
                                        placeholder="Entrez le mot de passe"
                                        type={showNewPassWord ? "text" : "password"}
                                        name="newPassWordTow"
                                        value={newPassWordTow}
                                        onChange={changeHandler}
                                        required
                                      />
                                      <button
                                        className="btn btn-outline-primary"
                                        type="button"
                                        onClick={toggleNewPasswordVisibility}
                                      >
                                        <i className={`bi bi-eye${showNewPassWord ? "-slash" : ""}`}></i>
                                      </button>
                                    </div>
                                  </Form.Group>

                                  <div className="btn-animation mt-4">
                                    <Button
                                      variant=""
                                      type="submit"
                                      className={isLoading ? "btn btn-primary btn-block btn-loaders" : "btn btn-primary btn-block"}
                                    >
                                      <span className="loading">{isLoading ? "Enregistrer le nouveau mot de passe..." : "Enregistrer le nouveau mot de passe"}</span>
                                    </Button>
                                  </div>
                                </Form>
                              </div>
                            </div>
                          </div>
                          <div className=" text-left text-decoration-underline text-primary">
                            <Link href={`/`} className="mb-3 text-primary">
                              Se connecter
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
