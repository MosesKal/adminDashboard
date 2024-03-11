import React, {useEffect, useState} from "react";
import {Document, Page, Text, View, StyleSheet, PDFViewer, Image} from "@react-pdf/renderer";
import {Col, Row} from "react-bootstrap";
import moment from "moment";
import axios from "@/pages/api/axios";

const imagePath = "../../../../assets/img/faces/";

const styles = StyleSheet.create({
    page: {
        flexDirection: "column", padding: 20,
    }, section: {
        margin: 10, padding: 10, flexGrow: 1, borderWidth: 1, borderColor: "#ccc", borderRadius: 5,
    }, heading: {
        fontSize: 20, marginBottom: 10, color: "#333", textDecoration: "underline"
    }, label: {
        fontSize: 12, fontWeight: "bold", marginBottom: 5, color: "#666",
    }, text: {
        fontSize: 12, marginBottom: 5, color: "#333",
    }, profileImage: {
        marginBottom: 10,
        flexDirection: "row",
        alignItems: "center",
        border: "1px dash #ccc",
        paddingLeft: 20,
        paddingBottom: 10
    }, profileImg: {
        borderRadius: 5, width: 100, height: 100, objectFit: "cover", marginRight: 10,
    }, profDetails: {
        flexDirection: "column",

    }, containerTextDetail: {
        display: "flex", flexDirection: "row", marginBottom: 3, marginTop: 5
    }, containerIcon: {
        marginRight: 15, marginTop: 5
    }, constainerText: {
        marginTop: 5
    }, containerTextDetailOther: {
        display: "flex", flexDirection: "row",
    }, profDetailOther: {
        fontSize: 10
    }, containerIconOther: {
        marginRight: 15, marginTop: 5
    }, containerTextOther: {
        paddingTop: 6
    }, profDetailsText: {
        fontSize: 20, color: "black", textTransform: "uppercase"
    }, icons: {
        width: 15,
    }, fontWeightSemibold: {
        fontWeight: "bold",
    }, textMuted: {
        color: "#666",
    }, curatorContainer: {
        display: "flex", border: "1px dash #ccc", padding: 10, margin: 5, flexDirection: "row",
    }, curatorContainerBloc: {
        display: "flex", flexDirection: "column",
    }, curatorContainerBlocTow: {
        display: "flex", flexDirection: "column", marginLeft: 10
    }, describeCuratorContainer: {
        width: 100, paddingLeft: 20, display: "flex", flexDirection: "row", border: "1px solid black"
    }, textIconCurator: {
        display: "flex", flexDirection: "row",
    }, iconCuratorContainer: {
        marginRight: 10

    }, iconCurator: {
        width: 15
    }, textContainer: {}

});
const UserDetail = ({icon, text}) => (

    <View style={styles.containerTextDetailOther}>
        <View style={styles.containerIconOther}>
            <Image src={`${imagePath}${icon}.png`} style={styles.icons}/>
        </View>
        <View style={styles.containerTextOther}>
            <Text style={styles.profDetailOther}>{text}</Text>
        </View>
    </View>);
