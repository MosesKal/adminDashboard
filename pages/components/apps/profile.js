import React, { useCallback, useEffect, useState } from "react";
import { FilePond } from "react-filepond";
import { toast, ToastContainer } from "react-toastify";
import "filepond/dist/filepond.min.css";
import {
  Card,
  Col,
  Breadcrumb,
  Nav,
  Row,
  Tab,
  FormGroup,
  Form,
  Button,
} from "react-bootstrap";

import Seo from "@/shared/layout-components/seo/seo";
import axios from "@/pages/api/axios";
import {apiBaseUrl} from "@/pages/api/axios";

import { useRouter } from "next/router";

const Profile = () => {

  const [profile, setProfile] = useState();
  const [newName, setNewName] = useState(profile ? profile.name : "");
  const [newAddress, setNewAddress] = useState(profile ? profile.address : "");
  const [newNumTel, setNewNumTel] = useState(profile ? profile.phoneNumber : "");
  const [newImage, setNewImage] = useState(null);
  const [isLoading , setIsLoading] = useState(false);
  const [oldPassword, setOldPassword] = useState();
  const [newPassword, setNewPassword] = useState();


  let navigate = useRouter();
  const router = useRouter();
  const parametreEmail = navigate.query.email;

  const [domLoaded, setDomLoaded] = useState(false);

  const [filesimade, setFilesimage] = useState([]);


  useEffect(() => {
    const status = JSON.parse(localStorage.getItem("STATUS_ACCOUNT"));

    if (status.authenticate) {
      setDomLoaded(true);
      const fecthProfile = async () => {
        try {
          const profileResponse = await axios.get(
            `/auth/profile/`
          );
          setProfile(profileResponse.data.data);
        } catch (error) {
          console.log(error);
        }
      };
      fecthProfile();
    } else {
      navigate.push("/");
    }
  }, [navigate, parametreEmail]);

  useEffect(() => {
    if (profile) {
      setNewName(profile.name);
      setNewAddress(profile.address);
      setNewNumTel(profile.phoneNumber);
    }
  }, [profile]);

  const handleProfileUpdate = async () => {
    try {

      setIsLoading(true);

      const identityFormData = new FormData();
      identityFormData.append("name", newName);
      identityFormData.append("address", newAddress);
      identityFormData.append("phoneNumber", newNumTel);
      identityFormData.append("oldPassword", oldPassword);
      identityFormData.append("password", newPassword);

      const imageFormData = new FormData();

      if (filesimade.length > 0) {
        imageFormData.append(`thumb`, filesimade[0].file);
      }

      await Promise.all([
        axios.patch(`/auth/profile/${profile.id}`, identityFormData)
      ]);

      setProfile({
        ...profile,
        name: newName,
        address: newAddress,
        phoneNumber: newNumTel,
      });

      toast.success("Profile mis à jour avec succès!");
    } catch (error) {
      toast.error("Erreur lors de la mise à jour du profile");
    } finally {
      setIsLoading(false);
    }
  };

  return (
      <>
        <div>
          <Seo title={"Profile"}/>
          <div className="breadcrumb-header justify-content-between">
            <div className="left-content">
            <span className="main-content-title mg-b-0 mg-b-lg-1">
              PROFILE
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
          {/* <!-- breadcrumb --> */}
          <Row>
            <Col lg={12} md={12}>
              <Card className="custom-card customs-cards">
                <Card.Body className=" d-md-flex bg-white">
                  <div className="">
                <span className="profile-image pos-relative">
                  {profile && profile?.profile ? (
                      <img
                          className={"br-5"}
                          alt=""
                          src={`${apiBaseUrl}/uploads/${profile.profile}`}
                      />
                  ) : (
                      <img
                          className="br-5"
                          alt=""
                          src={"../../../assets/img/faces/profile.jpg"}
                      />
                  )}

                </span>
                  </div>
                  <div className="my-md-auto mt-4 prof-details">
                    <h4 className="font-weight-semibold ms-md-4 ms-0 mb-1 pb-0">
                      {profile ? profile.name : ""}
                    </h4>
                    <p className="tx-13 text-muted ms-md-4 ms-0 mb-2 pb-2 "></p>
                    <p className="text-muted ms-md-4 ms-0 mb-2">
                  <span>
                    <i className="fa fa-phone me-2"></i>
                  </span>
                      <span className="font-weight-semibold me-2">Phone:</span>
                      <span>{profile ? profile.phoneNumber : ""}</span>
                    </p>
                    <p className="text-muted ms-md-4 ms-0 mb-2">
                  <span>
                    <i className="fa fa-envelope me-2"></i>
                  </span>
                      <span className="font-weight-semibold me-2">Email:</span>
                      <span>{profile ? profile.email : ""}</span>
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
                      Mes informations
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item className="me-1">
                    <Nav.Link className="mb-2 mt-2" eventKey="EditProfile">
                      Editer Mon profile
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
                <Row className=" row-sm ">
                  <Col lg={12} md={12}>
                    <div className="custom-card main-content-body-profile">
                      <Tab.Content>
                        <Tab.Pane eventKey="About">
                          <div
                              className="main-content-body tab-pane  active"
                              id="about"
                          >
                            <Card>
                              <Card.Body className="border-0 p-0 rounded-10">
                                <div className="p-4">
                                  <h4 className="tx-14 text-uppercase mb-3">
                                    Nom
                                  </h4>
                                  <p className="m-b-5 tx-15">
                                    {profile ? profile.name : ""}
                                  </p>
                                  <div className="m-t-30">
                                    <div className=" p-t-10">
                                      <h5 className="text-primary m-b-5 tx-14">
                                        Adresse e-mail
                                      </h5>
                                      <p className="">
                                        {profile ? profile.email : ""}
                                      </p>
                                    </div>
                                    <div className="">
                                      <h5 className="text-primary m-b-5 tx-14">
                                        Numéro téléphone
                                      </h5>
                                      <p className="">
                                        {profile ? profile.phoneNumber : ""}
                                      </p>
                                    </div>
                                    <div className="">
                                      <h5 className="text-primary m-b-5 tx-14">
                                        Adresse physique
                                      </h5>
                                      <p className="">
                                        {profile ? profile.address : ""}
                                      </p>
                                    </div>

                                    <div className="">
                                      <h5 className="text-primary m-b-5 tx-14">
                                        Role
                                      </h5>
                                      <p className="">
                                        {profile ? profile.roles[0].name : ""}
                                      </p>
                                    </div>
                                  </div>
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
                            <Card>
                              <Card.Body className=" border-0">
                                <div className="mb-4 main-content-label">
                                  Informations personnelles
                                </div>
                                <Form className="form-horizontal" onSubmit={(e) => e.preventDefault()}>
                                  <FormGroup className="form-group ">
                                    <Row className=" row-sm">
                                      <Col md={3}>
                                        <Form.Label className="form-label">
                                          Nom
                                        </Form.Label>
                                      </Col>
                                      <Col md={9}>
                                        <Form.Control
                                            type="text"
                                            className="form-control"
                                            placeholder="Nouveau nom"
                                            defaultValue={
                                              profile ? profile.name : ""
                                            }
                                            value={newName}
                                            onChange={(e) => setNewName(e.target.value)}
                                        />
                                      </Col>
                                    </Row>
                                  </FormGroup>
                                  <FormGroup className="form-group ">
                                    <Row className=" row-sm">
                                      <Col md={3}>
                                        <Form.Label className="form-label">
                                          Adresse physique
                                        </Form.Label>
                                      </Col>
                                      <Col md={9}>
                                        <Form.Control
                                            type="text"
                                            className="form-control"
                                            placeholder="Adresse physique"
                                            defaultValue={
                                              profile ? profile.address : ""
                                            }
                                            value={newAddress}
                                            onChange={(e) => setNewAddress(e.target.value)}
                                        />
                                      </Col>
                                    </Row>
                                  </FormGroup>
                                  <FormGroup className="form-group ">
                                    <Row className=" row-sm">
                                      <Col md={3}>
                                        <Form.Label className="form-label">
                                          Numéro Telephone
                                        </Form.Label>
                                      </Col>
                                      <Col md={9}>
                                        <Form.Control
                                            type="text"
                                            className="form-control"
                                            placeholder="Numéro Telephone"
                                            defaultValue={
                                              profile ? profile.phoneNumber : ""
                                            }
                                            value={newNumTel}
                                            onChange={(e) => setNewNumTel(e.target.value)}
                                        />
                                      </Col>
                                    </Row>
                                  </FormGroup>

                                  <FormGroup className="form-group ">
                                    <Row className=" row-sm">
                                      <Col md={3}>
                                        <Form.Label className="form-label">
                                            Ancien mot de passe
                                        </Form.Label>
                                      </Col>
                                      <Col md={9}>
                                        <Form.Control
                                            type="text"
                                            className="form-control"
                                            placeholder="Ancien mot de passe"
                                            onChange={(e) => setOldPassword(e.target.value)}
                                        />
                                      </Col>
                                    </Row>
                                  </FormGroup>

                                  <FormGroup className="form-group ">
                                    <Row className=" row-sm">
                                      <Col md={3}>
                                        <Form.Label className="form-label">
                                            Nouveau mot de passe
                                        </Form.Label>
                                      </Col>
                                      <Col md={9}>
                                        <Form.Control
                                            type="text"
                                            className="form-control"
                                            placeholder="Nouveau mot de passe"
                                            onChange={(e) => setNewPassword(e.target.value)}
                                        />
                                      </Col>
                                    </Row>
                                  </FormGroup>

                                  <FormGroup className="form-group ">
                                    <Row className=" row-sm">
                                      <Col md={3}>
                                        <Form.Label className="form-label">
                                          Image
                                        </Form.Label>
                                      </Col>
                                      <Col md={9}>
                                        <FilePond
                                            className="mt-3 mb-5 mt-lg-0"
                                            files={filesimade}
                                            allowReorder={true}
                                            allowMultiple={false}
                                            onupdatefiles={setFilesimage}
                                            labelIdle='Glissez-déposez ou  <span class="filepond--label-action">charger le fichier image</span>'
                                            server={{
                                              process: {
                                                url: `${apiBaseUrl}/users/${profile?.id}/image`,
                                                withCredentials: true,
                                              }
                                            }}
                                            name={"thumb"}
                                        />
                                      </Col>
                                    </Row>
                                  </FormGroup>

                                  <Row className="row-sm">
                                    <Col md={3}></Col>
                                    <Col md={9}>
                                      <div className="btn-animation">
                                        <Button
                                            onClick={handleProfileUpdate}
                                            variant=""
                                            type="button"
                                            className={isLoading ? "btn btn-primary btn-block btn-loaders" : "btn btn-primary btn-block"}
                                            disabled={isLoading}
                                        >
                                          <span
                                              className="loading">{isLoading ? "Modification en cours..." : "Modifier le profil"}</span>
                                        </Button>

                                      </div>
                                    </Col>
                                  </Row>
                                </Form>
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
              {/* </SSRProvider> */}
            </Col>
          </Row>
          {/* <!-- Row --> */}
          <Row className=" row-sm">
            <Col lg={12} md={12}>
              <div className="tab-content"></div>
            </Col>
          </Row>
        </div>
        <ToastContainer />
      </>

  );
};

Profile.propTypes = {};

Profile.defaultProps = {};

Profile.layout = "Contentlayout";

export default Profile;
