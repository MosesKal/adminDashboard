import React from "react";
import {Image, Text, View} from "@react-pdf/renderer";
import {styles} from "@/pages/services/services.reporting";
import {IMAGEPATH} from "@/pages/services/services.reporting";

const UserDetail = ({icon, text}) => (
    <View style={styles.containerTextDetailOther}>
        <View style={styles.containerIconOther}>
            <Image src={`${IMAGEPATH}${icon}.png`} style={styles.icons}/>
        </View>
        <View style={styles.containerTextOther}>
            <Text style={styles.profDetailOther}>{text}</Text>
        </View>
    </View>
);

export default UserDetail;