const Reporting = ({curratedSolutions}) => {

    const [enhancedSolutions, setEnhancedSolutions] = useState([]);

    useEffect(() => {
        const fetchCuratorsInfo = async () => {
            const enhancedData = await Promise.all(curratedSolutions.map(async (solution) => {
                try {
                    const curatorInfoResponse = await axios.get(`/users/${solution.feedbacks[0]?.userId}`);

                    const poleResponse = await axios.get(`/poles/${curatorInfoResponse?.data?.data?.poleId}`);
                    const organisationResponse = await axios.get(`/organisations/${curatorInfoResponse?.data?.data?.organisationId}`);
                    const enhancedSolution = {
                        ...solution, curatorInfo: {
                            ...curatorInfoResponse.data,
                            pole: poleResponse.data,
                            organisation: organisationResponse.data
                        }
                    };
                    return enhancedSolution;
                } catch (error) {
                    console.log("Error fetching curator info:", error);
                    return solution;
                }
            }));
            setEnhancedSolutions(enhancedData);
        };

        fetchCuratorsInfo();
    }, [curratedSolutions]);


    return (<Row>
        <Col lg={3}>
            <PDFViewer width="100%" height="600px">
                <Document>
                    {enhancedSolutions.map((solution, index) => (<Page key={index} style={styles.page}>
                        {/*<ExampleSvg/>*/}
                        <View style={styles.section}>
                            <Text style={styles.heading}>{index + 1}. {solution.name}</Text>
                            <View>
                                <Text>{"Informations de l'innovateur"}</Text>
                            </View>
                            <View style={styles.profileImage}>
                                <Image style={styles.profileImg}
                                       src={"../../../../assets/img/faces/profile.jpg"}/>
                                <View style={styles.profDetails}>
                                    <UserDetail icon="person" text={solution.user.name}/>
                                    <UserDetail icon="address" text={solution.user.address}/>
                                    <UserDetail icon="phone" text={solution.user.phoneNumber}/>
                                    <UserDetail icon="email" text={solution.user.email}/>
                                    <UserDetail icon="calendar"
                                                text={`${moment(solution.user.createdAt).format("DD MMMM YYYY [à] HH:mm")} (Date d'inscription)`}/>
                                </View>
                            </View>

                            <View>
                                <View>
                                    <Text>Détails de la solution</Text>
                                </View>
                                <View style={{marginBottom: 10}}>
                                    <Text style={styles.label}>Description:</Text>
                                    <Text style={styles.text}>{solution.description}</Text>
                                </View>
                                <View style={{marginBottom: 10}}>
                                    <Text style={styles.label}>Thème:</Text>
                                    <Text style={styles.text}>{solution.thematic.name}</Text>
                                </View>
                                <View style={{marginBottom: 10}}>
                                    <Text style={styles.label}>Challenges:</Text>
                                    {solution.challenges.map((challenge, index) => (
                                        <Text key={index} style={styles.text}>
                                            {challenge.name}
                                        </Text>))}
                                </View>
                            </View>

                            <View>
                                <View>
                                    <Text>Informations du Curateur</Text>
                                </View>
                                <View style={styles.curatorContainer}>
                                    <View style={styles.curatorContainerBloc}>
                                        <View style={styles.textIconCurator}>
                                            <View style={styles.iconCuratorContainer}>
                                                <Image src={`${imagePath}person.png`}
                                                       style={styles.iconCurator}/>
                                            </View>
                                            <View>
                                                <Text
                                                    style={styles.text}>{solution.curatorInfo.data.name}</Text>
                                            </View>
                                        </View>

                                        <View style={styles.textIconCurator}>
                                            <View style={styles.iconCuratorContainer}>
                                                <Image src={`${imagePath}email.png`}
                                                       style={styles.iconCurator}/>
                                            </View>
                                            <View style={styles.textContainer}>
                                                <Text
                                                    style={styles.text}>{solution.curatorInfo.data.email}</Text>
                                            </View>
                                        </View>
                                        <View style={styles.textIconCurator}>
                                            <View style={styles.iconCuratorContainer}>
                                                <Image src={`${imagePath}phone.png`}
                                                       style={styles.iconCurator}/>
                                            </View>
                                            <View style={styles.textContainer}>
                                                <Text
                                                    style={styles.text}>{solution.curatorInfo.data.phoneNumber}</Text>
                                            </View>
                                        </View>
                                    </View>

                                    <View style={styles.curatorContainerBlocTow}>
                                        <View style={styles.textIconCurator}>
                                            <View style={styles.iconCuratorContainer}>
                                                <Image src={`${imagePath}organisation.png`} style={styles.iconCurator}/>
                                            </View>
                                            <View style={styles.textContainer}>
                                                <Text
                                                    style={styles.text}>{solution.curatorInfo.organisation.data.name}</Text>
                                            </View>
                                        </View>

                                        <View style={styles.textIconCurator}>
                                            <View style={styles.iconCuratorContainer}>
                                                <Image src={`${imagePath}pole.png`} style={styles.iconCurator}/>
                                            </View>
                                            <View style={styles.textContainer}>
                                                <Text
                                                    style={styles.text}>{solution.curatorInfo.pole.data.name}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>

                            <View>
                                <View>
                                    <Text>Côte</Text>
                                </View>
                            </View>
                        </View>
                    </Page>))}
                </Document>
            </PDFViewer>
        </Col>
        <Col lg={3}></Col>
        <Col lg={3}></Col>
        <Col lg={3}></Col>
    </Row>);
};
export default Reporting;