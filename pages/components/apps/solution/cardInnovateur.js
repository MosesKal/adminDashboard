import React from "react";
import { imageBaseUrl } from "@/pages/api/axios";
import { Card } from "react-bootstrap";
import moment from "moment";


const CardInnovateur = ({ profileInnovateur }) => {
  return (
    <Card className="custom-card customs-cards">
      <Card.Body className=" d-md-flex bg-white">
        <div className="">
          <span className="profile-image pos-relative">
            <img
              className="br-5"
              alt=""
              src={
                profileInnovateur?.profile
                  ? `${imageBaseUrl}/${profileInnovateur.profile}`
                  : "../../../assets/img/faces/profile.jpg"
              }
            />
          </span>
        </div>
        <div className="my-md-auto mt-4 prof-details">
          <h4 className="font-weight-semibold ms-md-4 ms-0 mb-1 pb-0">
            {profileInnovateur ? profileInnovateur.name : ""}
          </h4>
          <p className="tx-13 text-muted ms-md-4 ms-0 mb-2 pb-2 ">
            <span className="me-3">
              <i className="far fa-address-card me-2"></i>Innovateur
            </span>
            <span className="me-3">
              <i class="bi bi-geo-alt-fill me-2"></i>
              {profileInnovateur ? profileInnovateur.address : ""}
            </span>
            <span>
              <i className="far fa-flag me-2"></i>RDC
            </span>
          </p>
          <p className="text-muted ms-md-4 ms-0 mb-2">
            <span>
              <i className="fa fa-phone me-2"></i>
            </span>
            <span className="font-weight-semibold me-2">Phone:</span>
            <span>
              {profileInnovateur ? profileInnovateur.phoneNumber : ""}
            </span>
          </p>
          <p className="text-muted ms-md-4 ms-0 mb-2">
            <span>
              <i className="fa fa-envelope me-2"></i>
            </span>
            <span className="font-weight-semibold me-2">Email:</span>
            <span>{profileInnovateur ? profileInnovateur.email : ""}</span>
          </p>
          <p className="text-muted ms-md-4 ms-0 mb-2">
            <span>
              <i class="bi bi-calendar-check me-2"></i>
            </span>
            <span className="font-weight-semibold me-2">
              {"Date d'inscription sur la plateforme:"}
            </span>
            <span>
              {profileInnovateur
                ? moment(profileInnovateur.createdAt).format(
                    "DD MMMM YYYY [à] HH:mm"
                  )
                : ""}
            </span>
          </p>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CardInnovateur;
