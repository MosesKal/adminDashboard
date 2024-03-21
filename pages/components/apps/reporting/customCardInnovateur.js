import React from "react";
import {Text, View, StyleSheet, Image} from "@react-pdf/renderer";
import moment from "moment";

const CustomCardInnovateur = ({profileInnovateur}) => {

    const styles = StyleSheet.create({
        profileImage: {
            marginBottom: 10,
            flexDirection: "row",
            alignItems: "center",
        },
        profileImg: {
            borderRadius: 5,
            width: 100,
            height: 100,
            objectFit: "cover",
            marginRight: 10,
        },
        profDetails: {
            flexDirection: "column",
        },
        fontWeightSemibold: {
            fontWeight: "bold",
        },
        textMuted: {
            color: "#666",
        },
    });

    return (
        <View style={styles.profileImage}>
            <Image
                style={styles.profileImg}
                src={profileInnovateur?.profile ? profileInnovateur.profile : ""}
                alt={"profile image"}
            />
            <View style={styles.profDetails}>
                <Text style={styles.fontWeightSemibold}>
                    {profileInnovateur ? profileInnovateur.name : ""}
                </Text>
                <Text style={styles.textMuted}>
                    <Text>
                        {" "}
                        <i className="far fa-address-card"></i>{" "}
                    </Text>
                    <Text>Innovateur</Text>
                </Text>
                <Text style={styles.textMuted}>
                    {" "}
                    <i className="bi bi-geo-alt-fill"></i>
                    {profileInnovateur ? profileInnovateur.address : ""}
                </Text>
                <Text style={styles.textMuted}>
                    {" "}
                    <i className="far fa-flag"></i> RDC
                </Text>
                <Text style={styles.textMuted}>
                    {" "}
                    <i className="fa fa-phone"></i> Phone:{" "}
                    {profileInnovateur ? profileInnovateur.phoneNumber : ""}
                </Text>
                <Text style={styles.textMuted}>
                    {" "}
                    <i className="fa fa-envelope"></i> Email:{" "}
                    {profileInnovateur ? profileInnovateur.email : ""}
                </Text>
                <Text style={styles.textMuted}>
                    {" "}
                    <i className="bi bi-calendar-check"></i> {"Date d'inscription sur la plateforme: "}
                    {profileInnovateur
                        ? moment(profileInnovateur.createdAt).format("DD MMMM YYYY [à] HH:mm")
                        : ""}
                </Text>
            </View>
        </View>
    );
};
export default CustomCardInnovateur;
