import React from "react";
import { apiBaseUrl, imageBaseUrl } from "@/pages/api/axios";
import { Image, Card, Col, Button, Breadcrumb, Nav, Row, Tab, Carousel, Badge } from "react-bootstrap";


const isImageValid = (url) => {
    const validExtensions = ['.jpeg', '.jpg', '.png', '.gif'];
    if (url) {
        const lowercasedUrl = url.toLowerCase();
        return validExtensions.some((extension) => lowercasedUrl.endsWith(extension));
    } else {
        return false;
    }
};

const Carousels = ({ imageLinks }) => {
    let isValidImageFound = false;

    return (
        <div>
            <div>
                <Row className="row-sm">
                    <Col>
                        <Card className="custom-card">
                            <Card.Body className="ht-100p">
                                <div>
                                    <h6 className="card-title mb-1">Image(s) appuis de la solution</h6>
                                    <p className="text-muted card-sub-title">
                                        {"Les images ci-dessous attestent de l'existence de la solution"}
                                    </p>
                                </div>
                                <div className="Withcontrols">
                                    {imageLinks?.length > 0 && imageLinks[0].link !== null ? (
                                        (isValidImageFound = imageLinks.some((imageLink) => isImageValid(imageLink.link)))
                                    ) : (
                                        (isValidImageFound = false)
                                    )}

                                    {isValidImageFound ? (
                                        <Carousel>
                                            {imageLinks
                                                .filter((imageLink) => imageLink && imageLink.link && isImageValid(imageLink.link))
                                                .map((imageLink, index) => (
                                                    <Carousel.Item className="" key={index}>
                                                        <img
                                                            alt="img"
                                                            className="d-block w-100"
                                                            src={`${imageBaseUrl}/${imageLink.link}`}
                                                            style={{ height: "500px" }}
                                                        />
                                                    </Carousel.Item>
                                                ))}
                                        </Carousel>

                                    ) : (
                                        <Carousel>
                                            <Carousel.Item className="">
                                                <img
                                                    alt="img"
                                                    className="d-block w-100"
                                                    src={"../../../assets/img/photos/18.jpg"}
                                                />
                                            </Carousel.Item>
                                            <Carousel.Item className="">
                                                <img
                                                    alt="img"
                                                    className="d-block w-100"
                                                    src={"../../../assets/img/photos/12.jpg"}
                                                />
                                            </Carousel.Item>
                                            <Carousel.Item className="">
                                                <img
                                                    alt="img"
                                                    className="d-block w-100"
                                                    src={"../../../assets/img/photos/13.jpg"}
                                                />
                                            </Carousel.Item>
                                        </Carousel>
                                    )}
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default Carousels;