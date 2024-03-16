import React from 'react';
import UserDetail from "@/pages/components/apps/reporting/componentReporting/userDetail";
import {styles} from "@/pages/services/services.reporting";
import {Image, Text, View} from "@react-pdf/renderer";
import moment from "moment/moment";
import {imageBaseUrl} from "@/pages/api/axios";

 const InnovateurDetail = ({solution}) => {
    return (
        <>
            <View>
                <Text style={{marginBottom: "5", fontSize: "8", textDecoration: "underline"}}>{"Informations de l'innovateur"}</Text>
            </View>
            <View style={styles.profileImage}>
                <Image style={styles.profileImg} src={
                    solution?.user?.profile
                        ? `${imageBaseUrl}/${solution?.user?.profile}`
                        : "../../../assets/img/faces/profile.jpg"
                }
                />
                <View style={styles.profDetails}>
                    <UserDetail icon="person" text={solution?.user?.name}/>
                    <UserDetail icon="address" text={solution?.user?.address}/>
                    <UserDetail icon="phone" text={solution?.user?.phoneNumber}/>
                    <UserDetail icon="email" text={solution?.user?.email}/>
                    <UserDetail icon="calendar" text={`${moment(solution?.user?.createdAt).format("DD MMMM YYYY [à] HH:mm")} (Date d'inscription)`}/>
                </View>
            </View>
        </>
    )
}

export default  InnovateurDetail;
