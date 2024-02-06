import Head from "next/head";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import favicon from "../public/assets/img/brand/favicon.png";
import { Button, Col, Form, Row } from "react-bootstrap";
import axios from "./api/axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Seo from "@/shared/layout-components/seo/seo";

const LOGIN_URI = "/auth/login";
export default function Home() {

  useEffect(() => {
    if (document.body) {
      document
        .querySelector("body")
        .classList.add("ltr", "error-page1", "bg-primary");
    }
    if (
      localStorage.getItem("ACCESS_ACCOUNT") &&
      localStorage.getItem("STATUS_ACCOUNT")
    ) {
      localStorage.removeItem("ACCESS_ACCOUNT");
      localStorage.removeItem("STATUS_ACCOUNT");
    }
    return () => {
      document.body.classList.remove("ltr", "error-page1", "bg-primary");
    };
  }, []);

  const [err, setError] = useState("");

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const { email, password } = data;
  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setError("");
  };
  let navigate = useRouter();
  const routeChange = () => {
    let path = `/components/dashboards/dashboard`;
    navigate.push(path);
  };
  const Login = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await axios.post(LOGIN_URI, data);

      if(response?.data?.data?.roles[0]?.name === "CURATOR" || response?.data?.data?.roles[0]?.name === "ADMIN" || response?.data?.data?.roles[0]?.name === "EXPLORATOR"){
          toast.success("Connexion réussie ");

          localStorage.setItem(
              "ACCESS_ACCOUNT",
              JSON.stringify(response.data.data)
          );
          localStorage.setItem(
              "STATUS_ACCOUNT",
              JSON.stringify({ authenticate: true })
          );

          setIsLoading(false);
          setTimeout(() => {
              routeChange();
          }, 2000);
      }
      else {
        toast.error("Veuillez vérifier vos identifiants");
        setIsLoading(false);
      }
    } catch (e) {
      toast.error(e?.response?.data?.message);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
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
                            src={"./assets/img/brand/favicon.png"}
                            className="sign-favicon ht-40"
                            alt="logo"
                          />
                        </Link>
                      </div>
                      <div className="">
                        <div className="main-signup-header">
                          <h2>Se connecter</h2>
                          <h6 className="font-weight-semibold mb-4"></h6>
                          <div className="panel panel-primary">
                            <div className="tab-menu-heading mb-2 border-bottom-0">
                              <div className="tabs-menu1">
                                <Form onSubmit={Login}>
                                  <Form.Group className="form-group">
                                    <Form.Label>Adresse Mail</Form.Label>{" "}
                                    <Form.Control
                                        className="form-control"
                                        placeholder="Votre adresse email"
                                        type="email"
                                        name="email"
                                        value={email}
                                        onChange={changeHandler}
                                        required
                                    />
                                  </Form.Group>
                                  <Form.Group className="form-group">
                                    <Form.Label>Mot de passe</Form.Label>{" "}
                                    <Form.Control
                                        className="form-control"
                                        placeholder="Entrez le mot de passe"
                                        type="password"
                                        name="password"
                                        value={password}
                                        onChange={changeHandler}
                                        required
                                    />
                                  </Form.Group>
                                  <div className="btn-animation">
                                    <Button
                                        variant=""
                                        type="submit"
                                        className={isLoading ? "btn btn-primary btn-block btn-loaders" : "btn btn-primary btn-block"}
                                    >
                                      <span className="loading">{isLoading ? "Connexion en cours..." : "Se connecter"}</span>
                                    </Button>
                                  </div>
                                </Form>

                              </div>
                            </div>
                            <div className="panel-body tabs-menu-body border-0 p-3">
                              <div className="tab-content"></div>
                            </div>
                          </div>
                          <div className="main-signin-footer text-center mt-3">
                            <p>
                              <Link href="" className="mb-3">
                                Mot de passe oublié ?
                              </Link>
                            </p>
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
