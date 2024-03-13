import React from "react";
import moment from "moment";
import styles from "./customCardInnovation.module.css";

const CustomCardInnovateur = ({profileInnovateur}) => {
    return (
        <div className={styles.customCard}>
            <div className={styles.profileImage}>
                <img
                    className={styles.profileImg}
                    alt=""
                    src={profileInnovateur?.profile ? profileInnovateur.profile : "../../../assets/img/faces/profile.jpg"}
                />
            </div>
            <div className={styles.profDetails}>
                <h4 className={styles.fontWeightSemibold}>{profileInnovateur ? profileInnovateur.name : ""}</h4>
                <p className={styles.textMuted}>
                    <i className="far fa-address-card"></i> Innovateur
                </p>
                <p className={styles.textMuted}>
                    <i className="bi bi-geo-alt-fill"></i>
                    {profileInnovateur ? profileInnovateur.address : ""}
                </p>
                <p className={styles.textMuted}>
                    <i className="far fa-flag"></i> RDC
                </p>
                <p className={styles.textMuted}>
                    <i className="fa fa-phone"></i> Phone: {profileInnovateur ? profileInnovateur.phoneNumber : ""}
                </p>
                <p className={styles.textMuted}>
                    <i className="fa fa-envelope"></i> Email: {profileInnovateur ? profileInnovateur.email : ""}
                </p>
                <p className={styles.textMuted}>
                    <i className="bi bi-calendar-check"></i> {"Date d'inscription sur la plateforme"}:{" "}
                    {profileInnovateur ? moment(profileInnovateur.createdAt).format("DD MMMM YYYY [à] HH:mm") : ""}
                </p>
            </div>
        </div>
    );
};
export default CustomCardInnovateur;