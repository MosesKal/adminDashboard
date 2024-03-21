import React from "react";
import {Image, StyleSheet, Text, View} from "@react-pdf/renderer";

const IMAGEPATH = "/assets/img/faces/";

const CuratorDetail = ({solution}) => {

    const styles = StyleSheet.create({
        curatorContainer: {
            display: "flex", border: "1px dash #ccc", padding: 10, margin: 5, flexDirection: "row",
        }, curatorContainerBloc: {
            display: "flex", flexDirection: "column",
        }, curatorContainerBlocTow: {
            display: "flex", flexDirection: "column", marginLeft: 10
        }, textIconCurator: {
            display: "flex", flexDirection: "row",
        }, iconCuratorContainer: {
            marginRight: 10
        }, iconCurator: {
            width: 15
        }, text: {
            fontSize: 8,
            color: "black"
        },
    });

    return (
        <>
            {
                solution &&

                (
                    <View>
                        <View>
                            <Text
                                style={{fontSize: "8", textDecoration: "underline"}}>{"Informations du Curateur"}</Text>
                        </View>
                        <View style={styles.curatorContainer}>
                            <View style={styles.curatorContainerBloc}>
                                <View style={styles.textIconCurator}>
                                    <View style={styles.iconCuratorContainer}>
                                        <Image src={`${IMAGEPATH}person.png`} style={styles.iconCurator}
                                               alt={"person.png"}/>
                                    </View>
                                    <View>
                                        <Text style={styles.text}>{solution?.curatorInfo?.data.name}</Text>
                                    </View>
                                </View>

                                <View style={styles.textIconCurator}>
                                    <View style={styles.iconCuratorContainer}>
                                        <Image src={`${IMAGEPATH}email.png`} style={styles.iconCurator}
                                               alt={"email.png"}/>
                                    </View>
                                    <View style={styles.textContainer}>
                                        <Text style={styles.text}>{solution?.curatorInfo?.data.email}</Text>
                                    </View>
                                </View>
                                <View style={styles.textIconCurator}>
                                    <View style={styles.iconCuratorContainer}>
                                        <Image src={`${IMAGEPATH}phone.png`} style={styles.iconCurator}
                                               alt={"phone.png"}/>
                                    </View>
                                    <View style={styles.textContainer}>
                                        <Text style={styles.text}>{solution?.curatorInfo.data.phoneNumber}</Text>
                                    </View>
                                </View>
                            </View>

                            <View style={styles.curatorContainerBlocTow}>

                                <View style={styles.textIconCurator}>
                                    <View style={styles.iconCuratorContainer}>
                                        <Image src={`${IMAGEPATH}organisation.png`} style={styles.iconCurator}
                                               alt={"organisation.png"}/>
                                    </View>
                                    <View style={styles.textContainer}>
                                        <Text style={styles.text}>{solution.curatorInfo.organisation.data.name}</Text>
                                    </View>
                                </View>

                                <View style={styles.textIconCurator}>
                                    <View style={styles.iconCuratorContainer}>
                                        <Image src={`${IMAGEPATH}pole.png`} style={styles.iconCurator}
                                               alt={"pole.png"}/>
                                    </View>
                                    <View style={styles.textContainer}>
                                        <Text style={styles.text}>{solution.curatorInfo.pole.data.name}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>

                )
            }
        </>
    )
}

export default CuratorDetail;
