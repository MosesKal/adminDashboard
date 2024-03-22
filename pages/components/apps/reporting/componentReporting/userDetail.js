import React from "react";
import { Image, StyleSheet, Text, View } from "@react-pdf/renderer";

const IMAGEPATH = "/assets/img/faces/";

const UserDetail = ({ icon, text }) => {
    const styles = StyleSheet.create({
        containerTextDetailOther: {
            display: "flex", flexDirection: "row",
        }, containerIconOther: {
            marginRight: 15, marginTop: 5
        }, profDetailOther: {
            fontSize: 8,

        }, icons: {
            width: 15,
        },
    });

    return (
        <View style={styles.containerTextDetailOther}>
            <View style={styles.containerIconOther}>
                <Image src={`${IMAGEPATH}${icon}.png`} style={styles.icons} alt={"image icon"} />
            </View>
            <View style={{paddingTop:10}}>
                <Text style={styles.profDetailOther}>{text}</Text>
            </View>
        </View>
    )
}

export default UserDetail;
