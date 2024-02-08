import React from "react";
import Carousels from "./carroussel";
import { Image, Card, Col, Button, Nav, Row, Tab, Badge } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Select from "react-select";
import moment from "moment";
import { apiBaseUrl } from "@/pages/api/axios";
import Link from "next/link";

const SolutionTab = (
    {
        solution,
        thematique,
        imageLinks,
        isLoadingupdatePole,
        handleChangePole,
        optionsPole,
        handleSelectChangePole,
        handleSendFeedBack,
        isExistCommentaire,
        handleChangeCommentUser,
        commentaires,
        handleSelectChangeFeedBack,
        handleSelectChange,
        handleChangeStatus,
        isLoadingUpdateStatut,
        optionsFeedBack,
        isAdmin,
        options,
        profileCurateur,
        showYoutubeThumbnail

    }) => {
    return (
        <>
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
                                                                    solution
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
                                                                                    
                                                                                </>
                                                                            ) : (
                                                                                "pas de lien youtube"
                                                                            )}
                                                                        </p>

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
                                                                {
                                                                    isAdmin ? (
                                                                        <>
                                                                            <Row className="row mt-5">
                                                                                <Col md={6}>{"Envoyer un commentaire à l'innovateur"}</Col>
                                                                                <Col md={6}>

                                                                                    <textarea
                                                                                        className="form-control"
                                                                                        placeholder="Votre Commentaire à l'innovateur"
                                                                                    >
                                                                                    </textarea>

                                                                                </Col>
                                                                                <Col md={4}></Col>
                                                                            </Row>

                                                                            <Row className="row mt-5">
                                                                                <Col md={6}></Col>
                                                                                <Col md={6}>
                                                                                    <Button
                                                                                        variant=""
                                                                                        className="btn btn-primary"
                                                                                        type="button"
                                                                                    // onClick={handleSendFeedBack}
                                                                                    // disabled
                                                                                    >
                                                                                        {"Envoyer le commentaire"}
                                                                                    </Button>

                                                                                </Col>
                                                                            </Row>
                                                                        </>
                                                                    ) : (
                                                                        <>
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
                                                                                            onChange={handleChangeCommentUser}
                                                                                            disabled={true}
                                                                                            value={commentaires && commentaires}
                                                                                        >
                                                                                        </textarea>
                                                                                    ) : (
                                                                                        <textarea
                                                                                            className="form-control"
                                                                                            placeholder="Votre Commentaire"
                                                                                            onChange={handleChangeCommentUser}
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
                                                                        </>
                                                                    )
                                                                }
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
                </div >
            </span >
        </>
    );
}

export default SolutionTab;