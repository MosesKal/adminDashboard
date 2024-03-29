import React, {useMemo} from "react";
import {Button, Card, Col, ProgressBar, Row} from "react-bootstrap";
import moment from "moment";
import Select from "react-select";
import {imageBaseUrl} from "@/pages/api/axios";


const ProgressIndicator = ({currentCote, maxCote}) => {
    const progress = (currentCote / maxCote) * 100;

    let variant;

    if (progress >= 75) {
        variant = "success";
    } else if (progress >= 50) {
        variant = "warning";
    } else {
        variant = "danger";
    }

    return (
        <ProgressBar
            now={progress}
            variant={variant}
            label={`${progress}%`}
            className="mt-5"
        />
    );
};


const Cotations = ({feedbacks, optionsFeedBack}) => {

    return (
        <>

            <div
                className="main-content-body tab-pane border-top-0 h-500"
                style={{height: "2000px", maxHeight: "2000px"}}

                id="edit"
            >

                <Card style={{height: "100%", maxHeight: "100%"}} className="">
                    <Card.Body
                        className=" "
                        style={{height: "100%", maxHeight: "100%"}}
                    >


                        {
                            feedbacks?.length > 0 && feedbacks.map((feedback) => (

                                <div key={feedback.id} className={"my-5"}
                                     style={{border: '1px solid #ccc', padding: '10px'}}>
                                    <RenderSelect userDetails={feedback.userDetails} optionsFeedBack={optionsFeedBack} feedback={feedback}/>
                                </div>
                            ))
                        }

                        <div className={"my-5"} style={{border: '1px solid #ccc', padding: '10px'}}>
                            <h4>Currer à Nouveau</h4>
                            <Row>
                                <Col xl={3}></Col>
                                <Col xl={6}>
                                    <div className="mt-3">
                                        <Row className={"my-3"}>
                                            <Col>{"Pertinence par rapport aux ODD/thématique : "}</Col>
                                            <Col> <Select options={optionsFeedBack}/> </Col>
                                        </Row>
                                        <Row className={"my-3"}>
                                            <Col>{"Impact local"}</Col>
                                            <Col> <Select options={optionsFeedBack}/> </Col>
                                        </Row>
                                        <Row className={"my-3"}>
                                            <Col>{"Innovation"}</Col>
                                            <Col> <Select options={optionsFeedBack}/> </Col>
                                        </Row>
                                        <Row className={"my-3"}>
                                            <Col>{"Échelle de mise en œuvre"}</Col>
                                            <Col> <Select options={optionsFeedBack}/> </Col>
                                        </Row>

                                        <ProgressIndicator currentCote={0} maxCote={40}/>

                                        <div className={"mt-5"}>
                                            <Button
                                                variant=""
                                                className="btn btn-primary"
                                                type="button"
                                                disabled={false}
                                            >
                                                {"Envoyer la notation"}
                                            </Button>
                                        </div>
                                    </div>
                                </Col>
                                <Col xl={3}></Col>
                            </Row>
                        </div>

                    </Card.Body>
                </Card>

            </div>
        </>
    );
};

const CuratorInfo = ({userDetails}) => {
    return (
        <>

            {userDetails &&
                <div className="d-sm-flex p-3 sub-review-section border subsection-color br-tl-0 br-tr-0">
                    <div className="d-flex me-3">
                        {userDetails?.profile ? (
                            <img
                                className="media-object brround avatar-md"
                                alt="64x64"
                                src={`${imageBaseUrl}/${userDetails.profile}`}
                            />) : (<img
                            className="media-object brround avatar-md"
                            alt="64x64"
                            src={"../../../assets/img/faces/profile.jpg"}
                        />)}
                    </div>

                    <div className="media-body">
                        <h5 className="mt-0 mb-1 font-weight-semibold">
                            {
                                <>
                                    <div
                                        className="mb-1">
                                        Curé
                                        par :{" "}
                                        {userDetails?.name}
                                    </div>
                                    <span className="h6">
                                    Date de curation : Le{" "}
                                        {moment(userDetails?.createdAt).format("DD/MM/YYYY [à] HH:mm")}{" "}
                                </span>
                                </>
                            }
                        </h5>
                        <blockquote
                            className="blockquote mt-4">
                            <p className="h6">

                            </p>
                        </blockquote>
                    </div>
                </div>
            }
        </>
    );
};

const RenderSelect = ({userDetails, optionsFeedBack, feedback}) => {

    const quotation = useMemo(() => {
        if(feedback) {
            return feedback.quotations
        }
    }, feedback);

    console.log(quotation)

    return (
        <>
            <Row>
                <Col xl={3}>
                    <CuratorInfo userDetails={userDetails}/>
                </Col>
                <Col xl={9}></Col>
            </Row>
            <Row>
                <Col xl={3}></Col>
                <Col xl={6}>
                    <div className="mt-3">
                        <Row className={"my-3"}>
                            <Col>{"Pertinence par rapport aux ODD/thématique : "}</Col>
                            <Col> <Select options={optionsFeedBack} isDisabled={true}/>
                            </Col>
                        </Row>
                        <Row className={"my-3"}>
                            <Col>{"Impact local"}</Col>
                            <Col> <Select options={optionsFeedBack} isDisabled={true}/>
                            </Col>
                        </Row>
                        <Row className={"my-3"}>
                            <Col>{"Innovation"}</Col>
                            <Col> <Select options={optionsFeedBack} isDisabled={true}/>
                            </Col>
                        </Row>
                        <Row className={"my-3"}>
                            <Col>{"Échelle de mise en œuvre"}</Col>
                            <Col> <Select options={optionsFeedBack} isDisabled={true}/>
                            </Col>
                        </Row>

                        <ProgressIndicator currentCote={20} maxCote={40}/>

                        <div className={"mt-5"}>
                            <Button
                                variant=""
                                className="btn btn-primary"
                                type="button"
                                disabled={true}
                            >
                                {"Envoyer la notation"}
                            </Button>
                        </div>
                    </div>
                </Col>
                <Col xl={3}></Col>
            </Row>
        </>
    )
}

export default Cotations;

