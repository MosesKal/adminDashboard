import React from "react";
import {Image, Text, View} from "@react-pdf/renderer";
import {styles} from "@/pages/services/services.reporting";
import {IMAGEPATH} from "@/pages/services/services.reporting";

const curatorDetail = ({solution}) => (
    <>
        <View>
            <View>
                <Text style={{fontSize: "8", textDecoration: "underline"}}>Informations du Curateur</Text>
            </View>
            <View style={styles.curatorContainer}>
                <View style={styles.curatorContainerBloc}>
                    <View style={styles.textIconCurator}>
                        <View style={styles.iconCuratorContainer}>
                            <Image src={`${IMAGEPATH}person.png`}
                                   style={styles.iconCurator}/>
                        </View>
                        <View>
                            <Text
                                style={styles.text}>{solution?.curatorInfo?.data.name}</Text>
                        </View>
                    </View>

                    <View style={styles.textIconCurator}>
                        <View style={styles.iconCuratorContainer}>
                            <Image src={`${IMAGEPATH}email.png`}
                                   style={styles.iconCurator}/>
                        </View>
                        <View style={styles.textContainer}>
                            <Text
                                style={styles.text}>{solution?.curatorInfo?.data.email}</Text>
                        </View>
                    </View>
                    <View style={styles.textIconCurator}>
                        <View style={styles.iconCuratorContainer}>
                            <Image src={`${IMAGEPATH}phone.png`}
                                   style={styles.iconCurator}/>
                        </View>
                        <View style={styles.textContainer}>
                            <Text
                                style={styles.text}>{solution?.curatorInfo.data.phoneNumber}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.curatorContainerBlocTow}>

                    <View style={styles.textIconCurator}>
                        <View style={styles.iconCuratorContainer}>
                            <Image src={`${IMAGEPATH}organisation.png`} style={styles.iconCurator}/>
                        </View>
                        <View style={styles.textContainer}>
                            <Text
                                style={styles.text}>{solution.curatorInfo.organisation.data.name}</Text>
                        </View>
                    </View>

                    <View style={styles.textIconCurator}>
                        <View style={styles.iconCuratorContainer}>
                            <Image src={`${IMAGEPATH}pole.png`} style={styles.iconCurator}/>
                        </View>
                        <View style={styles.textContainer}>
                            <Text
                                style={styles.text}>{solution.curatorInfo.pole.data.name}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    </>
);

export default curatorDetail;