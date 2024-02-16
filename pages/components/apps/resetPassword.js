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

const LOGIN_URI = "/auth/reset-password-request";
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
    email: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { email} = data;

  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setError("");
  };

  let navigate = useRouter();

  const routeChange = () => {
    let path = `/components/apps/resetPasswordConfirmed`;
    navigate.push(path);
  };


  const Login = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      
      await axios.post(LOGIN_URI, data);

      toast.success("Mail de réinitialisation envoyé");
    
      setTimeout(() => {
        routeChange();
      }, 2000);

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

                                <Form onSubmit={Login}>
                                  <Form.Group className="form-group mb-5">
                                    <Form.Label className="mb-2">Votre adresse Mail</Form.Label>{" "}
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

                                  <div className="btn-animation">
                                    <Button
                                      variant=""
                                      type="submit"
                                      className={isLoading ? "btn btn-primary btn-block btn-loaders" : "btn btn-primary btn-block"}
                                    >
                                      <span className="loading">{isLoading ? "Envoi en cours..." : "Envoyer le mail de réinitialisation"}</span>
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
